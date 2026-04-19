import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  DB: D1Database
  ENVIRONMENT: string
}

const app = new Hono<{ Bindings: Bindings }>()

// CORS
app.use('/*', cors({
  origin: [
    'https://test.7e.ink',
    'https://sbti.7e.ink',
    'https://plti.7e.ink',
    'https://lvti.7e.ink',
    'https://ckti.7e.ink'
  ],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization']
}))

// 验证 Token 中间件
async function verifyToken(c: any, token: string) {
  try {
    const response = await fetch('https://api-auth.7e.ink/oauth/userinfo', {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!response.ok) return null
    return await response.json()
  } catch {
    return null
  }
}

/**
 * 存档系统说明：
 * - slot 0: 自动保存（最近一次结果）
 * - slot 1-4: 手动保存
 * - 每个用户每个测试类型最多 5 个存档
 */

// 保存测试结果（自动保存到 slot 0）
app.post('/api/results', async (c) => {
  const auth = c.req.header('Authorization')
  if (!auth?.startsWith('Bearer ')) {
    return c.json({ error: '未登录' }, 401)
  }
  
  const token = auth.slice(7)
  const user = await verifyToken(c, token)
  
  if (!user?.id) {
    return c.json({ error: 'Token 无效' }, 401)
  }
  
  const body = await c.req.json()
  const { test_type, result_type, result_data, slot = 0 } = body
  
  if (!test_type) {
    return c.json({ error: '缺少测试类型' }, 400)
  }
  
  // 验证 slot 范围
  const validSlot = Math.max(0, Math.min(4, parseInt(slot) || 0))
  
  // 检查该 slot 是否已有记录
  const existing = await c.env.DB.prepare(
    'SELECT id FROM test_results WHERE user_id = ? AND test_type = ? AND slot = ?'
  ).bind(user.id, test_type, validSlot).first()
  
  let result;
  if (existing) {
    // 更新现有记录
    result = await c.env.DB.prepare(
      `UPDATE test_results 
       SET result_type = ?, result_data = ?, created_at = strftime('%s', 'now')
       WHERE id = ?`
    ).bind(
      result_type || null,
      result_data ? JSON.stringify(result_data) : null,
      existing.id
    ).run()
    result.meta.last_row_id = existing.id
  } else {
    // 插入新记录
    result = await c.env.DB.prepare(
      `INSERT INTO test_results (user_id, test_type, result_type, result_data, slot)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(
      user.id,
      test_type,
      result_type || null,
      result_data ? JSON.stringify(result_data) : null,
      validSlot
    ).run()
  }
  
  return c.json({
    success: true,
    id: result.meta.last_row_id,
    slot: validSlot,
    message: validSlot === 0 ? '自动保存成功' : '存档保存成功'
  })
})

// 获取所有存档
app.get('/api/results', async (c) => {
  const auth = c.req.header('Authorization')
  if (!auth?.startsWith('Bearer ')) {
    return c.json({ error: '未登录' }, 401)
  }
  
  const token = auth.slice(7)
  const user = await verifyToken(c, token)
  
  if (!user?.id) {
    return c.json({ error: 'Token 无效' }, 401)
  }
  
  const testType = c.req.query('test_type')
  
  let query = 'SELECT * FROM test_results WHERE user_id = ?'
  const params: any[] = [user.id]
  
  if (testType) {
    query += ' AND test_type = ?'
    params.push(testType)
  }
  
  query += ' ORDER BY slot ASC, created_at DESC'
  
  const results = await c.env.DB.prepare(query).bind(...params).all()
  
  // 解析 result_data
  const parsedResults = results.results.map((r: any) => ({
    ...r,
    result_data: r.result_data ? JSON.parse(r.result_data) : null,
    slot_name: r.slot === 0 ? '自动存档' : `存档 ${r.slot}`
  }))
  
  return c.json({ results: parsedResults })
})

// 获取单个存档
app.get('/api/results/:slot', async (c) => {
  const auth = c.req.header('Authorization')
  if (!auth?.startsWith('Bearer ')) {
    return c.json({ error: '未登录' }, 401)
  }
  
  const token = auth.slice(7)
  const user = await verifyToken(c, token)
  
  if (!user?.id) {
    return c.json({ error: 'Token 无效' }, 401)
  }
  
  const slot = parseInt(c.req.param('slot')) || 0
  const testType = c.req.query('test_type')
  
  if (!testType) {
    return c.json({ error: '缺少测试类型' }, 400)
  }
  
  const result = await c.env.DB.prepare(
    `SELECT * FROM test_results 
     WHERE user_id = ? AND test_type = ? AND slot = ?`
  ).bind(user.id, testType, slot).first()
  
  if (!result) {
    return c.json({ result: null })
  }
  
  return c.json({
    result: {
      ...result,
      result_data: result.result_data ? JSON.parse(result.result_data as string) : null,
      slot_name: slot === 0 ? '自动存档' : `存档 ${slot}`
    }
  })
})

// 获取最新测试结果（兼容旧 API）
app.get('/api/results/latest', async (c) => {
  const auth = c.req.header('Authorization')
  if (!auth?.startsWith('Bearer ')) {
    return c.json({ error: '未登录' }, 401)
  }
  
  const token = auth.slice(7)
  const user = await verifyToken(c, token)
  
  if (!user?.id) {
    return c.json({ error: 'Token 无效' }, 401)
  }
  
  const testType = c.req.query('test_type')
  
  if (!testType) {
    return c.json({ error: '缺少测试类型' }, 400)
  }
  
  // 获取 slot 0（自动存档）
  const result = await c.env.DB.prepare(
    `SELECT * FROM test_results 
     WHERE user_id = ? AND test_type = ? AND slot = 0`
  ).bind(user.id, testType).first()
  
  if (!result) {
    return c.json({ result: null })
  }
  
  return c.json({
    result: {
      ...result,
      result_data: result.result_data ? JSON.parse(result.result_data as string) : null,
      slot_name: '自动存档'
    }
  })
})

// 删除测试结果
app.delete('/api/results/:slot', async (c) => {
  const auth = c.req.header('Authorization')
  if (!auth?.startsWith('Bearer ')) {
    return c.json({ error: '未登录' }, 401)
  }
  
  const token = auth.slice(7)
  const user = await verifyToken(c, token)
  
  if (!user?.id) {
    return c.json({ error: 'Token 无效' }, 401)
  }
  
  const slot = parseInt(c.req.param('slot')) || 0
  const testType = c.req.query('test_type')
  
  if (!testType) {
    return c.json({ error: '缺少测试类型' }, 400)
  }
  
  // 不允许删除 slot 0（自动存档）
  if (slot === 0) {
    return c.json({ error: '自动存档不可删除，完成新测试会自动覆盖' }, 400)
  }
  
  await c.env.DB.prepare(
    'DELETE FROM test_results WHERE user_id = ? AND test_type = ? AND slot = ?'
  ).bind(user.id, testType, slot).run()
  
  return c.json({ success: true })
})

// 健康检查
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

export default app

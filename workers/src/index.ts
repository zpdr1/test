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
    const response = await fetch('https://auth.7e.ink/oauth/userinfo', {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!response.ok) return null
    return await response.json()
  } catch {
    return null
  }
}

// 保存测试结果
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
  const { test_type, result_type, result_data } = body
  
  if (!test_type) {
    return c.json({ error: '缺少测试类型' }, 400)
  }
  
  // 保存结果
  const result = await c.env.DB.prepare(
    `INSERT INTO test_results (user_id, test_type, result_type, result_data)
     VALUES (?, ?, ?, ?)`
  ).bind(
    user.id,
    test_type,
    result_type || null,
    result_data ? JSON.stringify(result_data) : null
  ).run()
  
  return c.json({
    success: true,
    id: result.meta.last_row_id
  })
})

// 获取用户的测试历史
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
  
  query += ' ORDER BY created_at DESC LIMIT 100'
  
  const results = await c.env.DB.prepare(query).bind(...params).all()
  
  // 解析 result_data
  const parsedResults = results.results.map((r: any) => ({
    ...r,
    result_data: r.result_data ? JSON.parse(r.result_data) : null
  }))
  
  return c.json({ results: parsedResults })
})

// 获取最新测试结果
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
  
  const result = await c.env.DB.prepare(
    `SELECT * FROM test_results 
     WHERE user_id = ? AND test_type = ? 
     ORDER BY created_at DESC LIMIT 1`
  ).bind(user.id, testType).first()
  
  if (!result) {
    return c.json({ result: null })
  }
  
  return c.json({
    result: {
      ...result,
      result_data: result.result_data ? JSON.parse(result.result_data as string) : null
    }
  })
})

// 删除测试结果
app.delete('/api/results/:id', async (c) => {
  const auth = c.req.header('Authorization')
  if (!auth?.startsWith('Bearer ')) {
    return c.json({ error: '未登录' }, 401)
  }
  
  const token = auth.slice(7)
  const user = await verifyToken(c, token)
  
  if (!user?.id) {
    return c.json({ error: 'Token 无效' }, 401)
  }
  
  const id = c.req.param('id')
  
  await c.env.DB.prepare(
    'DELETE FROM test_results WHERE id = ? AND user_id = ?'
  ).bind(id, user.id).run()
  
  return c.json({ success: true })
})

// 健康检查
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

export default app

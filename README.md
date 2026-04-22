# 七亿测试中心

> 有趣的心理测试平台，发现你的另一面

## 🌐 访问地址

| 服务 | 地址 |
|------|------|
| 测试中心 | https://test.7e.ink |
| API | https://api-test.2211122.xyz |

## 🧪 测试列表

| 测试 | 代号 | 地址 | 状态 |
|------|------|------|------|
| 沙壁人格测试 | SBTI | https://sbti.7e.ink | ✅ 已上线 |
| 政治领导人测试 | PLTI | https://plti.7e.ink | ✅ 已上线 |
| 大明王朝1566人物测试 | 1566TI | https://1566ti.7e.ink | ✅ 已上线 |
| 爱情观测试 | LVTI | https://lvti.7e.ink | ✅ 已上线 |
| 财商测试 | CKTI | https://ckti.7e.ink | ✅ 已上线 |

## 🛠 技术架构

### 前端
- 纯静态 HTML + CSS + JavaScript
- 无框架依赖
- 响应式设计
- SEO 优化

### 后端
- Cloudflare Workers + Hono
- D1 数据库 (SQLite)
- 统一认证 (auth.7e.ink)

## 📦 部署信息

| 组件 | 平台 | 仓库 |
|------|------|------|
| test.7e.ink | Cloudflare Pages | https://github.com/zpdr1/test |
| sbti.7e.ink | Gitee Pages | https://gitee.com/zpdr/sbti |
| plti.7e.ink | Gitee Pages | https://gitee.com/zpdr/plti |
| API Workers | Cloudflare Workers | workers/ |

## 🗄️ 数据库

- **名称**: test-center-db
- **ID**: 0d549711-3c5a-4e59-913c-d696d0e6b8c9
- **区域**: WNAM (美国西海岸)

### 表结构

```sql
CREATE TABLE test_results (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  test_type TEXT NOT NULL,
  result_type TEXT,
  result_data TEXT,
  slot INTEGER DEFAULT 0,  -- 存档槽：0=自动存档, 1-4=手动存档
  created_at INTEGER
);
```

## 💾 存档系统

### 设计原则

每个用户每个测试类型最多 **5 个存档**：

| 存档槽 | 名称 | 保存方式 | 说明 |
|--------|------|----------|------|
| 0 | 自动存档 | 自动 | 完成测试后自动保存，覆盖之前的自动存档 |
| 1 | 存档 1 | 手动 | 用户手动保存 |
| 2 | 存档 2 | 手动 | 用户手动保存 |
| 3 | 存档 3 | 手动 | 用户手动保存 |
| 4 | 存档 4 | 手动 | 用户手动保存 |

### 使用规则

1. **自动存档（slot 0）**
   - 完成测试后自动保存到 slot 0
   - 新结果会覆盖旧结果
   - 不可删除，只能被新结果覆盖

2. **手动存档（slot 1-4）**
   - 用户在结果页面点击"保存到存档"
   - 选择空白存档槽或覆盖已有存档
   - 可以删除

3. **读档**
   - 登录后可以查看所有存档
   - 点击存档可以查看详细结果
   - 测试页面会提示是否有存档

### API 接口

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/results` | POST | 保存结果（指定 slot 参数） |
| `/api/results` | GET | 获取所有存档 |
| `/api/results/:slot` | GET | 读取指定存档 |
| `/api/results/:slot` | DELETE | 删除存档（slot 0 不可删） |
| `/api/results/latest` | GET | 获取自动存档（兼容旧 API） |

### 前端调用示例

```javascript
// 自动保存（slot 0）
TestAuth.saveTestResult(resultData);

// 手动保存到指定槽
TestAuth.saveToSlot(resultData, 1);

// 获取所有存档
const { saves } = await TestAuth.getAllSaves();

// 读取指定存档
const { result } = await TestAuth.loadSave(1);

// 删除存档
await TestAuth.deleteSave(1);
```

## 🔐 OAuth 配置

- **Client ID**: test
- **Client Secret**: secret_test_2026_secure
- **回调地址**: 
  - https://sbti.7e.ink/callback.html
  - https://plti.7e.ink/callback.html
  - https://lvti.7e.ink/callback.html
  - https://ckti.7e.ink/callback.html
  - https://1566ti.7e.ink/callback.html

## 📁 文件结构

```
test.7e.ink/
├── index.html          # 首页
├── style.css           # 样式
├── favicon.ico         # 图标
├── CNAME               # 域名绑定
├── robots.txt          # 搜索引擎
├── sitemap.xml         # 站点地图
├── workers/            # 后端 API
│   ├── src/index.ts    # 主入口
│   ├── schema.sql      # 数据库结构
│   └── wrangler.toml   # Cloudflare 配置
└── README.md           # 文档
```

## 📝 更新日志

### v1.1.0 (2026-04-19)
- ✅ 接入统一认证 (auth.7e.ink)
- ✅ 测试结果保存到数据库
- ✅ 后端 API 部署 (api-test.2211122.xyz)

### v1.0.0 (2026-04-18)
- ✅ 创建测试中心入口页
- ✅ 展示 SBTI、PLTI 测试
- ✅ 响应式设计

## 📜 许可证

MIT

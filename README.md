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
| 爱情观测试 | LVTI | https://lvti.7e.ink | 🚧 即将上线 |
| 财商测试 | CKTI | https://ckti.7e.ink | 🚧 即将上线 |

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
  created_at INTEGER
);
```

## 🔐 OAuth 配置

- **Client ID**: test
- **Client Secret**: secret_test_2026_secure
- **回调地址**: 
  - https://sbti.7e.ink/callback.html
  - https://plti.7e.ink/callback.html
  - https://lvti.7e.ink/callback.html
  - https://ckti.7e.ink/callback.html

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

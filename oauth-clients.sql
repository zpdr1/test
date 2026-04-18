-- 添加测试中心 OAuth 客户端

-- SBTI 沙壁人格测试
INSERT INTO sso_clients (client_id, client_secret, client_name, redirect_uri, allowed_scopes, is_trusted, is_active, created_at, updated_at)
VALUES ('sbti', 'secret_sbti_2026_secure', 'SBTI 人格测试', 'https://sbti.7e.ink/callback.html', 'profile', 1, 1, unixepoch(), unixepoch())
ON CONFLICT(client_id) DO UPDATE SET
  redirect_uri = 'https://sbti.7e.ink/callback.html',
  is_active = 1,
  updated_at = unixepoch();

-- PLTI 政治领导人测试
INSERT INTO sso_clients (client_id, client_secret, client_name, redirect_uri, allowed_scopes, is_trusted, is_active, created_at, updated_at)
VALUES ('plti', 'secret_plti_2026_secure', 'PLTI 政治领导人测试', 'https://plti.7e.ink/callback.html', 'profile', 1, 1, unixepoch(), unixepoch())
ON CONFLICT(client_id) DO UPDATE SET
  redirect_uri = 'https://plti.7e.ink/callback.html',
  is_active = 1,
  updated_at = unixepoch();

-- 验证
SELECT client_id, client_name, redirect_uri FROM sso_clients WHERE client_id IN ('sbti', 'plti');

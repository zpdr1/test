-- 测试结果表
CREATE TABLE IF NOT EXISTS test_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  test_type TEXT NOT NULL,
  result_type TEXT,
  result_data TEXT,
  created_at INTEGER DEFAULT (unixepoch())
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_user_test ON test_results(user_id, test_type);
CREATE INDEX IF NOT EXISTS idx_user_created ON test_results(user_id, created_at DESC);

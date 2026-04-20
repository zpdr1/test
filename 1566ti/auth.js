/**
 * 七亿测试中心 - 统一认证模块
 * 支持 SBTI、PLTI、LVTI、CKTI、1566 等测试项目的 OAuth 登录和存档管理
 */

// 各项目的测试类型
const TEST_TYPES = {
  'sbti.7e.ink': 'sbti',
  'plti.7e.ink': 'plti',
  'lvti.7e.ink': 'lvti',
  'ckti.7e.ink': 'ckti',
  '1566.7e.ink': '1566',
  '1566ti.7e.ink': '1566'
};

// 根据域名获取测试类型
function getTestType() {
  const hostname = window.location.hostname;
  return TEST_TYPES[hostname] || 'unknown';
}

const AUTH_CONFIG = {
  authUrl: 'https://auth.7e.ink',
  clientId: 'test',  // 统一客户端
  clientSecret: 'secret_test_2026_secure',  // 公开客户端的 secret
  testType: getTestType()
};

/**
 * 初始化认证配置
 */
function initAuth(testType) {
  // 允许手动覆盖测试类型
  if (testType) {
    AUTH_CONFIG.testType = testType;
  }
}

/**
 * 检查登录状态
 */
function isLoggedIn() {
  const token = localStorage.getItem('auth_token');
  const user = localStorage.getItem('auth_user');
  return !!(token && user);
}

/**
 * 获取当前用户
 */
function getCurrentUser() {
  const userStr = localStorage.getItem('auth_user');
  return userStr ? JSON.parse(userStr) : null;
}

/**
 * 获取 Token
 */
function getToken() {
  return localStorage.getItem('auth_token');
}

/**
 * 发起登录
 */
function login() {
  const redirectUri = `${window.location.origin}/callback.html`;
  // 保存当前页面，登录后跳回
  sessionStorage.setItem('auth_redirect', window.location.href);
  // 跳转到认证中心
  const authUrl = `${AUTH_CONFIG.authUrl}/oauth/authorize?` +
    `client_id=${AUTH_CONFIG.clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `response_type=code&` +
    `scope=profile&` +
    `state=${AUTH_CONFIG.testType}`;
  window.location.href = authUrl;
}

/**
 * 登出
 */
function logout() {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
  window.location.reload();
}

/**
 * 处理 OAuth 回调
 */
async function handleCallback(code) {
  const redirectUri = `${window.location.origin}/callback.html`;
  
  try {
    // 向 auth.7e.ink API 换取 token
    const response = await fetch('https://api-auth.7e.ink/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: AUTH_CONFIG.clientId,
        client_secret: AUTH_CONFIG.clientSecret,
        code: code,
        redirect_uri: redirectUri
      })
    });
    
    const data = await response.json();
    
    if (data.access_token) {
      // 保存 token
      localStorage.setItem('auth_token', data.access_token);
      
      // 获取用户信息
      const userResponse = await fetch('https://api-auth.7e.ink/oauth/userinfo', {
        headers: { Authorization: `Bearer ${data.access_token}` }
      });
      
      const userData = await userResponse.json();
      
      if (userData.id) {
        localStorage.setItem('auth_user', JSON.stringify(userData));
      }
      
      // 跳回原页面
      const redirect = sessionStorage.getItem('auth_redirect') || '/';
      sessionStorage.removeItem('auth_redirect');
      window.location.href = redirect;
      
      return true;
    } else {
      // 显示详细错误
      const errorMsg = data.error_description || data.error || data.message || JSON.stringify(data);
      console.error('OAuth token error:', errorMsg);
      alert('登录失败: ' + errorMsg);
    }
  } catch (error) {
    console.error('OAuth callback error:', error);
    alert('网络错误: ' + error.message);
  }
  
  return false;
}

/**
 * 自动保存测试结果（保存到 slot 0）
 */
async function saveTestResult(resultData) {
  return await saveToSlot(resultData, 0);
}

/**
 * 保存到指定存档槽
 * @param resultData 测试结果数据
 * @param slot 存档槽 (0=自动存档, 1-4=手动存档)
 */
async function saveToSlot(resultData, slot = 0) {
  if (!isLoggedIn()) {
    console.warn('User not logged in, result not saved');
    return { success: false, error: '未登录' };
  }
  
  const token = getToken();
  const validSlot = Math.max(0, Math.min(4, parseInt(slot) || 0));
  
  try {
    const response = await fetch('https://api-test.2211122.xyz/api/results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        test_type: AUTH_CONFIG.testType,
        result_type: resultData.resultType,
        result_data: resultData,
        slot: validSlot
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log(`Test result saved to slot ${validSlot}`);
      return { success: true, slot: validSlot, message: data.message };
    } else {
      console.error('Failed to save test result:', data.error);
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.error('Save test result error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 获取所有存档
 */
async function getAllSaves() {
  if (!isLoggedIn()) return { saves: [] };
  
  const token = getToken();
  
  try {
    const response = await fetch(`https://api-test.2211122.xyz/api/results?test_type=${AUTH_CONFIG.testType}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (response.ok) {
      const data = await response.json();
      return { saves: data.results || [] };
    }
  } catch (error) {
    console.error('Get saves error:', error);
  }
  
  return { saves: [] };
}

/**
 * 读取指定存档
 * @param slot 存档槽 (0=自动存档, 1-4=手动存档)
 */
async function loadSave(slot = 0) {
  if (!isLoggedIn()) return { result: null };
  
  const token = getToken();
  const validSlot = Math.max(0, Math.min(4, parseInt(slot) || 0));
  
  try {
    const response = await fetch(
      `https://api-test.2211122.xyz/api/results/${validSlot}?test_type=${AUTH_CONFIG.testType}`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Load save error:', error);
  }
  
  return { result: null };
}

/**
 * 删除指定存档（不能删除 slot 0）
 */
async function deleteSave(slot) {
  if (!isLoggedIn()) return { success: false, error: '未登录' };
  
  const validSlot = parseInt(slot) || 0;
  if (validSlot === 0) {
    return { success: false, error: '自动存档不可删除' };
  }
  
  const token = getToken();
  
  try {
    const response = await fetch(
      `https://api-test.2211122.xyz/api/results/${validSlot}?test_type=${AUTH_CONFIG.testType}`,
      {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      }
    );
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Delete save error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 获取测试历史（兼容旧 API）
 */
async function getTestHistory() {
  const result = await getAllSaves();
  return result.saves;
}

// 导出
window.TestAuth = {
  init: initAuth,
  isLoggedIn,
  getCurrentUser,
  getToken,
  login,
  logout,
  handleCallback,
  // 新的存档 API
  saveTestResult,     // 自动保存（slot 0）
  saveToSlot,         // 保存到指定槽
  getAllSaves,        // 获取所有存档
  loadSave,           // 读取指定存档
  deleteSave,         // 删除存档
  // 兼容旧 API
  getTestHistory
};

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
  '1566ti.7e.ink': '1566'
};

// 根据域名获取测试类型
function getTestType() {
  const hostname = window.location.hostname;
  return TEST_TYPES[hostname] || 'unknown';
}

const AUTH_CONFIG = {
  authUrl: 'https://auth.7e.ink',
  clientId: 'test',
  clientSecret: 'secret_test_2026_secure',
  testType: getTestType()
};

function initAuth(testType) {
  if (testType) {
    AUTH_CONFIG.testType = testType;
  }
}

function isLoggedIn() {
  const token = localStorage.getItem('auth_token');
  const user = localStorage.getItem('auth_user');
  return !!(token && user);
}

function getCurrentUser() {
  const userStr = localStorage.getItem('auth_user');
  return userStr ? JSON.parse(userStr) : null;
}

function getToken() {
  return localStorage.getItem('auth_token');
}

function login() {
  const redirectUri = `${window.location.origin}/callback.html`;
  sessionStorage.setItem('auth_redirect', window.location.href);
  const authUrl = `${AUTH_CONFIG.authUrl}/oauth/authorize?client_id=${AUTH_CONFIG.clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=profile&state=${AUTH_CONFIG.testType}`;
  window.location.href = authUrl;
}

function logout() {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
  window.location.reload();
}

async function handleCallback(code) {
  const redirectUri = `${window.location.origin}/callback.html`;
  try {
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
      localStorage.setItem('auth_token', data.access_token);
      const userResponse = await fetch('https://api-auth.7e.ink/oauth/userinfo', {
        headers: { Authorization: `Bearer ${data.access_token}` }
      });
      const userData = await userResponse.json();
      if (userData.id) {
        localStorage.setItem('auth_user', JSON.stringify(userData));
      }
      const redirect = sessionStorage.getItem('auth_redirect') || '/';
      sessionStorage.removeItem('auth_redirect');
      window.location.href = redirect;
      return true;
    } else {
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

async function saveTestResult(resultData) {
  return await saveToSlot(resultData, 0);
}

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

async function getTestHistory() {
  const result = await getAllSaves();
  return result.saves;
}

window.TestAuth = {
  init: initAuth,
  isLoggedIn,
  getCurrentUser,
  getToken,
  login,
  logout,
  handleCallback,
  saveTestResult,
  saveToSlot,
  getAllSaves,
  loadSave,
  deleteSave,
  getTestHistory
};

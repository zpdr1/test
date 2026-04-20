/**
 * 测试中心 - 登录 UI 组件
 * 自适应不同项目风格
 * 支持头像显示和存档管理
 */

(function() {
  // 检测当前项目风格
  function detectTheme() {
    const hostname = window.location.hostname;
    if (hostname.includes('sbti')) return 'dark';
    if (hostname.includes('plti')) return 'paper';
    if (hostname.includes('1566')) return 'daming'; // 大明王朝古风主题
    if (hostname.includes('lvti')) return 'love';   // 爱情观粉色主题
    if (hostname.includes('ckti')) return 'gold';   // 财商金色主题
    return 'light'; // test.7e.ink
  }
  
  const theme = detectTheme();
  
  // 不同主题的样式配置
  const themes = {
    dark: {
      bg: 'rgba(26, 26, 46, 0.95)',
      text: 'rgba(255, 255, 255, 0.9)',
      muted: 'rgba(255, 255, 255, 0.5)',
      accent: '#48dbfb',
      btnBg: 'linear-gradient(135deg, #667eea, #764ba2)',
      btnText: '#fff',
      borderColor: 'rgba(255, 255, 255, 0.1)'
    },
    paper: {
      bg: 'rgba(255, 250, 242, 0.98)',
      text: '#3a2b22',
      muted: '#7d6758',
      accent: '#b86a4a',
      btnBg: 'linear-gradient(135deg, #b86a4a, #c98562)',
      btnText: '#fff',
      borderColor: '#d8c7b2'
    },
    daming: {
      bg: 'rgba(30, 20, 10, 0.95)',
      text: 'rgba(201, 168, 76, 0.95)',
      muted: 'rgba(201, 168, 76, 0.5)',
      accent: '#c9a84c',
      btnBg: 'linear-gradient(135deg, #8b0000, #c9a84c)',
      btnText: '#fff',
      borderColor: 'rgba(201, 168, 76, 0.2)'
    },
    love: {
      bg: 'rgba(255, 240, 245, 0.95)',
      text: '#8b4557',
      muted: '#c48b9f',
      accent: '#ff6b9d',
      btnBg: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
      btnText: '#fff',
      borderColor: 'rgba(255, 107, 157, 0.2)'
    },
    gold: {
      bg: 'rgba(255, 250, 240, 0.95)',
      text: '#5c4a1f',
      muted: '#9a8543',
      accent: '#d4a017',
      btnBg: 'linear-gradient(135deg, #d4a017, #f0c040)',
      btnText: '#2d1f00',
      borderColor: 'rgba(212, 160, 23, 0.3)'
    },
    light: {
      bg: 'rgba(255, 255, 255, 0.95)',
      text: '#1f2937',
      muted: '#6b7280',
      accent: '#6366f1',
      btnBg: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      btnText: '#fff',
      borderColor: '#e5e7eb'
    }
  };
  
  const colors = themes[theme];
  
  // 创建样式
  const style = document.createElement('style');
  style.textContent = `
    .auth-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      padding: 10px 16px;
      background: ${colors.bg};
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 1000;
      font-size: 13px;
      color: ${colors.text};
      border-bottom: 1px solid ${colors.borderColor};
      transition: all 0.3s ease;
    }
    
    .auth-bar-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .auth-bar-logo {
      font-size: 18px;
    }
    
    .auth-bar-title {
      font-weight: 600;
      color: ${colors.text};
    }
    
    .auth-bar-title:hover {
      color: ${colors.accent};
    }
    
    .auth-bar-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .auth-user {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    .auth-user-link {
      display: flex;
      align-items: center;
      gap: 6px;
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }
    
    .auth-user-link:hover .auth-username {
      color: ${colors.accent};
    }
    
    .auth-avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: ${colors.btnBg};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      color: #fff;
      font-weight: 600;
      object-fit: cover;
    }
    
    .auth-username {
      max-width: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: ${colors.text};
    }
    
    .auth-btn {
      padding: 5px 14px;
      border-radius: 16px;
      border: none;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
    }
    
    .auth-btn-login {
      background: ${colors.btnBg};
      color: ${colors.btnText};
    }
    
    .auth-btn-login:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .auth-btn-logout {
      background: transparent;
      color: ${colors.muted};
      border: 1px solid ${colors.borderColor};
    }
    
    .auth-btn-logout:hover {
      color: ${colors.text};
      border-color: ${colors.accent};
    }
    
    /* 页面顶部留空间 */
    body {
      padding-top: 48px !important;
    }
    
    /* 移动端适配 */
    @media (max-width: 480px) {
      .auth-bar {
        padding: 8px 12px;
      }
      
      .auth-bar-title {
        font-size: 12px;
      }
      
      .auth-username {
        max-width: 50px;
        font-size: 12px;
      }
      
      .auth-btn {
        padding: 4px 10px;
        font-size: 11px;
      }
    }
    
    /* 大明王朝主题特殊字体 */
    .auth-bar-daming {
      font-family: "Noto Serif SC", "Source Han Serif SC", serif;
    }
  `;
  document.head.appendChild(style);
  
  // 等待 DOM 加载完成
  document.addEventListener('DOMContentLoaded', function() {
    // 创建登录栏
    const authBar = document.createElement('div');
    authBar.className = `auth-bar auth-bar-${theme}`;
    authBar.innerHTML = `
      <div class="auth-bar-left">
        <span class="auth-bar-logo">🧪</span>
        <a href="https://test.7e.ink" style="text-decoration: none;">
          <span class="auth-bar-title">测试中心</span>
        </a>
      </div>
      <div class="auth-bar-right" id="authContent">
        <span style="color: ${colors.muted}; font-size: 11px;">检查中...</span>
      </div>
    `;
    document.body.insertBefore(authBar, document.body.firstChild);
    
    // 更新 UI
    updateAuthUI();
  });
  
  // 更新登录 UI
  function updateAuthUI() {
    const authContent = document.getElementById('authContent');
    if (!authContent) return;
    
    if (typeof TestAuth !== 'undefined' && TestAuth.isLoggedIn()) {
      const user = TestAuth.getCurrentUser();
      const displayName = user?.display_name || user?.nickname || user?.username || '用户';
      const avatarUrl = user?.avatar_url;
      const initial = displayName.charAt(0).toUpperCase();
      
      // 如果有头像 URL，使用图片；否则使用首字母
      const avatarHtml = avatarUrl 
        ? `<img class="auth-avatar" src="${avatarUrl}" alt="${displayName}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="auth-avatar" style="display:none">${initial}</div>`
        : `<div class="auth-avatar">${initial}</div>`;
      
      authContent.innerHTML = `
        <a href="https://auth.7e.ink/user" style="text-decoration: none; display: flex; align-items: center; gap: 6px;">
          ${avatarHtml}
          <span class="auth-username">${displayName}</span>
        </a>
        <button class="auth-btn auth-btn-logout" onclick="TestAuth.logout()">退出</button>
      `;
    } else {
      authContent.innerHTML = `
        <button class="auth-btn auth-btn-login" onclick="TestAuth.login()">登录保存结果</button>
      `;
    }
  }
  
  // 暴露更新函数
  window.updateAuthUI = updateAuthUI;
})();

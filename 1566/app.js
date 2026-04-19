/**
 * 大明王朝1566 人物测试 - 主程序
 */

// 状态
let currentMode = 'classic'; // classic | mbti
let currentQuestion = 0;
let answers = [];

// 初始化
document.addEventListener('DOMContentLoaded', init);

function init() {
  document.getElementById('q-count').textContent = DATA.questions.length;
  document.getElementById('ptotal').textContent = DATA.questions.length;
  answers = new Array(DATA.questions.length).fill(null);
}

// 切换版本
function switchMode(mode) {
  currentMode = mode;
  document.body.className = mode === 'mbti' ? 'mode-mbti' : '';
  
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
}

// 开始测试
function startQuiz() {
  document.getElementById('cover').style.display = 'none';
  document.getElementById('quiz').style.display = 'flex';
  loadQuestion();
}

// 加载题目
function loadQuestion() {
  const q = DATA.questions[currentQuestion];
  
  // 更新进度
  const progress = (currentQuestion / DATA.questions.length) * 100;
  document.getElementById('pfill').style.width = progress + '%';
  document.getElementById('pnum').textContent = currentQuestion;
  document.getElementById('q-badge').textContent = `第 ${currentQuestion + 1} 题`;
  document.getElementById('q-text').textContent = q.q;
  
  // 渲染选项
  const optsContainer = document.getElementById('q-opts');
  optsContainer.innerHTML = q.opts.map((opt, i) => `
    <label class="opt${answers[currentQuestion] === i ? ' sel' : ''}" onclick="selectOption(${i})">
      <input type="radio" name="q${currentQuestion}" value="${i}">
      <span class="opt-dot">${String.fromCharCode(65 + i)}</span>
      <span class="opt-txt">${opt.t}</span>
    </label>
  `).join('');
  
  // 按钮状态
  document.getElementById('btn-prev').disabled = currentQuestion === 0;
  const nextBtn = document.getElementById('btn-next');
  nextBtn.textContent = currentQuestion === DATA.questions.length - 1 ? '查看结果 →' : '下一题 →';
}

// 选择选项
function selectOption(index) {
  answers[currentQuestion] = index;
  
  // 更新UI
  document.querySelectorAll('.opt').forEach((opt, i) => {
    opt.classList.toggle('sel', i === index);
  });
  
  // 自动下一题
  setTimeout(() => {
    if (currentQuestion < DATA.questions.length - 1) {
      nextQuestion();
    }
  }, 300);
}

// 上一题
function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    animateCard(() => loadQuestion());
  }
}

// 下一题
function nextQuestion() {
  if (answers[currentQuestion] === null) {
    alert('请选择一个选项');
    return;
  }
  
  if (currentQuestion < DATA.questions.length - 1) {
    currentQuestion++;
    animateCard(() => loadQuestion());
  } else {
    showResult();
  }
}

// 卡片动画
function animateCard(callback) {
  const card = document.getElementById('q-card');
  card.classList.add('is-leaving');
  
  setTimeout(() => {
    callback();
    card.classList.remove('is-leaving');
    card.classList.add('is-entering');
    
    setTimeout(() => {
      card.classList.remove('is-entering');
    }, 100);
  }, 50);
}

// 计算结果
function calculateResult() {
  // 计算用户维度分数
  const userScores = [0, 0, 0, 0, 0];
  
  answers.forEach((ans, qIdx) => {
    if (ans !== null) {
      const scores = DATA.questions[qIdx].opts[ans].s;
      scores.forEach((s, i) => userScores[i] += s);
    }
  });
  
  // 归一化
  const maxPossible = DATA.questions.length;
  const normalized = userScores.map(s => s / maxPossible);
  
  // 计算与每个人物的距离
  const distances = DATA.chars.map(char => {
    const profile = DATA.charProfiles[char.name];
    if (!profile) return { char, distance: Infinity };
    
    let dist = 0;
    for (let i = 0; i < 5; i++) {
      dist += Math.pow(normalized[i] - profile[i], 2);
    }
    return { char, distance: Math.sqrt(dist), scores: normalized };
  });
  
  // 排序
  distances.sort((a, b) => a.distance - b.distance);
  
  return {
    winner: distances[0].char,
    topMatches: distances.slice(0, 5),
    userScores: normalized
  };
}

// 显示结果
function showResult() {
  const result = calculateResult();
  const winner = result.winner;
  
  // 保存结果
  sessionStorage.setItem('daming1566_result', JSON.stringify({
    charName: winner.name,
    answers: answers
  }));
  
  // 如果登录了，保存到后端
  if (typeof TestAuth !== 'undefined' && TestAuth.isLoggedIn()) {
    TestAuth.saveTestResult({
      resultType: winner.name,
      resultData: result
    });
  }
  
  // 更新进度到100%
  document.getElementById('pfill').style.width = '100%';
  document.getElementById('pnum').textContent = DATA.questions.length;
  
  // 隐藏答题页
  document.getElementById('quiz').style.display = 'none';
  
  // 根据模式显示不同结果页
  if (currentMode === 'mbti') {
    renderMBTIResult(result);
    document.getElementById('mbti-result').style.display = 'block';
  } else {
    renderClassicResult(result);
    document.getElementById('result').style.display = 'block';
  }
}

// 渲染原版结果
function renderClassicResult(result) {
  const winner = result.winner;
  const quote = winner.quotes[Math.floor(Math.random() * winner.quotes.length)];
  
  const card = document.getElementById('res-card');
  card.style.setProperty('--cc', winner.color);
  
  card.innerHTML = `
    <div class="res-emoji">${winner.emoji}</div>
    <div class="res-title">${winner.title}</div>
    <h2 class="res-name" style="color: ${winner.color}">${winner.name}</h2>
    <div class="res-quote">"${quote}"</div>
    <div class="tags">
      ${winner.traits.map(t => `<span class="tag" style="border-color: ${winner.color}; color: ${winner.color}">${t}</span>`).join('')}
    </div>
    <div class="res-div"></div>
    <div class="res-desc">${winner.desc}</div>
    
    <div class="radar-wrap">
      <div class="radar-title">五维画像</div>
      <canvas id="radar-canvas" width="300" height="300"></canvas>
    </div>
  `;
  
  // 绘制雷达图
  setTimeout(() => drawRadar(result.userScores, winner.color), 100);
  
  // 相似人物
  const alsoBox = document.getElementById('also-box');
  alsoBox.innerHTML = `
    <div class="also-title">与你相似的人物</div>
    <div class="also-list">
      ${result.topMatches.slice(1, 4).map(m => `
        <div class="also-item" onclick="showCharDetail('${m.char.name}')">
          <div class="also-emoji">${m.char.emoji}</div>
          <div class="also-name">${m.char.name}</div>
          <div class="also-pct">${Math.round((1 - m.distance / 2) * 100)}%</div>
        </div>
      `).join('')}
    </div>
  `;
}

// 绘制雷达图
function drawRadar(scores, color) {
  const canvas = document.getElementById('radar-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const cx = 150, cy = 150, r = 100;
  const labels = DATA.dimensions;
  
  ctx.clearRect(0, 0, 300, 300);
  
  // 背景网格
  ctx.strokeStyle = 'rgba(201,168,76,0.2)';
  ctx.lineWidth = 1;
  
  for (let i = 1; i <= 5; i++) {
    ctx.beginPath();
    for (let j = 0; j <= 5; j++) {
      const angle = (Math.PI * 2 * j) / 5 - Math.PI / 2;
      const x = cx + (r * i / 5) * Math.cos(angle);
      const y = cy + (r * i / 5) * Math.sin(angle);
      if (j === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  
  // 轴线
  for (let i = 0; i < 5; i++) {
    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
    ctx.stroke();
  }
  
  // 数据区域
  ctx.fillStyle = color + '40';
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  
  for (let i = 0; i <= 5; i++) {
    const idx = i % 5;
    const angle = (Math.PI * 2 * idx) / 5 - Math.PI / 2;
    const value = (scores[idx] + 1) / 2; // 归一化到0-1
    const x = cx + r * value * Math.cos(angle);
    const y = cy + r * value * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  
  ctx.fill();
  ctx.stroke();
  
  // 标签
  ctx.fillStyle = '#c9a84c';
  ctx.font = '12px sans-serif';
  ctx.textAlign = 'center';
  
  for (let i = 0; i < 5; i++) {
    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    const x = cx + (r + 20) * Math.cos(angle);
    const y = cy + (r + 20) * Math.sin(angle) + 4;
    ctx.fillText(labels[i], x, y);
  }
}

// 渲染MBTI版结果
function renderMBTIResult(result) {
  const winner = result.winner;
  const quote = winner.quotes[Math.floor(Math.random() * winner.quotes.length)];
  
  const container = document.getElementById('mbti-result');
  container.innerHTML = `
    <div class="mbti-result-header">测试完成</div>
    
    <div class="mbti-main-card">
      <div class="mbti-type-label">你的人物类型</div>
      <div class="mbti-type-name" style="color: ${winner.mbtiColor}">${winner.name}</div>
      <div class="mbti-type-code">${winner.mbtiType}</div>
      <div class="mbti-quote">"${quote}"</div>
    </div>
    
    <div class="mbti-tags">
      ${winner.traits.map(t => `
        <span class="mbti-tag" style="background: ${winner.mbtiColor}15; color: ${winner.mbtiColor}; border: 1px solid ${winner.mbtiColor}40">${t}</span>
      `).join('')}
    </div>
    
    <div class="mbti-desc">
      <h3>性格解读</h3>
      <p>${winner.desc}</p>
    </div>
    
    <div class="mbti-also-box">
      <div class="mbti-also-title">与你相似的人物</div>
      <div class="mbti-also-list">
        ${result.topMatches.slice(1, 4).map(m => `
          <div class="mbti-also-item">
            <div class="mbti-also-emoji">${m.char.emoji}</div>
            <div class="mbti-also-name">${m.char.name}</div>
            <div class="mbti-also-type">${m.char.mbtiType}</div>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div class="mbti-action-btns">
      <button class="mbti-btn-share" onclick="shareResult()">📤 分享结果</button>
      <a href="index.html" class="mbti-btn-retry">重新测试</a>
    </div>
  `;
}

// 分享结果
function shareResult() {
  const result = JSON.parse(sessionStorage.getItem('daming1566_result') || '{}');
  const char = DATA.chars.find(c => c.name === result.charName);
  
  if (!char) return;
  
  const text = `我在《大明王朝1566》人物测试中是【${char.name}】！\n${char.desc.substring(0, 50)}...\n\n快来测测你是哪位人物：https://1566.7e.ink`;
  
  if (navigator.share) {
    navigator.share({
      title: '大明王朝1566 人物测试',
      text: text,
      url: 'https://1566.7e.ink'
    }).catch(() => copyText(text));
  } else {
    copyText(text);
  }
}

function copyText(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      alert('已复制到剪贴板，可以分享给朋友了！');
    });
  } else {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('已复制到剪贴板，可以分享给朋友了！');
  }
}

// 重测
function retryQuiz() {
  answers = new Array(DATA.questions.length).fill(null);
  currentQuestion = 0;
  
  document.getElementById('result').style.display = 'none';
  document.getElementById('mbti-result').style.display = 'none';
  document.getElementById('cover').style.display = 'flex';
}

// 显示人物详情
function showCharDetail(name) {
  const char = DATA.chars.find(c => c.name === name);
  if (!char) return;
  
  alert(`${char.emoji} ${char.name}\n\n${char.title}\n\n${char.desc}`);
}

// 关闭海报
function closePoster() {
  document.getElementById('poster-modal').classList.remove('active');
}

// 键盘快捷键
document.addEventListener('keydown', function(e) {
  if (document.getElementById('quiz').style.display === 'flex') {
    if (e.key >= '1' && e.key <= '3') {
      selectOption(parseInt(e.key) - 1);
    } else if (e.key === 'ArrowLeft') {
      prevQuestion();
    } else if (e.key === 'ArrowRight' && answers[currentQuestion] !== null) {
      nextQuestion();
    } else if (e.key === 'Enter' && answers[currentQuestion] !== null) {
      nextQuestion();
    }
  }
});

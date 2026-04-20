/**
 * CKTI 财商测试指标 - 主程序
 */

// 状态管理
let currentQuestion = 0;
let answers = [];

// 初始化
document.addEventListener('DOMContentLoaded', function() {
  // 初始化答案数组
  answers = new Array(QUESTIONS.length).fill(undefined);
  loadQuestion();
});

// 加载题目
function loadQuestion() {
  const question = QUESTIONS[currentQuestion];

  // 更新进度条
  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;
  document.getElementById('progressFill').style.width = `${progress}%`;

  // 更新题目信息
  document.getElementById('questionNumber').textContent = `第 ${currentQuestion + 1} / ${QUESTIONS.length} 题`;
  document.getElementById('questionType').textContent = '单选题';

  // 更新题目文本
  document.getElementById('questionText').textContent = question.question;

  // 生成选项
  const optionsContainer = document.getElementById('options');
  optionsContainer.innerHTML = '';

  question.options.forEach((option, index) => {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'option' + (answers[currentQuestion] === index ? ' selected' : '');
    optionDiv.textContent = option.text;
    optionDiv.onclick = () => selectOption(index);
    optionsContainer.appendChild(optionDiv);
  });

  // 更新按钮状态
  document.getElementById('prevBtn').disabled = currentQuestion === 0;

  // 最后一题显示"查看结果"
  const nextBtn = document.getElementById('nextBtn');
  if (currentQuestion === QUESTIONS.length - 1) {
    nextBtn.textContent = '查看结果 →';
  } else {
    nextBtn.textContent = '下一题 →';
  }
}

// 选择选项
function selectOption(index) {
  answers[currentQuestion] = index;

  // 更新选中状态
  const options = document.querySelectorAll('.option');
  options.forEach((opt, i) => {
    opt.classList.toggle('selected', i === index);
  });

  // 自动跳转下一题（带延迟以显示选中效果）
  setTimeout(() => {
    if (currentQuestion < QUESTIONS.length - 1) {
      nextQuestion();
    }
  }, 300);
}

// 上一题
function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

// 下一题
function nextQuestion() {
  // 检查是否已选择
  if (answers[currentQuestion] === undefined) {
    alert('请选择一个选项');
    return;
  }

  if (currentQuestion < QUESTIONS.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    // 最后一题，显示结果
    showResult();
  }
}

// 显示结果
function showResult() {
  // 计算结果
  const result = calculateResult(answers);

  // 保存到 sessionStorage
  sessionStorage.setItem('ckti_result', JSON.stringify({
    type: result.type.code,
    answers: answers,
    scores: result.scores
  }));

  // 保存到后端（如果已登录）
  if (typeof TestAuth !== 'undefined' && TestAuth.isLoggedIn()) {
    TestAuth.saveTestResult({
      resultType: result.type.code,
      typeName: result.type.name,
      answers: answers,
      scores: result.scores
    }).then(function(res) {
      if (res && res.success) {
        console.log('CKTI 结果已保存');
      }
    }).catch(function(err) {
      console.log('保存失败:', err);
    });
  }

  // 跳转到结果页
  window.location.href = 'result.html';
}

// 重置测试
function resetTest() {
  if (confirm('确定要重新开始测试吗？')) {
    answers = new Array(QUESTIONS.length).fill(undefined);
    currentQuestion = 0;
    loadQuestion();
  }
}

// 键盘快捷键
document.addEventListener('keydown', function(e) {
  // 数字键 1-4 选择选项
  if (e.key >= '1' && e.key <= '4') {
    const index = parseInt(e.key) - 1;
    if (index < QUESTIONS[currentQuestion].options.length) {
      selectOption(index);
    }
  }

  // 回车键下一题
  if (e.key === 'Enter' && answers[currentQuestion] !== undefined) {
    nextQuestion();
  }

  // 左箭头上一题
  if (e.key === 'ArrowLeft' && currentQuestion > 0) {
    prevQuestion();
  }

  // 右箭头下一题
  if (e.key === 'ArrowRight' && answers[currentQuestion] !== undefined) {
    nextQuestion();
  }
});

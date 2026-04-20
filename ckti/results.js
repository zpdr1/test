/**
 * CKTI 财商测试指标 - 结果类型
 *
 * 四个维度组合产生 16 种类型：
 * 1. 消费习惯 (F/S) - Frugal 节俭型 vs Spender 消费型
 * 2. 投资态度 (C/A) - Conservative 保守型 vs Aggressive 激进型
 * 3. 风险偏好 (R/S) - RiskAverse 规避型 vs RiskSeeking 冒险型
 * 4. 理财意识 (P/L) - Planner 规划型 vs Loose 随性型
 */

const RESULT_TYPES = {
  // ===== F + C 组合 (节俭+保守) =====
  FCRP: {
    code: "FCRP",
    name: "稳健储蓄家",
    emoji: "🏦",
    color: "#059669",
    description: "极度节俭，风险厌恶，每一分钱都精打细算，安全第一。",
    traits: ["精打细算", "风险厌恶", "记账狂人", "目标明确"],
    strengths: ["财务稳健", "积累能力强", "很少入不敷出", "适合长期规划"],
    weaknesses: ["可能过于保守", "错失投资机会", "生活品质可能受影响", "缺乏风险承受力"],
    advice: "你的财务安全感很强，但也要学会适度投资，让钱生钱。偶尔犒劳自己，生活不止是存钱。",
    matchTypes: ["SARP", "SALP"],
    avoidTypes: ["SCAL", "SCAS"]
  },

  FCRL: {
    code: "FCRL",
    name: "传统守财奴",
    emoji: "🐷",
    color: "#65a30d",
    description: "节俭但缺乏规划，钱都存银行，不知道具体怎么花的。",
    traits: ["省吃俭用", "银行存款", "不记账", "随缘存钱"],
    strengths: ["不会乱花钱", "有储蓄习惯", "财务压力小"],
    weaknesses: ["理财效率低", "可能错过通胀对冲", "没有明确目标"],
    advice: "你已经有了省钱的好习惯，建议开始记账，让每一分钱都更有价值。",
    matchTypes: ["SALP", "SCAP"],
    avoidTypes: ["SCAL", "SCAS"]
  },

  FCAP: {
    code: "FCAP",
    name: "谨慎投资者",
    emoji: "📊",
    color: "#0891b2",
    description: "节俭且有规划，谨慎配置资产，追求稳定增值。",
    traits: ["理性消费", "资产配置", "风险控制", "长期主义"],
    strengths: ["平衡风险和收益", "有纪律性", "财务健康", "适合中年理财"],
    weaknesses: ["可能过于谨慎", "收益上限有限", "缺乏进取心"],
    advice: "你是理财高手，已经掌握了平衡之道。可以适当增加一些进取型投资，提高收益上限。",
    matchTypes: ["SALP", "FARP"],
    avoidTypes: ["SCLP", "SCAS"]
  },

  FCAL: {
    code: "FCAL",
    name: "佛系储蓄者",
    emoji: "🧘",
    color: "#0d9488",
    description: "节俭、保守但随性，不追求高收益，够用就行。",
    traits: ["知足常乐", "不折腾", "简单生活", "心态平和"],
    strengths: ["生活简单", "财务压力小", "不会焦虑"],
    weaknesses: ["理财被动", "可能跑输通胀", "缺乏规划"],
    advice: "你的心态很好，但也要为未来做准备。建立一个简单的财务计划，让生活更有保障。",
    matchTypes: ["SALP", "FARP"],
    avoidTypes: ["SCAL", "SCAS"]
  },

  // ===== F + A 组合 (节俭+激进) =====
  FARP: {
    code: "FARP",
    name: "隐形富豪",
    emoji: "🤫",
    color: "#7c3aed",
    description: "外表节俭，内心激进，默默积累财富的狠角色。",
    traits: ["低调生活", "投资大户", "复利信徒", "财务自由追求者"],
    strengths: ["积累能力强", "投资收益高", "自律性强", "财富增长快"],
    weaknesses: ["生活可能过于简朴", "容易错过生活享受", "风险集中"],
    advice: "你是最有可能实现财务自由的类型。记得偶尔享受生活，赚钱也是为了更好的生活。",
    matchTypes: ["FCAP", "SALP"],
    avoidTypes: ["SCRL", "SCLP"]
  },

  FARL: {
    code: "FARL",
    name: "冒险储蓄者",
    emoji: "🎰",
    color: "#8b5cf6",
    description: "平时省吃俭用，但在投资上敢冒险，矛盾的存在。",
    traits: ["生活节俭", "投资激进", "高风险高回报", "随性操作"],
    strengths: ["有投资意识", "积累能力强", "可能获得高收益"],
    weaknesses: ["缺乏规划", "风险不可控", "可能大起大落"],
    advice: "你的风险偏好很高，建议加强规划，用策略代替冲动，让投资更稳健。",
    matchTypes: ["FARP", "SALP"],
    avoidTypes: ["SCRL", "FCRP"]
  },

  FASP: {
    code: "FASP",
    name: "理性投资家",
    emoji: "📈",
    color: "#6366f1",
    description: "节俭、激进、有规划，用最科学的方式追求财富增长。",
    traits: ["科学理财", "风险偏好高", "策略明确", "数据驱动"],
    strengths: ["理财能力强", "收益潜力大", "有纪律性", "适合专业投资"],
    weaknesses: ["可能过于理性", "忽视生活品质", "压力较大"],
    advice: "你是专业的投资者类型。记得投资是为了更好的生活，不要为了数字而活。",
    matchTypes: ["FARP", "FCAP"],
    avoidTypes: ["SCLP", "SCRL"]
  },

  FASL: {
    code: "FASL",
    name: "潜力股型",
    emoji: "💎",
    color: "#4f46e5",
    description: "节俭、冒险但随性，有投资意识但缺乏规划，潜力巨大。",
    traits: ["省得下", "敢于投资", "需要引导", "可塑性强"],
    strengths: ["积累能力强", "敢于尝试", "学习能力强"],
    weaknesses: ["缺乏系统", "可能走弯路", "收益不稳定"],
    advice: "你有很好的基础，只需要一个系统的方法。开始学习理财规划，你的潜力会爆发。",
    matchTypes: ["FARP", "FASP"],
    avoidTypes: ["SCRL", "SCLP"]
  },

  // ===== S + C 组合 (消费+保守) =====
  SCRP: {
    code: "SCRP",
    name: "精明消费者",
    emoji: "🛒",
    color: "#f59e0b",
    description: "爱花钱但有计划，不会乱来，精打细算地消费。",
    traits: ["会花钱", "有计划", "不冲动", "生活品质"],
    strengths: ["生活有品质", "财务可控", "懂得享受"],
    weaknesses: ["积累较慢", "可能超支", "投资意识不足"],
    advice: "你很会平衡生活和财务，建议增加一些稳健投资，让钱也为你工作。",
    matchTypes: ["FASP", "FCAP"],
    avoidTypes: ["SARL", "FASL"]
  },

  SCRL: {
    code: "SCRL",
    name: "快乐月光族",
    emoji: "🌙",
    color: "#fbbf24",
    description: "爱消费、保守但随性，有多少花多少，但不会借贷。",
    traits: ["及时行乐", "有多少花多少", "不负债", "心态好"],
    strengths: ["生活洒脱", "没有债务压力", "心理健康"],
    weaknesses: ["没有储蓄", "风险抵抗力弱", "未来保障不足"],
    advice: "你的生活态度很健康，但建议每月存一点钱，给未来的自己一个保障。",
    matchTypes: ["FCRL", "SCRP"],
    avoidTypes: ["FARP", "FASP"]
  },

  SCAP: {
    code: "SCAP",
    name: "品质投资者",
    emoji: "🍷",
    color: "#ea580c",
    description: "爱消费但也有投资，追求生活品质和财富增长的双赢。",
    traits: ["消费有度", "投资稳健", "生活品质", "财务平衡"],
    strengths: ["生活精彩", "有投资意识", "财务健康"],
    weaknesses: ["积累速度中等", "可能两头不讨好", "需要更多收入"],
    advice: "你找到了生活和财富的平衡点。继续提高收入能力，让这个平衡更稳固。",
    matchTypes: ["FARP", "FCAP"],
    avoidTypes: ["FASL", "SCRL"]
  },

  SCAL: {
    code: "SCAL",
    name: "矛盾综合体",
    emoji: "🤷",
    color: "#dc2626",
    description: "爱花钱、保守但随性投资，行为和理念有冲突。",
    traits: ["消费冲动", "投资保守", "缺乏规划", "容易纠结"],
    strengths: ["有投资意识", "不冒进"],
    weaknesses: ["消费超支", "投资效率低", "财务混乱"],
    advice: "建议先控制消费，再考虑投资。没有余粮的投资都是在赌博。",
    matchTypes: ["SCRP", "FCRL"],
    avoidTypes: ["FARP", "FASP"]
  },

  // ===== S + A 组合 (消费+激进) =====
  SARP: {
    code: "SARP",
    name: "人生赢家型",
    emoji: "🏆",
    color: "#e11d48",
    description: "敢消费也敢投资，用高收入支撑高支出，真正的赢家。",
    traits: ["高收入", "高消费", "高投资", "高风险高回报"],
    strengths: ["收入能力强", "投资眼光好", "生活精彩", "财富增长快"],
    weaknesses: ["风险集中", "收入一旦下滑压力大", "需要持续高收入"],
    advice: "你是很多人羡慕的类型，但要有风险预案。降低杠杆，保持现金流，才能走得更远。",
    matchTypes: ["FARP", "FASP"],
    avoidTypes: ["FCRP", "SCRL"]
  },

  SARL: {
    code: "SARL",
    name: "赌徒心态型",
    emoji: "🎲",
    color: "#be123c",
    description: "爱消费又爱冒险，财务大起大落，刺激但危险。",
    traits: ["敢花敢赌", "高风险偏好", "财务波动大", "缺乏规划"],
    strengths: ["敢于尝试", "可能暴富", "不惧风险"],
    weaknesses: ["财务不稳定", "可能破产", "心理压力大"],
    advice: "你的风险偏好太高了，建议设定止损线，不要把所有钱都押上。稳一点，走得更远。",
    matchTypes: ["FASL", "SARP"],
    avoidTypes: ["FCRP", "FCAP"]
  },

  SASP: {
    code: "SASP",
    name: "策略投资者",
    emoji: "🎯",
    color: "#9333ea",
    description: "消费和投资都有策略，用系统方法实现财务目标。",
    traits: ["有策略", "高消费高投资", "风险可控", "目标驱动"],
    strengths: ["财务规划能力强", "投资效率高", "生活品质好"],
    weaknesses: ["需要高收入支撑", "压力较大", "一旦失误影响大"],
    advice: "你的系统化思维很强，继续保持。记得给自己留足安全边际，才能应对意外。",
    matchTypes: ["FARP", "SARP"],
    avoidTypes: ["FCRL", "SCRL"]
  },

  SASL: {
    code: "SASL",
    name: "享乐投资者",
    emoji: "🥂",
    color: "#c026d3",
    description: "既爱享受又爱冒险，活到赚到玩到，典型的享乐主义者。",
    traits: ["享受当下", "敢于冒险", "财务随缘", "人生体验优先"],
    strengths: ["生活丰富", "不后悔", "心态超好"],
    weaknesses: ["财务风险高", "可能晚年困窘", "没有安全网"],
    advice: "你的人生态度很洒脱，但也要为未来留条后路。存一笔保命钱，其他的随便玩。",
    matchTypes: ["SARL", "SASP"],
    avoidTypes: ["FCRP", "FCAP"]
  }
};

// 计算结果类型
function calculateResult(answers) {
  // 统计各维度得分
  const scores = { F: 0, S: 0, C: 0, A: 0, R: 0, S: 0, P: 0, L: 0 };
  
  // 修正：使用不同的变量名避免冲突
  const scoreKeys = { F: 0, S_cons: 0, C: 0, A: 0, R: 0, S_risk: 0, P: 0, L: 0 };

  answers.forEach((answer, index) => {
    const question = QUESTIONS[index];
    const option = question.options[answer];
    if (option && option.scores) {
      Object.entries(option.scores).forEach(([key, value]) => {
        // 处理 S 的冲突：消费习惯的 S 和风险偏好的 S
        if (key === 'S') {
          // 根据题目类型判断是哪个维度
          if (question.type === '消费习惯') {
            scoreKeys.S_cons += value;
          } else if (question.type === '风险偏好') {
            scoreKeys.S_risk += value;
          }
        } else {
          scoreKeys[key] = (scoreKeys[key] || 0) + value;
        }
      });
    }
  });

  // 确定各维度的倾向
  const type = [
    scoreKeys.F >= scoreKeys.S_cons ? 'F' : 'S',  // 消费习惯
    scoreKeys.C >= scoreKeys.A ? 'C' : 'A',  // 投资态度
    scoreKeys.R >= scoreKeys.S_risk ? 'R' : 'S',  // 风险偏好（这里S代表冒险）
    scoreKeys.P >= scoreKeys.L ? 'P' : 'L'   // 理财意识
  ].join('');

  return {
    type: RESULT_TYPES[type] || RESULT_TYPES.FCRP,
    scores: {
      spending: { frugal: scoreKeys.F, spender: scoreKeys.S_cons, dominant: scoreKeys.F >= scoreKeys.S_cons ? 'F' : 'S' },
      investment: { conservative: scoreKeys.C, aggressive: scoreKeys.A, dominant: scoreKeys.C >= scoreKeys.A ? 'C' : 'A' },
      risk: { averse: scoreKeys.R, seeking: scoreKeys.S_risk, dominant: scoreKeys.R >= scoreKeys.S_risk ? 'R' : 'S' },
      planning: { planner: scoreKeys.P, loose: scoreKeys.L, dominant: scoreKeys.P >= scoreKeys.L ? 'P' : 'L' }
    }
  };
}

// 导出
window.RESULT_TYPES = RESULT_TYPES;
window.calculateResult = calculateResult;

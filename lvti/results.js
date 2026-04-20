/**
 * LVTI 爱情观测试指标 - 结果类型
 *
 * 四个维度组合产生 16 种类型：
 * 1. 亲密需求 (I/C) - Independent 独立型 vs Clingy 依恋型
 * 2. 表达方式 (S/E) - Silent 沉默型 vs Expressive 表达型
 * 3. 承诺态度 (F/B) - Free 自由型 vs Binding 承诺型
 * 4. 冲突处理 (A/H) - Avoid 回避型 vs Heads-on 直面型
 */

const RESULT_TYPES = {
  // ===== I + S 组合 (独立+沉默) =====
  ISFA: {
    code: "ISFA",
    name: "冷静独行侠",
    emoji: "🧊",
    color: "#6b7280",
    description: "独立自主，不爱表达，享受自由，回避冲突。",
    traits: ["享受独处", "行动派", "随性而为", "害怕争吵"],
    strengths: ["不会给伴侣压力", "用行动证明爱", "尊重彼此空间"],
    weaknesses: ["可能显得冷淡", "问题容易积累", "不善于表达感受"],
    advice: "试着多说一些爱的话语，让伴侣感受到你的心意。定期沟通可以避免小问题变成大问题。",
    matchTypes: ["CEBH", "CEBA"],
    avoidTypes: ["CSBH", "CSFH"]
  },

  ISFB: {
    code: "ISFB",
    name: "稳定守护者",
    emoji: "🏔️",
    color: "#059669",
    description: "独立但忠诚，沉默但坚定，追求长期稳定的关系。",
    traits: ["内敛稳重", "默默付出", "忠诚可靠", "避重就轻"],
    strengths: ["值得信赖", "不会纠缠", "默默守护家庭"],
    weaknesses: ["情感表达不足", "逃避深度沟通", "可能让伴侣感到被忽略"],
    advice: "你的伴侣需要知道你在乎TA。偶尔主动分享你的想法，让关系更加亲密。",
    matchTypes: ["CEBH", "CSFH"],
    avoidTypes: ["CEFH", "CSBH"]
  },

  ISHA: {
    code: "ISHA",
    name: "理性务实派",
    emoji: "⚖️",
    color: "#7c3aed",
    description: "独立思考，沉默冷静，自由随性，直面问题。",
    traits: ["独立思考", "用事实说话", "不设边界", "解决问题"],
    strengths: ["不会被情绪左右", "能够客观分析问题", "尊重彼此"],
    weaknesses: ["可能显得过于理性", "缺乏浪漫", "有时过于直接"],
    advice: "爱情不只有理性，也需要感性。偶尔制造一些浪漫惊喜，让关系更有温度。",
    matchTypes: ["CEBA", "CEBH"],
    avoidTypes: ["CSFA", "CSFH"]
  },

  ISHB: {
    code: "ISHB",
    name: "稳重靠山型",
    emoji: "🏛️",
    color: "#1d4ed8",
    description: "独立自主，话不多说，认定就守，有问题就解。",
    traits: ["独立", "务实", "忠诚", "问题导向"],
    strengths: ["值得依靠", "情绪稳定", "认真负责"],
    weaknesses: ["不够浪漫", "可能显得木讷", "缺乏情感交流"],
    advice: "你是最可靠的伴侣类型。记得偶尔表达爱意，让关系更有温度。",
    matchTypes: ["CEFB", "CEBH"],
    avoidTypes: ["CSFA", "CSFB"]
  },

  // ===== I + E 组合 (独立+表达) =====
  IEFA: {
    code: "IEFA",
    name: "潇洒自由魂",
    emoji: "🦋",
    color: "#ec4899",
    description: "独立但会表达，享受自由，能说会道，避开纷争。",
    traits: ["自我", "甜言蜜语", "随性", "不喜冲突"],
    strengths: ["相处轻松", "懂得制造浪漫", "给彼此空间"],
    weaknesses: ["可能不够深入", "承诺感不强", "遇到问题容易逃避"],
    advice: "你很会恋爱，但可能让伴侣觉得不够安心。偶尔展现你的认真，让对方知道你的在意。",
    matchTypes: ["ISBH", "CEBH"],
    avoidTypes: ["CSBH", "CSFB"]
  },

  IEFB: {
    code: "IEFB",
    name: "浪漫理想家",
    emoji: "🌈",
    color: "#f59e0b",
    description: "独立且会表达，既浪漫又专一，追求理想的爱情。",
    traits: ["自我", "浪漫", "理想主义", "回避矛盾"],
    strengths: ["懂得浪漫", "保持自我", "追求完美爱情"],
    weaknesses: ["可能过于理想化", "逃避现实问题", "有点不切实际"],
    advice: "你的爱情观很美好，但现实需要面对问题。勇敢面对矛盾，才能让爱情更长久。",
    matchTypes: ["ISBH", "CSFH"],
    avoidTypes: ["CSBH", "ISHB"]
  },

  IEHA: {
    code: "IEHA",
    name: "洒脱通透派",
    emoji: "🌸",
    color: "#14b8a6",
    description: "独立，善于表达，享受自由，有问题就说。",
    traits: ["自我", "能说会道", "随性", "直来直去"],
    strengths: ["相处不累", "沟通顺畅", "不给压力"],
    weaknesses: ["可能过于随性", "不够稳定", "承诺感弱"],
    advice: "你的洒脱很迷人，但长期关系需要更多投入。找到那个值得你认真对待的人。",
    matchTypes: ["ISBH", "CEBH"],
    avoidTypes: ["CSFB", "CSBH"]
  },

  IEHB: {
    code: "IEHB",
    name: "成熟魅力型",
    emoji: "💎",
    color: "#8b5cf6",
    description: "独立，会表达，有承诺，能沟通，成熟魅力满分。",
    traits: ["独立", "浪漫", "专一", "理性沟通"],
    strengths: ["理想的伴侣", "情商高", "有担当"],
    weaknesses: ["标准高", "可能让人有压力", "难以满足"],
    advice: "你是很多人向往的伴侣类型。记得给对方成长的空间，不要标准太高。",
    matchTypes: ["ISBH", "CEBH", "CSFH"],
    avoidTypes: ["ISFA", "CSFA"]
  },

  // ===== C + S 组合 (依恋+沉默) =====
  CSFA: {
    code: "CSFA",
    name: "默默守护者",
    emoji: "🌻",
    color: "#f97316",
    description: "渴望亲密，默默付出，随缘发展，害怕冲突。",
    traits: ["依恋", "行动派", "顺其自然", "逃避争吵"],
    strengths: ["真心付出", "不会强迫对方", "愿意改变"],
    weaknesses: ["可能过于依赖", "不会表达需求", "问题容易积压"],
    advice: "你很爱对方，但要学会表达。说出来，才能让对方知道你的想法和需求。",
    matchTypes: ["IEBH", "IEHB"],
    avoidTypes: ["ISFA", "ISHA"]
  },

  CSFB: {
    code: "CSFB",
    name: "忠诚陪伴型",
    emoji: "🐕",
    color: "#dc2626",
    description: "依恋伴侣，用行动证明，认定就守，回避矛盾。",
    traits: ["粘人", "默默付出", "忠诚", "害怕争吵"],
    strengths: ["真心实意", "非常忠诚", "愿意为爱付出"],
    weaknesses: ["可能过于依赖", "不会沟通问题", "容易委屈自己"],
    advice: "你的付出很珍贵，但也要学会表达和沟通。健康的感情需要双向交流。",
    matchTypes: ["IEBH", "IEHB"],
    avoidTypes: ["ISFA", "ISHA"]
  },

  CSHA: {
    code: "CSHA",
    name: "坚定行动派",
    emoji: "🔥",
    color: "#ea580c",
    description: "依恋伴侣，用行动说话，自由随性，有问题就解。",
    traits: ["依恋", "务实", "不设限", "问题导向"],
    strengths: ["愿意付出", "能够解决问题", "真心实意"],
    weaknesses: ["可能过于粘人", "表达不够", "有时太直接"],
    advice: "你的真心很珍贵，但也要学会用语言表达爱意。平衡亲密和独立。",
    matchTypes: ["IEBH", "IEHB"],
    avoidTypes: ["ISFA", "IEFA"]
  },

  CSHB: {
    code: "CSHB",
    name: "全心投入型",
    emoji: "❤️",
    color: "#be123c",
    description: "依恋，行动派，认定就全情投入，有问题立刻解决。",
    traits: ["粘人", "付出", "专一", "解决问题"],
    strengths: ["全心全意", "忠诚可靠", "认真对待问题"],
    weaknesses: ["可能过于依赖", "给对方压力", "失去自我"],
    advice: "你的投入很感人，但也要保持自己的独立空间。爱对方，也要爱自己。",
    matchTypes: ["IEHB", "ISHB"],
    avoidTypes: ["ISFA", "IEFA"]
  },

  // ===== C + E 组合 (依恋+表达) =====
  CEFA: {
    code: "CEFA",
    name: "甜蜜小棉袄",
    emoji: "🍬",
    color: "#fb7185",
    description: "渴望亲密，表达热烈，随缘发展，避开纷争。",
    traits: ["依恋", "甜言蜜语", "顺其自然", "怕吵架"],
    strengths: ["很会恋爱", "让伴侣有安全感", "懂得浪漫"],
    weaknesses: ["可能过于粘人", "不够实际", "逃避问题"],
    advice: "你很甜，但爱情需要面对现实问题。勇敢解决矛盾，才能走得更远。",
    matchTypes: ["ISBH", "ISHB"],
    avoidTypes: ["ISFA", "CSBH"]
  },

  CEFB: {
    code: "CEFB",
    name: "浪漫小公举",
    emoji: "👸",
    color: "#f472b6",
    description: "依恋，会表达，追求浪漫，认定就绑，回避矛盾。",
    traits: ["粘人", "浪漫", "专一", "害怕冲突"],
    strengths: ["非常浪漫", "真心投入", "让伴侣感到被爱"],
    weaknesses: ["可能过于理想化", "逃避现实问题", "给对方压力"],
    advice: "你的浪漫很珍贵，但现实生活需要面对问题。学会沟通矛盾，感情才能长久。",
    matchTypes: ["ISBH", "ISHB"],
    avoidTypes: ["ISFA", "ISHA"]
  },

  CEBH: {
    code: "CEBH",
    name: "热情直率派",
    emoji: "🌹",
    color: "#e11d48",
    description: "依恋，热烈表达，随性而爱，有问题直接说。",
    traits: ["依恋", "甜言蜜语", "不设限", "直来直去"],
    strengths: ["热情主动", "善于沟通", "真心实意"],
    weaknesses: ["可能过于依赖", "情绪化", "有时太直接"],
    advice: "你的热情很感染人，但也要学会给彼此空间。平衡亲密和独立。",
    matchTypes: ["ISBH", "ISHB", "IEHB"],
    avoidTypes: ["ISFA", "CSFA"]
  },

  CEHB: {
    code: "CEHB",
    name: "完美恋人型",
    emoji: "💕",
    color: "#db2777",
    description: "依恋但成熟，善于表达，认定就守，能沟通解难。",
    traits: ["依恋", "浪漫", "专一", "理性沟通"],
    strengths: ["理想伴侣", "情商高", "真心付出", "能解决问题"],
    weaknesses: ["标准高", "可能太完美主义", "给对方压力"],
    advice: "你是很多人梦寐以求的伴侣类型。记得接受对方的不完美，爱情需要包容。",
    matchTypes: ["ISBH", "IEHB", "ISHB"],
    avoidTypes: ["ISFA", "IEFA"]
  }
};

// 计算结果类型
function calculateResult(answers) {
  // 统计各维度得分
  const scores = { I: 0, C: 0, S: 0, E: 0, F: 0, B: 0, A: 0, H: 0 };

  answers.forEach((answer, index) => {
    const question = QUESTIONS[index];
    const option = question.options[answer];
    if (option && option.scores) {
      Object.entries(option.scores).forEach(([key, value]) => {
        scores[key] += value;
      });
    }
  });

  // 确定各维度的倾向
  const type = [
    scores.I >= scores.C ? 'I' : 'C',  // 亲密需求
    scores.S >= scores.E ? 'S' : 'E',  // 表达方式
    scores.F >= scores.B ? 'F' : 'B',  // 承诺态度
    scores.A >= scores.H ? 'A' : 'H'   // 冲突处理
  ].join('');

  return {
    type: RESULT_TYPES[type] || RESULT_TYPES.ISFA,
    scores: {
      intimacy: { independent: scores.I, clingy: scores.C, dominant: scores.I >= scores.C ? 'I' : 'C' },
      expression: { silent: scores.S, expressive: scores.E, dominant: scores.S >= scores.E ? 'S' : 'E' },
      commitment: { free: scores.F, binding: scores.B, dominant: scores.F >= scores.B ? 'F' : 'B' },
      conflict: { avoid: scores.A, headsOn: scores.H, dominant: scores.A >= scores.H ? 'A' : 'H' }
    }
  };
}

// 导出
window.RESULT_TYPES = RESULT_TYPES;
window.calculateResult = calculateResult;

/**
 * CKTI 财商测试指标 - 题目设计
 *
 * 四个维度：
 * 1. 消费习惯 (F/S) - Frugal 节俭型 vs Spender 消费型
 * 2. 投资态度 (C/A) - Conservative 保守型 vs Aggressive 激进型
 * 3. 风险偏好 (R/S) - RiskAverse 规避型 vs RiskSeeking 冒险型
 * 4. 理财意识 (P/L) - Planner 规划型 vs Loose 随性型
 */

const QUESTIONS = [
  // ===== 消费习惯维度 (F/S) =====
  {
    id: 1,
    type: "消费习惯",
    question: "双十一看到喜欢的东西打五折，你会？",
    options: [
      { text: "先加入购物车，等活动结束再决定要不要买", scores: { F: 2 } },
      { text: "理性对比价格，确实划算就买", scores: { F: 1 } },
      { text: "喜欢就买，打折不买更亏", scores: { S: 1 } },
      { text: "直接下单，错过这村没这店", scores: { S: 2 } }
    ]
  },
  {
    id: 2,
    type: "消费习惯",
    question: "你的购物习惯是？",
    options: [
      { text: "很少购物，够用就行", scores: { F: 2 } },
      { text: "有需要才买，不冲动消费", scores: { F: 1 } },
      { text: "偶尔会买些提升生活品质的东西", scores: { S: 1 } },
      { text: "看到喜欢的就买，开心最重要", scores: { S: 2 } }
    ]
  },
  {
    id: 3,
    type: "消费习惯",
    question: "朋友聚会，你会？",
    options: [
      { text: "提前说明AA，控制预算", scores: { F: 2 } },
      { text: "正常参与，不会特别计较", scores: { F: 1, S: 1 } },
      { text: "偶尔请客，朋友间不用太计较", scores: { S: 1 } },
      { text: "经常主动买单，钱就是用来花的", scores: { S: 2 } }
    ]
  },
  {
    id: 4,
    type: "消费习惯",
    question: "关于"奢侈品"，你的态度是？",
    options: [
      { text: "完全不考虑，消费主义陷阱", scores: { F: 2 } },
      { text: "不会主动买，别人送可以接受", scores: { F: 1 } },
      { text: "偶尔买个包或表犒劳自己", scores: { S: 1 } },
      { text: "喜欢就买，生活要有品质", scores: { S: 2 } }
    ]
  },
  {
    id: 5,
    type: "消费习惯",
    question: "每月的结余，你通常会？",
    options: [
      { text: "大部分存起来，以备不时之需", scores: { F: 2 } },
      { text: "存一半，花一半", scores: { F: 1 } },
      { text: "有多少花多少，及时行乐", scores: { S: 2 } },
      { text: "经常月光，甚至透支", scores: { S: 2 } }
    ]
  },

  // ===== 投资态度维度 (C/A) =====
  {
    id: 6,
    type: "投资态度",
    question: "如果有一笔闲钱，你会怎么处理？",
    options: [
      { text: "放银行定期或货币基金，安全第一", scores: { C: 2 } },
      { text: "买些低风险理财产品，稳定增值", scores: { C: 1 } },
      { text: "配置一部分股票或基金，追求收益", scores: { A: 1 } },
      { text: "全力投入高收益产品，富贵险中求", scores: { A: 2 } }
    ]
  },
  {
    id: 7,
    type: "投资态度",
    question: "关于"投资"，你更认同哪句话？",
    options: [
      { text: "保住本金比赚钱更重要", scores: { C: 2 } },
      { text: "稳健收益，不追求暴富", scores: { C: 1 } },
      { text: "风险和收益成正比，值得尝试", scores: { A: 1 } },
      { text: "高风险高回报，年轻就是资本", scores: { A: 2 } }
    ]
  },
  {
    id: 8,
    type: "投资态度",
    question: "你的投资组合主要是？",
    options: [
      { text: "全部是存款或货币基金", scores: { C: 2 } },
      { text: "大部分债券/理财，小部分基金", scores: { C: 1 } },
      { text: "股票、基金各一半", scores: { A: 1 } },
      { text: "主要是股票、加密货币等高风险资产", scores: { A: 2 } }
    ]
  },
  {
    id: 9,
    type: "投资态度",
    question: "投资亏损 20%，你会？",
    options: [
      { text: "立即止损，以后不再碰", scores: { C: 2 } },
      { text: "卖出部分，保留观察", scores: { C: 1 } },
      { text: "继续持有，等待回本", scores: { A: 1 } },
      { text: "加仓抄底，跌得越多买得越多", scores: { A: 2 } }
    ]
  },
  {
    id: 10,
    type: "投资态度",
    question: "你对"财务自由"的态度是？",
    options: [
      { text: "稳健积累，慢慢来", scores: { C: 2 } },
      { text: "有一定的规划，但不过分追求", scores: { C: 1 } },
      { text: "有机会就抓住，加速实现", scores: { A: 1 } },
      { text: "年轻时搏一把，财务自由是目标", scores: { A: 2 } }
    ]
  },

  // ===== 风险偏好维度 (R/S) =====
  {
    id: 11,
    type: "风险偏好",
    question: "朋友推荐一个"稳赚"的投资项目，你会？",
    options: [
      { text: "完全不信，天上不会掉馅饼", scores: { R: 2 } },
      { text: "先了解清楚，再做决定", scores: { R: 1 } },
      { text: "小试牛刀，投入少量资金", scores: { S: 1 } },
      { text: "相信朋友，果断跟进", scores: { S: 2 } }
    ]
  },
  {
    id: 12,
    type: "风险偏好",
    question: "选择工作时，你更看重？",
    options: [
      { text: "稳定的收入和福利", scores: { R: 2 } },
      { text: "有成长空间，风险可控", scores: { R: 1 } },
      { text: "高薪但有挑战", scores: { S: 1 } },
      { text: "高风险高回报，创业或销售", scores: { S: 2 } }
    ]
  },
  {
    id: 13,
    type: "风险偏好",
    question: "如果有机会翻倍但可能全亏，你会？",
    options: [
      { text: "绝对不会参与", scores: { R: 2 } },
      { text: "用极小金额玩玩，当娱乐", scores: { R: 1 } },
      { text: "投入可承受损失的资金", scores: { S: 1 } },
      { text: "机会难得，值得博一把", scores: { S: 2 } }
    ]
  },
  {
    id: 14,
    type: "风险偏好",
    question: "你的应急备用金是？",
    options: [
      { text: "至少 6 个月的生活费", scores: { R: 2 } },
      { text: "3-6 个月的生活费", scores: { R: 1 } },
      { text: "1-2 个月，够用就行", scores: { S: 1 } },
      { text: "没有备用金，活在当下", scores: { S: 2 } }
    ]
  },
  {
    id: 15,
    type: "风险偏好",
    question: "关于"借钱给别人"，你的态度是？",
    options: [
      { text: "基本不借，救急不救穷", scores: { R: 2 } },
      { text: "看关系亲疏，借了就当可能要不回", scores: { R: 1 } },
      { text: "朋友有难会帮，相信他们", scores: { S: 1 } },
      { text: "经常借，不太计较", scores: { S: 2 } }
    ]
  },

  // ===== 理财意识维度 (P/L) =====
  {
    id: 16,
    type: "理财意识",
    question: "你有记账的习惯吗？",
    options: [
      { text: "每笔都记，月月复盘", scores: { P: 2 } },
      { text: "大额支出记账，日常不记", scores: { P: 1 } },
      { text: "偶尔记一下，坚持不了", scores: { L: 1 } },
      { text: "从不记账，太麻烦", scores: { L: 2 } }
    ]
  },
  {
    id: 17,
    type: "理财意识",
    question: "关于"预算"，你的做法是？",
    options: [
      { text: "每月详细规划，严格执行", scores: { P: 2 } },
      { text: "心里有数，大致控制", scores: { P: 1 } },
      { text: "知道要省钱，但经常超支", scores: { L: 1 } },
      { text: "没有预算的概念", scores: { L: 2 } }
    ]
  },
  {
    id: 18,
    type: "理财意识",
    question: "你对自己的财务状况了解多少？",
    options: [
      { text: "清楚每一分钱的去向", scores: { P: 2 } },
      { text: "知道大概的收支情况", scores: { P: 1 } },
      { text: "只知道余额，不清楚明细", scores: { L: 1 } },
      { text: "从不关注，够花就行", scores: { L: 2 } }
    ]
  },
  {
    id: 19,
    type: "理财意识",
    question: "关于"理财目标"，你有吗？",
    options: [
      { text: "有明确的短期、中期、长期目标", scores: { P: 2 } },
      { text: "有大致规划，但不够具体", scores: { P: 1 } },
      { text: "想存钱但没有具体目标", scores: { L: 1 } },
      { text: "没有目标，走一步看一步", scores: { L: 2 } }
    ]
  },
  {
    id: 20,
    type: "理财意识",
    question: "你会主动学习理财知识吗？",
    options: [
      { text: "经常看书、看文章学习", scores: { P: 2 } },
      { text: "偶尔关注一些理财内容", scores: { P: 1 } },
      { text: "想起来才会看一眼", scores: { L: 1 } },
      { text: "没兴趣，太枯燥了", scores: { L: 2 } }
    ]
  }
];

// 导出供 app.js 使用
window.QUESTIONS = QUESTIONS;

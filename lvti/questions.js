/**
 * LVTI 爱情观测试指标 - 题目设计
 *
 * 四个维度：
 * 1. 亲密需求 (I/C) - Independent 独立型 vs Clingy 依恋型
 * 2. 表达方式 (S/E) - Silent 沉默型 vs Expressive 表达型
 * 3. 承诺态度 (F/B) - Free 自由型 vs Binding 承诺型
 * 4. 冲突处理 (A/H) - Avoid 回避型 vs Heads-on 直面型
 */

const QUESTIONS = [
  // ===== 亲密需求维度 (I/C) =====
  {
    id: 1,
    type: "亲密需求",
    question: "伴侣出差一周，你的感受是？",
    options: [
      { text: "正好有自己的时间，可以做很多想做的事", scores: { I: 2 } },
      { text: "有点想念，但也能享受独处", scores: { I: 1 } },
      { text: "会频繁联系，很想TA在身边", scores: { C: 1 } },
      { text: "很难受，感觉空落落的", scores: { C: 2 } }
    ]
  },
  {
    id: 2,
    type: "亲密需求",
    question: "你理想中的同居状态是？",
    options: [
      { text: "各自有独立空间，偶尔交集", scores: { I: 2 } },
      { text: "大部分时间在一起，偶尔独处", scores: { I: 1, C: 1 } },
      { text: "形影不离，做什么都一起", scores: { C: 2 } },
      { text: "可以不同居，保持各自的住所", scores: { I: 2 } }
    ]
  },
  {
    id: 3,
    type: "亲密需求",
    question: "伴侣想查看你的手机，你会？",
    options: [
      { text: "可以，没问题，互相坦诚", scores: { C: 1 } },
      { text: "有些不自在，但可以让TA看", scores: { I: 1 } },
      { text: "不太愿意，需要个人隐私空间", scores: { I: 2 } },
      { text: "坚决不行，这是底线", scores: { I: 2 } }
    ]
  },
  {
    id: 4,
    type: "亲密需求",
    question: "你更认同哪句话？",
    options: [
      { text: "爱情是锦上添花，不是必需品", scores: { I: 2 } },
      { text: "爱情很重要，但不是生活的全部", scores: { I: 1 } },
      { text: "没有爱情的人生是不完整的", scores: { C: 2 } },
      { text: "爱情是我生命中最重要的事", scores: { C: 2 } }
    ]
  },
  {
    id: 5,
    type: "亲密需求",
    question: "周末伴侣想和朋友聚会，你？",
    options: [
      { text: "太好了，我也有自己的安排", scores: { I: 2 } },
      { text: "可以，各玩各的也挺好", scores: { I: 1 } },
      { text: "希望TA能带上我", scores: { C: 1 } },
      { text: "有点失落，想和TA一起过周末", scores: { C: 2 } }
    ]
  },

  // ===== 表达方式维度 (S/E) =====
  {
    id: 6,
    type: "表达方式",
    question: "表达爱意时，你更倾向于？",
    options: [
      { text: "用行动，比如做顿饭、帮忙解决问题", scores: { S: 2 } },
      { text: "偶尔说甜言蜜语，更多是行动", scores: { S: 1 } },
      { text: "经常说我爱你，也注重仪式感", scores: { E: 1 } },
      { text: "每天都要表达，让TA时刻感受到爱", scores: { E: 2 } }
    ]
  },
  {
    id: 7,
    type: "表达方式",
    question: "纪念日/生日，你的做法是？",
    options: [
      { text: "可能会忘，或者简单表示一下", scores: { S: 2 } },
      { text: "会准备礼物，但不太会说浪漫的话", scores: { S: 1 } },
      { text: "精心准备惊喜，写情书/卡片", scores: { E: 1 } },
      { text: "必须隆重，朋友圈秀恩爱", scores: { E: 2 } }
    ]
  },
  {
    id: 8,
    type: "表达方式",
    question: "你有多久没说"我爱你"了？",
    options: [
      { text: "想不起来，很久没说了", scores: { S: 2 } },
      { text: "偶尔说，不是每天", scores: { S: 1 } },
      { text: "经常说，每天至少一次", scores: { E: 1 } },
      { text: "每天好几次，见面就说", scores: { E: 2 } }
    ]
  },
  {
    id: 9,
    type: "表达方式",
    question: "伴侣情绪低落时，你会？",
    options: [
      { text: "默默陪在身边，做些力所能及的事", scores: { S: 2 } },
      { text: "尝试安慰，但不太会说好听的话", scores: { S: 1 } },
      { text: "主动询问原因，鼓励TA说出来", scores: { E: 1 } },
      { text: "抱住TA，反复说"我在这里"", scores: { E: 2 } }
    ]
  },
  {
    id: 10,
    type: "表达方式",
    question: "收到伴侣的消息"想你了"，你回复？",
    options: [
      { text: "嗯/好的/知道了", scores: { S: 2 } },
      { text: "我也想你", scores: { S: 1, E: 1 } },
      { text: "超级想你！什么时候见面？", scores: { E: 1 } },
      { text: "每分每秒都在想你，心都要化了", scores: { E: 2 } }
    ]
  },

  // ===== 承诺态度维度 (F/B) =====
  {
    id: 11,
    type: "承诺态度",
    question: "恋爱多久考虑结婚比较合适？",
    options: [
      { text: "没有具体规划，顺其自然", scores: { F: 2 } },
      { text: "至少2-3年，充分了解再说", scores: { F: 1 } },
      { text: "1年左右，认定就想定下来", scores: { B: 1 } },
      { text: "越快越好，遇到对的人就结", scores: { B: 2 } }
    ]
  },
  {
    id: 12,
    type: "承诺态度",
    question: "你如何看待"永远"这个承诺？",
    options: [
      { text: "不轻易说永远，太沉重了", scores: { F: 2 } },
      { text: "可以承诺，但心里知道变数很多", scores: { F: 1 } },
      { text: "相信永远，努力让它成真", scores: { B: 1 } },
      { text: "一定要承诺永远，这是对爱情的尊重", scores: { B: 2 } }
    ]
  },
  {
    id: 13,
    type: "承诺态度",
    question: "关于"见家长"，你的态度是？",
    options: [
      { text: "太早了，不想有压力", scores: { F: 2 } },
      { text: "等关系稳定了再说", scores: { F: 1 } },
      { text: "愿意主动提出，让家人认识TA", scores: { B: 1 } },
      { text: "交往初期就想带回家，认定了", scores: { B: 2 } }
    ]
  },
  {
    id: 14,
    type: "承诺态度",
    question: "伴侣提出签"恋爱协议"或"婚前协议"，你？",
    options: [
      { text: "可以理解，这是理性的表现", scores: { F: 1, B: 1 } },
      { text: "能接受，但对感情有点冷冰冰", scores: { F: 1 } },
      { text: "不太舒服，感觉不信任", scores: { B: 1 } },
      { text: "拒绝，爱情不应该有条件", scores: { B: 2 } }
    ]
  },
  {
    id: 15,
    type: "承诺态度",
    question: "你更认同哪种恋爱观？",
    options: [
      { text: "享受当下，不给自己设限", scores: { F: 2 } },
      { text: "随缘发展，不急不躁", scores: { F: 1 } },
      { text: "认真对待，朝长远方向努力", scores: { B: 1 } },
      { text: "以结婚为前提交往", scores: { B: 2 } }
    ]
  },

  // ===== 冲突处理维度 (A/H) =====
  {
    id: 16,
    type: "冲突处理",
    question: "发生争吵时，你通常会？",
    options: [
      { text: "先回避，等冷静再说", scores: { A: 2 } },
      { text: "沉默，不想把事情闹大", scores: { A: 1 } },
      { text: "当场说清楚，不憋着", scores: { H: 1 } },
      { text: "一定要争出对错，解决问题", scores: { H: 2 } }
    ]
  },
  {
    id: 17,
    type: "冲突处理",
    question: "伴侣抱怨你的某个缺点，你会？",
    options: [
      { text: "转移话题，不想面对", scores: { A: 2 } },
      { text: "承认问题，但心里不太舒服", scores: { A: 1 } },
      { text: "认真听，想办法改进", scores: { H: 1 } },
      { text: "深入讨论，找到问题根源", scores: { H: 2 } }
    ]
  },
  {
    id: 18,
    type: "冲突处理",
    question: "发现伴侣对自己不满但没明说，你？",
    options: [
      { text: "装作不知道，等TA自己说出来", scores: { A: 2 } },
      { text: "有点担心，但不知道怎么开口", scores: { A: 1 } },
      { text: "主动问TA是不是有什么问题", scores: { H: 1 } },
      { text: "直接找TA谈话，把话说开", scores: { H: 2 } }
    ]
  },
  {
    id: 19,
    type: "冲突处理",
    question: "你如何看待感情中的"冷暴力"？",
    options: [
      { text: "有时需要冷静一下，可以理解", scores: { A: 2 } },
      { text: "偶尔沉默还好，不能太久", scores: { A: 1 } },
      { text: "有问题应该直接说，冷暴力伤感情", scores: { H: 1 } },
      { text: "坚决反对，这是最差的沟通方式", scores: { H: 2 } }
    ]
  },
  {
    id: 20,
    type: "冲突处理",
    question: "如果问题一直解决不了，你会？",
    options: [
      { text: "暂时搁置，也许时间会解决", scores: { A: 2 } },
      { text: "试着接受现状，学会忍耐", scores: { A: 1 } },
      { text: "寻求妥协方案，各退一步", scores: { H: 1 } },
      { text: "必须解决，否则关系无法继续", scores: { H: 2 } }
    ]
  }
];

// 导出供 app.js 使用
window.QUESTIONS = QUESTIONS;

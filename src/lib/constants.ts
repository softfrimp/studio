export const INSPIRATIONAL_QUOTES: string[] = [
  "The best way to predict the future is to create it.",
  "Believe you can and you're halfway there.",
  "Embrace the glorious mess that you are.",
  "You are stronger than you think.",
  "Every day is a new beginning, tend to it with love.",
  "Listen to your body; it's wiser than you think.",
  "Self-care is not selfish, it's essential."
];

export const FUN_FACTS: string[] = [
  "The average menstrual cycle is 28 days long, but can range from 21 to 35 days.",
  "Ovulation usually occurs about 14 days before your period starts.",
  "Menstruation is a natural and healthy part of life for many.",
  "The color of menstrual blood can vary throughout your period.",
  "Some people experience 'period brain', a feeling of fogginess, which is totally normal.",
  "Historically, many cultures have had unique rituals and views on menstruation."
];

export type QuizQuestion = {
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
};

export const STATIC_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    questionText: "What is the typical length of a menstrual cycle?",
    options: ["14 days", "28 days", "40 days", "7 days"],
    correctAnswerIndex: 1,
    explanation: "While cycles can range from 21 to 35 days, 28 days is the average length used as a general guideline."
  },
  {
    questionText: "Which hormone is dominant during the follicular phase (before ovulation)?",
    options: ["Progesterone", "Testosterone", "Estrogen", "Cortisol"],
    correctAnswerIndex: 2,
    explanation: "Estrogen is the primary hormone during the follicular phase, responsible for thickening the uterine lining."
  },
  {
    questionText: "Which of these is a common symptom of Premenstrual Syndrome (PMS)?",
    options: ["Increased energy", "Mood swings", "Hair growth", "Improved memory"],
    correctAnswerIndex: 1,
    explanation: "Mood swings, bloating, and fatigue are common symptoms of PMS, caused by hormonal fluctuations."
  },
  {
    questionText: "What is ovulation?",
    options: ["The start of a period", "The release of an egg from the ovary", "The shedding of the uterine lining", "The end of the fertile window"],
    correctAnswerIndex: 1,
    explanation: "Ovulation is the key event in the menstrual cycle where a mature egg is released from an ovary, making pregnancy possible."
  },
  {
    questionText: "Which of these can help alleviate menstrual cramps?",
    options: ["Drinking more caffeine", "Avoiding exercise", "Using a heating pad", "Eating more sugar"],
    correctAnswerIndex: 2,
    explanation: "Applying heat with a heating pad or warm bath can help relax the uterine muscles and relieve cramp pain. Gentle exercise can also help."
  }
];

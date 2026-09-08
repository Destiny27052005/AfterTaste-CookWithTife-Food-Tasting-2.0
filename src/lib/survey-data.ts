export const QUESTION_IDS = [
  "pepper-soup",
  "fried-rice",
  "pasta",
  "parfait",
  "overall",
  "friend",
] as const;

export type QuestionId = (typeof QUESTION_IDS)[number];

export type Question = {
  id: QuestionId;
  title: string;
  prompt: string;
  options: readonly [string, string, string, ...string[]];
};

export type SurveyAnswers = Partial<Record<QuestionId, string>>;
export type CompletedSurveyAnswers = Record<QuestionId, string>;

export const questions = [
  {
    id: "pepper-soup",
    title: "Pepper Soup",
    prompt: "How did it hit?",
    options: [
      "It needed more time on the fire",
      "E do am, it was good",
      "This is the best pepper soup I've had",
      "I need the recipe abeg",
    ],
  },
  {
    id: "fried-rice",
    title: "Fried Rice",
    prompt: "Yay or nay?",
    options: [
      "E try but nothing special",
      "It was really good",
      "This rice has changed my life",
      "I need a takeaway pack",
    ],
  },
  {
    id: "pasta",
    title: "Pasta",
    prompt: "Talk to us",
    options: [
      "Not my thing",
      "It was nice",
      "Pasta did not come to play today",
      "Who cooked this? Let me shake your hand",
    ],
  },
  {
    id: "parfait",
    title: "Parfait",
    prompt: "The moment of truth",
    options: [
      "It was okay",
      "Really enjoyed it",
      "This parfait is not from here",
      "I will be thinking about this parfait for days",
    ],
  },
  {
    id: "overall",
    title: "Overall Experience",
    prompt: "How was your afternoon?",
    options: [
      "It was a nice time",
      "Really glad I came",
      "This was worth every kobo",
      "Food Tasting 3.0 I'm already there",
    ],
  },
  {
    id: "friend",
    title: "Bring A Friend?",
    prompt: "Would you bring a friend to Food Tasting 3.0?",
    options: [
      "Honestly no",
      "Maybe",
      "Yes already have someone in mind",
      "I'll bring two people minimum",
    ],
  },
] as const satisfies readonly Question[];
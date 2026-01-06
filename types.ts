
export interface MCQ {
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface QuizSet {
  totalQuestions: number;
  questions: MCQ[];
}

export interface AppData {
  quizSets: {
    bihar: QuizSet;
    india: QuizSet;
    international: QuizSet;
  };
  newsSection: {
    bihar: string[];
    india: string[];
    international: string[];
  };
}

export type HistoryData = Record<string, AppData>; // Date string (YYYY-MM-DD) -> AppData

export type Category = 'bihar' | 'india' | 'international';
export type ViewMode = 'home' | 'news' | 'quiz';

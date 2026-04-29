export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  knownCount: number;
}

export type AppView = 'study' | 'all-cards';

export type CardStatus = 'mastered' | 'in-progress' | 'not-started';

export interface StudyStats {
  total: number;
  mastered: number;
  inProgress: number;
  notStarted: number;
}

export interface FlashcardFormData {
  question: string;
  answer: string;
  category: string;
}

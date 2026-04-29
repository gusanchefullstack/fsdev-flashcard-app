import { useState, useCallback, useMemo } from 'react';
import type { Flashcard, FlashcardFormData, StudyStats, CardStatus } from '../types';
import { initialFlashcards } from '../data/flashcards';
import { MASTERED_THRESHOLD, STORAGE_KEY } from '../data/constants';

function loadCards(): Flashcard[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as Flashcard[];
  } catch {
    // ignore
  }
  return initialFlashcards;
}

function saveCards(cards: Flashcard[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  } catch {
    // ignore
  }
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function getCardStatus(card: Flashcard): CardStatus {
  if (card.knownCount >= MASTERED_THRESHOLD) return 'mastered';
  if (card.knownCount > 0) return 'in-progress';
  return 'not-started';
}

export function useFlashcards() {
  const [cards, setCards] = useState<Flashcard[]>(loadCards);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [hideMastered, setHideMastered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffledOrder, setShuffledOrder] = useState<number[]>([]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(cards.map((c) => c.category))).sort();
    return ['All Categories', ...cats];
  }, [cards]);

  const filteredCards = useMemo(() => {
    let result = cards;
    if (selectedCategory !== 'All Categories') {
      result = result.filter((c) => c.category === selectedCategory);
    }
    if (hideMastered) {
      result = result.filter((c) => c.knownCount < MASTERED_THRESHOLD);
    }
    if (isShuffled && shuffledOrder.length > 0) {
      const indexedCards = shuffledOrder
        .map((i) => result[i])
        .filter(Boolean);
      return indexedCards;
    }
    return result;
  }, [cards, selectedCategory, hideMastered, isShuffled, shuffledOrder]);

  const currentCard = filteredCards[currentIndex] ?? null;

  const stats: StudyStats = useMemo(() => ({
    total: cards.length,
    mastered: cards.filter((c) => c.knownCount >= MASTERED_THRESHOLD).length,
    inProgress: cards.filter((c) => c.knownCount > 0 && c.knownCount < MASTERED_THRESHOLD).length,
    notStarted: cards.filter((c) => c.knownCount === 0).length,
  }), [cards]);

  const updateCards = useCallback((updated: Flashcard[]) => {
    setCards(updated);
    saveCards(updated);
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(i + 1, filteredCards.length - 1));
  }, [filteredCards.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  const markKnown = useCallback(() => {
    if (!currentCard) return;
    const updated = cards.map((c) =>
      c.id === currentCard.id
        ? { ...c, knownCount: Math.min(c.knownCount + 1, MASTERED_THRESHOLD) }
        : c
    );
    updateCards(updated);
  }, [currentCard, cards, updateCards]);

  const resetProgress = useCallback(() => {
    const updated = cards.map((c) => ({ ...c, knownCount: 0 }));
    updateCards(updated);
    setCurrentIndex(0);
  }, [cards, updateCards]);

  const shuffle = useCallback(() => {
    const indices = filteredCards.map((_, i) => i);
    const shuffled = shuffleArray(indices);
    setShuffledOrder(shuffled);
    setIsShuffled(true);
    setCurrentIndex(0);
  }, [filteredCards]);

  const unshuffle = useCallback(() => {
    setIsShuffled(false);
    setShuffledOrder([]);
    setCurrentIndex(0);
  }, []);

  const selectCategory = useCallback((cat: string) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
    setIsShuffled(false);
    setShuffledOrder([]);
  }, []);

  const toggleHideMastered = useCallback(() => {
    setHideMastered((prev) => !prev);
    setCurrentIndex(0);
  }, []);

  const addCard = useCallback((data: FlashcardFormData) => {
    const newCard: Flashcard = {
      id: `fc${Date.now()}`,
      question: data.question.trim(),
      answer: data.answer.trim(),
      category: data.category.trim(),
      knownCount: 0,
    };
    updateCards([...cards, newCard]);
  }, [cards, updateCards]);

  const updateCard = useCallback((id: string, data: FlashcardFormData) => {
    const updated = cards.map((c) =>
      c.id === id
        ? { ...c, question: data.question.trim(), answer: data.answer.trim(), category: data.category.trim() }
        : c
    );
    updateCards(updated);
  }, [cards, updateCards]);

  const deleteCard = useCallback((id: string) => {
    const updated = cards.filter((c) => c.id !== id);
    updateCards(updated);
    setCurrentIndex((i) => Math.max(0, Math.min(i, updated.length - 1)));
  }, [cards, updateCards]);

  return {
    cards,
    filteredCards,
    currentCard,
    currentIndex,
    categories,
    selectedCategory,
    hideMastered,
    isShuffled,
    stats,
    goNext,
    goPrev,
    markKnown,
    resetProgress,
    shuffle,
    unshuffle,
    selectCategory,
    toggleHideMastered,
    addCard,
    updateCard,
    deleteCard,
    MASTERED_THRESHOLD,
  };
}

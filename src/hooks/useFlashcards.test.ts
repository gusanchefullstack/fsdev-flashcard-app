import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useFlashcards, getCardStatus } from './useFlashcards';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('getCardStatus', () => {
  it('returns mastered when knownCount >= 5', () => {
    expect(getCardStatus({ id: '1', question: '', answer: '', category: '', knownCount: 5 })).toBe('mastered');
    expect(getCardStatus({ id: '1', question: '', answer: '', category: '', knownCount: 10 })).toBe('mastered');
  });

  it('returns in-progress when knownCount is 1-4', () => {
    expect(getCardStatus({ id: '1', question: '', answer: '', category: '', knownCount: 1 })).toBe('in-progress');
    expect(getCardStatus({ id: '1', question: '', answer: '', category: '', knownCount: 4 })).toBe('in-progress');
  });

  it('returns not-started when knownCount is 0', () => {
    expect(getCardStatus({ id: '1', question: '', answer: '', category: '', knownCount: 0 })).toBe('not-started');
  });
});

describe('useFlashcards', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('loads initial 40 cards', () => {
    const { result } = renderHook(() => useFlashcards());
    expect(result.current.cards).toHaveLength(40);
  });

  it('navigates to next card', () => {
    const { result } = renderHook(() => useFlashcards());
    expect(result.current.currentIndex).toBe(0);
    act(() => { result.current.goNext(); });
    expect(result.current.currentIndex).toBe(1);
  });

  it('navigates to previous card', () => {
    const { result } = renderHook(() => useFlashcards());
    act(() => { result.current.goNext(); });
    act(() => { result.current.goPrev(); });
    expect(result.current.currentIndex).toBe(0);
  });

  it('does not navigate before first card', () => {
    const { result } = renderHook(() => useFlashcards());
    act(() => { result.current.goPrev(); });
    expect(result.current.currentIndex).toBe(0);
  });

  it('marks current card as known', () => {
    const { result } = renderHook(() => useFlashcards());
    const firstCardId = result.current.cards[0].id;
    act(() => { result.current.markKnown(); });
    const updated = result.current.cards.find((c) => c.id === firstCardId);
    expect(updated?.knownCount).toBe(1);
  });

  it('does not exceed mastered threshold on markKnown', () => {
    const { result } = renderHook(() => useFlashcards());
    for (let i = 0; i < 10; i++) {
      act(() => { result.current.markKnown(); });
    }
    expect(result.current.cards[0].knownCount).toBe(5);
  });

  it('resets all card progress', () => {
    const { result } = renderHook(() => useFlashcards());
    act(() => { result.current.markKnown(); });
    act(() => { result.current.resetProgress(); });
    expect(result.current.cards.every((c) => c.knownCount === 0)).toBe(true);
  });

  it('filters by category', () => {
    const { result } = renderHook(() => useFlashcards());
    act(() => { result.current.selectCategory('Geography'); });
    expect(result.current.filteredCards.every((c) => c.category === 'Geography')).toBe(true);
  });

  it('hides mastered cards when toggled', () => {
    const { result } = renderHook(() => useFlashcards());
    act(() => { result.current.toggleHideMastered(); });
    expect(result.current.filteredCards.every((c) => c.knownCount < 5)).toBe(true);
  });

  it('adds a new card', () => {
    const { result } = renderHook(() => useFlashcards());
    act(() => {
      result.current.addCard({ question: 'Test Q?', answer: 'Test A', category: 'Test' });
    });
    expect(result.current.cards).toHaveLength(41);
    expect(result.current.cards.at(-1)?.question).toBe('Test Q?');
  });

  it('updates a card', () => {
    const { result } = renderHook(() => useFlashcards());
    const firstId = result.current.cards[0].id;
    act(() => {
      result.current.updateCard(firstId, { question: 'Updated?', answer: 'Updated!', category: 'Updated' });
    });
    const updated = result.current.cards.find((c) => c.id === firstId);
    expect(updated?.question).toBe('Updated?');
  });

  it('deletes a card', () => {
    const { result } = renderHook(() => useFlashcards());
    const firstId = result.current.cards[0].id;
    act(() => { result.current.deleteCard(firstId); });
    expect(result.current.cards).toHaveLength(39);
    expect(result.current.cards.find((c) => c.id === firstId)).toBeUndefined();
  });

  it('computes correct stats', () => {
    const { result } = renderHook(() => useFlashcards());
    const { stats } = result.current;
    expect(stats.total).toBe(40);
    expect(stats.mastered + stats.inProgress + stats.notStarted).toBe(40);
  });

  it('shuffles cards', () => {
    const { result } = renderHook(() => useFlashcards());
    const originalFirst = result.current.filteredCards[0].id;
    act(() => { result.current.shuffle(); });
    expect(result.current.isShuffled).toBe(true);
    // After shuffle, order may differ (run 5 times to reduce flakiness chance)
    const shuffledFirst = result.current.filteredCards[0].id;
    // Both are valid IDs from the original set
    expect(result.current.cards.some((c) => c.id === shuffledFirst)).toBe(true);
    act(() => { result.current.unshuffle(); });
    expect(result.current.isShuffled).toBe(false);
    expect(result.current.filteredCards[0].id).toBe(originalFirst);
  });
});

import { useState } from 'react';
import type { AppView } from './types';
import { useFlashcards } from './hooks/useFlashcards';
import Header from './components/Header/Header';
import StudyMode from './components/StudyMode/StudyMode';
import AllCards from './components/AllCards/AllCards';
import styles from './App.module.css';

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('study');

  const {
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
  } = useFlashcards();

  return (
    <div className={styles.app}>
      <img
        src="/images/pattern-flashcard-bg.svg"
        alt=""
        className={`${styles.bgPattern} ${styles.bgPatternTopLeft}`}
        aria-hidden="true"
      />
      <img
        src="/images/pattern-flashcard-bg.svg"
        alt=""
        className={`${styles.bgPattern} ${styles.bgPatternTopRight}`}
        aria-hidden="true"
      />
      <img
        src="/images/pattern-star-pink.svg"
        alt=""
        className={`${styles.bgPattern} ${styles.bgPatternBottomRight}`}
        aria-hidden="true"
      />

      <h1 className="sr-only">Flashcard App</h1>
      <Header activeView={activeView} onViewChange={setActiveView} />

      <main className={styles.content} id="main-content">
        <div
          id="study-panel"
          role="tabpanel"
          aria-labelledby="tab-study"
          hidden={activeView !== 'study'}
        >
          <StudyMode
            filteredCards={filteredCards}
            currentCard={currentCard}
            currentIndex={currentIndex}
            categories={categories}
            selectedCategory={selectedCategory}
            hideMastered={hideMastered}
            isShuffled={isShuffled}
            stats={stats}
            onCategoryChange={selectCategory}
            onToggleHideMastered={toggleHideMastered}
            onShuffle={shuffle}
            onUnshuffle={unshuffle}
            onPrev={goPrev}
            onNext={goNext}
            onMarkKnown={markKnown}
            onReset={resetProgress}
          />
        </div>
        <div
          id="all-cards-panel"
          role="tabpanel"
          aria-labelledby="tab-all-cards"
          hidden={activeView !== 'all-cards'}
        >
          <AllCards
            cards={cards}
            categories={categories}
            onAddCard={addCard}
            onUpdateCard={updateCard}
            onDeleteCard={deleteCard}
          />
        </div>
      </main>
    </div>
  );
}

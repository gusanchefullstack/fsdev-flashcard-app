import type { Flashcard, StudyStats } from '../../types';
import FilterBar from '../FilterBar/FilterBar';
import FlashcardDisplay from '../FlashcardDisplay/FlashcardDisplay';
import CardActions from '../CardActions/CardActions';
import CardNavigation from '../CardNavigation/CardNavigation';
import StudyStatistics from '../StudyStatistics/StudyStatistics';
import styles from './StudyMode.module.css';

interface StudyModeProps {
  filteredCards: Flashcard[];
  currentCard: Flashcard | null;
  currentIndex: number;
  categories: string[];
  selectedCategory: string;
  hideMastered: boolean;
  isShuffled: boolean;
  stats: StudyStats;
  onCategoryChange: (cat: string) => void;
  onToggleHideMastered: () => void;
  onShuffle: () => void;
  onUnshuffle: () => void;
  onPrev: () => void;
  onNext: () => void;
  onMarkKnown: () => void;
  onReset: () => void;
}

export default function StudyMode({
  filteredCards,
  currentCard,
  currentIndex,
  categories,
  selectedCategory,
  hideMastered,
  isShuffled,
  stats,
  onCategoryChange,
  onToggleHideMastered,
  onShuffle,
  onUnshuffle,
  onPrev,
  onNext,
  onMarkKnown,
  onReset,
}: StudyModeProps) {
  return (
    <div className={styles.container} id="study-panel" role="tabpanel" aria-label="Study Mode">
      <div className={styles.mainPanel}>
        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          hideMastered={hideMastered}
          isShuffled={isShuffled}
          onCategoryChange={onCategoryChange}
          onToggleHideMastered={onToggleHideMastered}
          onShuffle={onShuffle}
          onUnshuffle={onUnshuffle}
        />

        <FlashcardDisplay card={currentCard} />

        <CardActions
          hasCard={currentCard !== null}
          onMarkKnown={onMarkKnown}
          onReset={onReset}
        />

        <CardNavigation
          currentIndex={currentIndex}
          total={filteredCards.length}
          onPrev={onPrev}
          onNext={onNext}
        />
      </div>

      <aside className={styles.sidePanel}>
        <StudyStatistics stats={stats} />
      </aside>
    </div>
  );
}

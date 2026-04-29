import styles from './CardNavigation.module.css';

interface CardNavigationProps {
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function CardNavigation({ currentIndex, total, onPrev, onNext }: CardNavigationProps) {
  const displayIndex = total === 0 ? 0 : currentIndex + 1;

  return (
    <nav className={styles.nav} aria-label="Card navigation">
      <button
        type="button"
        className={styles.navBtn}
        onClick={onPrev}
        disabled={currentIndex === 0 || total === 0}
        aria-label="Previous card"
      >
        <img src="/images/icon-chevron-left.svg" alt="" className={styles.navIcon} aria-hidden="true" />
        Previous
      </button>

      <p className={styles.counter} aria-live="polite" aria-atomic="true">
        Card {displayIndex} of {total}
      </p>

      <button
        type="button"
        className={styles.navBtn}
        onClick={onNext}
        disabled={currentIndex >= total - 1 || total === 0}
        aria-label="Next card"
      >
        Next
        <img src="/images/icon-chevron-right.svg" alt="" className={styles.navIcon} aria-hidden="true" />
      </button>
    </nav>
  );
}

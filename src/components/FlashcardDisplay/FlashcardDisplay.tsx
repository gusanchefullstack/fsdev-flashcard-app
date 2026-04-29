import { useState, useEffect } from 'react';
import type { Flashcard } from '../../types';
import { MASTERED_THRESHOLD } from '../../data/constants';
import styles from './FlashcardDisplay.module.css';

interface FlashcardDisplayProps {
  card: Flashcard | null;
}

const KNOWN_MAX = MASTERED_THRESHOLD;

export default function FlashcardDisplay({ card }: FlashcardDisplayProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [card?.id]);

  if (!card) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState} role="status">
          <img src="/images/icon-stats-total.svg" alt="" width={40} height={40} />
          <p>No cards to display. Try changing your filters or add new cards.</p>
        </div>
      </div>
    );
  }

  const progressPercent = Math.min((card.knownCount / KNOWN_MAX) * 100, 100);

  return (
    <div className={styles.container}>
      <div
        className={styles.cardWrapper}
        onClick={() => setIsFlipped((f) => !f)}
        role="button"
        tabIndex={0}
        aria-label={isFlipped ? `Answer: ${card.answer}` : `Question: ${card.question}. Click to reveal answer`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsFlipped((f) => !f);
          }
        }}
      >
        <article
          className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}
          aria-live="polite"
        >
          {/* Front — question */}
          <div className={styles.face} aria-hidden={isFlipped}>
            <span className={styles.categoryBadge}>{card.category}</span>
            <img
              src="/images/pattern-star-blue.svg"
              alt=""
              className={styles.starBlue}
              aria-hidden="true"
            />
            <img
              src="/images/pattern-star-yellow.svg"
              alt=""
              className={styles.starYellow}
              aria-hidden="true"
            />

            <div className={styles.content}>
              <p className={styles.question}>{card.question}</p>
              <p className={styles.hint}>Click to reveal answer</p>
            </div>

            <div className={styles.progressWrapper}>
              <div
                className={styles.progressBar}
                role="progressbar"
                aria-valuenow={card.knownCount}
                aria-valuemin={0}
                aria-valuemax={KNOWN_MAX}
                aria-label={`Known ${card.knownCount} of ${KNOWN_MAX} times`}
              >
                <div
                  className={styles.progressFill}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className={styles.progressText}>
                {card.knownCount}/{KNOWN_MAX}
              </span>
            </div>
          </div>

          {/* Back — answer */}
          <div className={styles.face + ' ' + styles.back} aria-hidden={!isFlipped}>
            <span className={styles.categoryBadge}>{card.category}</span>
            <div className={styles.content}>
              <p className={styles.answer}>{card.answer}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}


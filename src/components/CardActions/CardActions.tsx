import styles from './CardActions.module.css';

interface CardActionsProps {
  hasCard: boolean;
  onMarkKnown: () => void;
  onReset: () => void;
}

export default function CardActions({ hasCard, onMarkKnown, onReset }: CardActionsProps) {
  return (
    <div className={styles.actions}>
      <button
        className={styles.primaryBtn}
        onClick={onMarkKnown}
        disabled={!hasCard}
        aria-label="Mark current card as known"
      >
        <img src="/images/icon-circle-check.svg" alt="" className={styles.primaryIcon} aria-hidden="true" />
        I Know This
      </button>

      <button
        className={styles.secondaryBtn}
        onClick={onReset}
        aria-label="Reset all card progress"
      >
        <img src="/images/icon-reset.svg" alt="" className={styles.secondaryIcon} aria-hidden="true" />
        Reset Progress
      </button>
    </div>
  );
}

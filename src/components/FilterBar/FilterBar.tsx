import styles from './FilterBar.module.css';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  hideMastered: boolean;
  isShuffled: boolean;
  onCategoryChange: (category: string) => void;
  onToggleHideMastered: () => void;
  onShuffle: () => void;
  onUnshuffle: () => void;
}

export default function FilterBar({
  categories,
  selectedCategory,
  hideMastered,
  isShuffled,
  onCategoryChange,
  onToggleHideMastered,
  onShuffle,
  onUnshuffle,
}: FilterBarProps) {
  return (
    <div className={styles.filterBar} role="toolbar" aria-label="Card filters">
      <div className={styles.categoryWrapper}>
        <label htmlFor="category-select" className="sr-only">
          Filter by category
        </label>
        <select
          id="category-select"
          className={styles.categorySelect}
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <img
          src="/images/icon-chevron-down.svg"
          alt=""
          className={styles.chevronIcon}
          aria-hidden="true"
        />
      </div>

      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={hideMastered}
          onChange={onToggleHideMastered}
          aria-label="Hide mastered cards"
        />
        Hide Mastered
      </label>

      <button
        type="button"
        className={`${styles.shuffleBtn} ${isShuffled ? styles.active : ''}`}
        onClick={isShuffled ? onUnshuffle : onShuffle}
        aria-pressed={isShuffled}
        aria-label={isShuffled ? 'Disable shuffle' : 'Shuffle cards'}
      >
        <img
          src="/images/icon-shuffle.svg"
          alt=""
          className={styles.shuffleIcon}
          aria-hidden="true"
        />
        Shuffle
      </button>
    </div>
  );
}

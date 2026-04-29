import { useState, useMemo } from 'react';
import type { Flashcard, FlashcardFormData } from '../../types';
import CreateCardForm from '../CreateCardForm/CreateCardForm';
import CardItem from '../CardItem/CardItem';
import styles from './AllCards.module.css';

interface AllCardsProps {
  cards: Flashcard[];
  categories: string[];
  onAddCard: (data: FlashcardFormData) => void;
  onUpdateCard: (id: string, data: FlashcardFormData) => void;
  onDeleteCard: (id: string) => void;
}

export default function AllCards({ cards, categories, onAddCard, onUpdateCard, onDeleteCard }: AllCardsProps) {
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [hideMastered, setHideMastered] = useState(false);

  const filteredCards = useMemo(() => {
    let result = cards;
    if (filterCategory !== 'All Categories') {
      result = result.filter((c) => c.category === filterCategory);
    }
    if (hideMastered) {
      result = result.filter((c) => c.knownCount < 5);
    }
    return result;
  }, [cards, filterCategory, hideMastered]);

  return (
    <div className={styles.container}>
      <CreateCardForm categories={categories} onAddCard={onAddCard} />

      <section className={styles.cardListSection}>
        <div className={styles.listHeader}>
          <h2 className={styles.listTitle}>
            All Cards ({filteredCards.length})
          </h2>

          <div className={styles.filterControls}>
            <div className={styles.categoryWrapper}>
              <label htmlFor="list-category-select" className="sr-only">
                Filter by category
              </label>
              <select
                id="list-category-select"
                className={styles.categorySelect}
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <img src="/images/icon-chevron-down.svg" alt="" className={styles.chevronIcon} aria-hidden="true" />
            </div>

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={hideMastered}
                onChange={() => setHideMastered((p) => !p)}
                aria-label="Hide mastered cards"
              />
              Hide Mastered
            </label>
          </div>
        </div>

        {filteredCards.length === 0 ? (
          <p className={styles.emptyState} role="status">
            No cards match your current filters.
          </p>
        ) : (
          <ul className={styles.cardList} aria-label="Flashcard list">
            {filteredCards.map((card) => (
              <li key={card.id}>
                <CardItem
                  card={card}
                  categories={categories}
                  onUpdate={onUpdateCard}
                  onDelete={onDeleteCard}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

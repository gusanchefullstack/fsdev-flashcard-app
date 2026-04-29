import { useState } from 'react';
import type { Flashcard, FlashcardFormData } from '../../types';
import { getCardStatus } from '../../hooks/useFlashcards';
import styles from './CardItem.module.css';

interface CardItemProps {
  card: Flashcard;
  categories: string[];
  onUpdate: (id: string, data: FlashcardFormData) => void;
  onDelete: (id: string) => void;
}

const STATUS_LABELS = {
  mastered: 'Mastered',
  'in-progress': 'In Progress',
  'not-started': 'Not Started',
};

const STATUS_STYLES = {
  mastered: styles.statusMastered,
  'in-progress': styles.statusInProgress,
  'not-started': styles.statusNotStarted,
};

export default function CardItem({ card, categories, onUpdate, onDelete }: CardItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<FlashcardFormData>({
    question: card.question,
    answer: card.answer,
    category: card.category,
  });

  const status = getCardStatus(card);
  const availableCategories = categories.filter((c) => c !== 'All Categories');

  const handleSave = () => {
    if (!editData.question.trim() || !editData.answer.trim() || !editData.category.trim()) return;
    onUpdate(card.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ question: card.question, answer: card.answer, category: card.category });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <article className={styles.card}>
        <form
          className={styles.editForm}
          onSubmit={(e) => { e.preventDefault(); handleSave(); }}
          aria-label={`Edit card: ${card.question}`}
        >
          <div className={styles.editFields}>
            <div className={styles.editField}>
              <label className={styles.editLabel} htmlFor={`q-${card.id}`}>Question</label>
              <textarea
                id={`q-${card.id}`}
                className={styles.editTextarea}
                value={editData.question}
                onChange={(e) => setEditData((d) => ({ ...d, question: e.target.value }))}
                rows={3}
                required
              />
            </div>
            <div className={styles.editField}>
              <label className={styles.editLabel} htmlFor={`a-${card.id}`}>Answer</label>
              <textarea
                id={`a-${card.id}`}
                className={styles.editTextarea}
                value={editData.answer}
                onChange={(e) => setEditData((d) => ({ ...d, answer: e.target.value }))}
                rows={3}
                required
              />
            </div>
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel} htmlFor={`cat-${card.id}`}>Category</label>
            <input
              id={`cat-${card.id}`}
              type="text"
              className={styles.editInput}
              value={editData.category}
              onChange={(e) => setEditData((d) => ({ ...d, category: e.target.value }))}
              list={`cat-list-${card.id}`}
              required
            />
            <datalist id={`cat-list-${card.id}`}>
              {availableCategories.map((cat) => <option key={cat} value={cat} />)}
            </datalist>
          </div>
          <div className={styles.editActions}>
            <button type="submit" className={styles.saveBtn}>Save</button>
            <button type="button" className={styles.cancelBtn} onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </article>
    );
  }

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <span className={styles.categoryBadge}>{card.category}</span>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => setIsEditing(true)}
            aria-label={`Edit card: ${card.question}`}
          >
            <img src="/images/icon-edit.svg" alt="" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`${styles.iconBtn} ${styles.deleteBtn}`}
            onClick={() => onDelete(card.id)}
            aria-label={`Delete card: ${card.question}`}
          >
            <img src="/images/icon-delete.svg" alt="" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h3 className={styles.sectionLabel}>Question</h3>
          <p className={styles.sectionText}>{card.question}</p>
        </div>
        <div className={styles.section}>
          <h3 className={styles.sectionLabel}>Answer</h3>
          <p className={styles.sectionText}>{card.answer}</p>
        </div>
      </div>

      <span className={`${styles.statusBadge} ${STATUS_STYLES[status]}`}>
        {STATUS_LABELS[status]}
      </span>
    </article>
  );
}

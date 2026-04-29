import { useState } from 'react';
import type { FlashcardFormData } from '../../types';
import styles from './CreateCardForm.module.css';

interface CreateCardFormProps {
  categories: string[];
  onAddCard: (data: FlashcardFormData) => void;
}

const EMPTY_FORM: FlashcardFormData = { question: '', answer: '', category: '' };

export default function CreateCardForm({ categories, onAddCard }: CreateCardFormProps) {
  const [formData, setFormData] = useState<FlashcardFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FlashcardFormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FlashcardFormData> = {};
    if (!formData.question.trim()) newErrors.question = 'Question is required';
    if (!formData.answer.trim()) newErrors.answer = 'Answer is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onAddCard(formData);
    setFormData(EMPTY_FORM);
    setErrors({});
  };

  const handleChange = (field: keyof FlashcardFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const availableCategories = categories.filter((c) => c !== 'All Categories');

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate aria-label="Create new flashcard">
      <h2 className={styles.title}>Create New Card</h2>

      <div className={styles.fieldGroup}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="question-input">
            Question
          </label>
          <textarea
            id="question-input"
            className={`${styles.textarea} ${errors.question ? styles.error : ''}`}
            placeholder='e.g., "What is the capital of France?"'
            value={formData.question}
            onChange={(e) => handleChange('question', e.target.value)}
            rows={3}
            aria-invalid={!!errors.question}
            aria-describedby={errors.question ? 'question-error' : undefined}
          />
          {errors.question && (
            <span className={styles.errorMsg} id="question-error" role="alert">
              {errors.question}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="answer-input">
            Answer
          </label>
          <textarea
            id="answer-input"
            className={`${styles.textarea} ${errors.answer ? styles.error : ''}`}
            placeholder='e.g., "Paris"'
            value={formData.answer}
            onChange={(e) => handleChange('answer', e.target.value)}
            rows={3}
            aria-invalid={!!errors.answer}
            aria-describedby={errors.answer ? 'answer-error' : undefined}
          />
          {errors.answer && (
            <span className={styles.errorMsg} id="answer-error" role="alert">
              {errors.answer}
            </span>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="category-input">
          Category
        </label>
        <input
          id="category-input"
          type="text"
          className={`${styles.input} ${errors.category ? styles.error : ''}`}
          placeholder='e.g., "Geography"'
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value)}
          list="categories-list"
          aria-invalid={!!errors.category}
          aria-describedby={errors.category ? 'category-error' : undefined}
        />
        <datalist id="categories-list">
          {availableCategories.map((cat) => (
            <option key={cat} value={cat} />
          ))}
        </datalist>
        {errors.category && (
          <span className={styles.errorMsg} id="category-error" role="alert">
            {errors.category}
          </span>
        )}
      </div>

      <button type="submit" className={styles.submitBtn}>
        <img src="/images/icon-circle-plus.svg" alt="" className={styles.submitIcon} aria-hidden="true" />
        Create Card
      </button>
    </form>
  );
}

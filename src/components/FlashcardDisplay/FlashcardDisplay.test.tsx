import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FlashcardDisplay from './FlashcardDisplay';
import type { Flashcard } from '../../types';

const card: Flashcard = {
  id: 'test-1',
  question: 'What is 2 + 2?',
  answer: '4',
  category: 'Mathematics',
  knownCount: 2,
};

describe('FlashcardDisplay', () => {
  it('shows question on front face', () => {
    render(<FlashcardDisplay card={card} />);
    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
    expect(screen.getByText('Click to reveal answer')).toBeInTheDocument();
  });

  it('shows category badge', () => {
    render(<FlashcardDisplay card={card} />);
    expect(screen.getAllByText('Mathematics').length).toBeGreaterThan(0);
  });

  it('shows progress bar with correct value', () => {
    render(<FlashcardDisplay card={card} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '2');
    expect(progressbar).toHaveAttribute('aria-valuemax', '5');
  });

  it('shows progress count text', () => {
    render(<FlashcardDisplay card={card} />);
    expect(screen.getByText('2/5')).toBeInTheDocument();
  });

  it('flips card on click to reveal answer', () => {
    render(<FlashcardDisplay card={card} />);
    const cardBtn = screen.getByRole('button');
    fireEvent.click(cardBtn);
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('renders empty state when card is null', () => {
    render(<FlashcardDisplay card={null} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});

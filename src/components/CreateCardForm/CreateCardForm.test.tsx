import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CreateCardForm from './CreateCardForm';

const categories = ['All Categories', 'JavaScript', 'Geography'];

describe('CreateCardForm', () => {
  it('renders all form fields', () => {
    render(<CreateCardForm categories={categories} onAddCard={vi.fn()} />);
    expect(screen.getByLabelText(/question/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/answer/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create card/i })).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', () => {
    render(<CreateCardForm categories={categories} onAddCard={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /create card/i }));
    expect(screen.getByText(/question is required/i)).toBeInTheDocument();
    expect(screen.getByText(/answer is required/i)).toBeInTheDocument();
    expect(screen.getByText(/category is required/i)).toBeInTheDocument();
  });

  it('calls onAddCard with correct data on valid submit', () => {
    const onAddCard = vi.fn();
    render(<CreateCardForm categories={categories} onAddCard={onAddCard} />);

    fireEvent.change(screen.getByLabelText(/question/i), { target: { value: 'Test question?' } });
    fireEvent.change(screen.getByLabelText(/answer/i), { target: { value: 'Test answer' } });
    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'Science' } });
    fireEvent.click(screen.getByRole('button', { name: /create card/i }));

    expect(onAddCard).toHaveBeenCalledOnce();
    expect(onAddCard).toHaveBeenCalledWith({
      question: 'Test question?',
      answer: 'Test answer',
      category: 'Science',
    });
  });

  it('resets form after successful submit', () => {
    render(<CreateCardForm categories={categories} onAddCard={vi.fn()} />);
    const questionInput = screen.getByLabelText(/question/i) as HTMLTextAreaElement;

    fireEvent.change(questionInput, { target: { value: 'Some question' } });
    fireEvent.change(screen.getByLabelText(/answer/i), { target: { value: 'Some answer' } });
    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'Test' } });
    fireEvent.click(screen.getByRole('button', { name: /create card/i }));

    expect(questionInput.value).toBe('');
  });
});

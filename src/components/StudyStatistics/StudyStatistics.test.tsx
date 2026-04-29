import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StudyStatistics from './StudyStatistics';

const stats = { total: 40, mastered: 11, inProgress: 21, notStarted: 8 };

describe('StudyStatistics', () => {
  it('renders the correct stat values', () => {
    render(<StudyStatistics stats={stats} />);
    expect(screen.getByText('40')).toBeInTheDocument();
    expect(screen.getByText('11')).toBeInTheDocument();
    expect(screen.getByText('21')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
  });

  it('renders all stat labels', () => {
    render(<StudyStatistics stats={stats} />);
    expect(screen.getByText(/total cards/i)).toBeInTheDocument();
    expect(screen.getByText(/mastered/i)).toBeInTheDocument();
    expect(screen.getByText(/in progress/i)).toBeInTheDocument();
    expect(screen.getByText(/not started/i)).toBeInTheDocument();
  });
});

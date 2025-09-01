import { render, screen } from '@testing-library/react';
import FormatCard from '../format-card';
import { GolfFormat } from '@/types/golf';

describe('FormatCard', () => {
  const mockFormat: GolfFormat = {
    id: 'test-format',
    name: 'Test Format',
    description: 'A test golf format',
    category: 'casual',
    players: '2-4',
    difficulty: 'easy',
    duration: '3-4 hours',
    overview: 'Test overview',
    rules: ['Rule 1', 'Rule 2'],
    scoring: 'Test scoring',
    variations: ['Variation 1'],
    tips: ['Tip 1'],
    commonMistakes: ['Mistake 1'],
    pros: ['Pro 1'],
    cons: ['Con 1'],
    bestFor: ['Beginners']
  };

  it('renders format name correctly', () => {
    render(<FormatCard format={mockFormat} />);
    expect(screen.getByText('Test Format')).toBeInTheDocument();
  });

  it('displays format description', () => {
    render(<FormatCard format={mockFormat} />);
    expect(screen.getByText('A test golf format')).toBeInTheDocument();
  });

  it('shows player count', () => {
    render(<FormatCard format={mockFormat} />);
    expect(screen.getByText('2-4')).toBeInTheDocument();
  });

  it('displays difficulty level', () => {
    render(<FormatCard format={mockFormat} />);
    expect(screen.getByText('easy')).toBeInTheDocument();
  });

  it('shows duration', () => {
    render(<FormatCard format={mockFormat} />);
    expect(screen.getByText('3-4 hours')).toBeInTheDocument();
  });

  // TODO: Add tests for:
  // - Click handling and navigation
  // - Different category styles
  // - Responsive behavior
  // - Accessibility attributes
});
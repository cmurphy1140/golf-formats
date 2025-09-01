import { cn } from '../utils';

describe('cn utility function', () => {
  it('combines class names correctly', () => {
    const result = cn('base-class', 'additional-class');
    expect(result).toBe('base-class additional-class');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    const result = cn('base', isActive && 'active');
    expect(result).toBe('base active');
  });

  it('filters out falsy values', () => {
    const result = cn('base', false, null, undefined, '', 'valid');
    expect(result).toBe('base valid');
  });

  it('merges Tailwind classes correctly', () => {
    const result = cn('px-2 py-1', 'px-4');
    // tailwind-merge should keep the last conflicting class
    expect(result).toBe('py-1 px-4');
  });

  it('handles arrays of classes', () => {
    const result = cn(['base', 'class'], 'additional');
    expect(result).toBe('base class additional');
  });

  it('handles empty input', () => {
    const result = cn();
    expect(result).toBe('');
  });

  // TODO: Add tests for:
  // - Complex Tailwind class merging scenarios
  // - Object notation for conditional classes
  // - Performance with large class lists
});
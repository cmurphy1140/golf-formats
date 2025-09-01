import { golfFormats } from '../formats';

describe('Golf Formats Data', () => {
  it('contains golf format entries', () => {
    expect(golfFormats).toBeDefined();
    expect(Array.isArray(golfFormats)).toBe(true);
    expect(golfFormats.length).toBeGreaterThan(0);
  });

  it('each format has required fields', () => {
    golfFormats.forEach(format => {
      // Test required fields
      expect(format.id).toBeDefined();
      expect(typeof format.id).toBe('string');
      expect(format.name).toBeDefined();
      expect(typeof format.name).toBe('string');
      expect(format.description).toBeDefined();
      expect(typeof format.description).toBe('string');
      expect(format.category).toBeDefined();
      expect(['tournament', 'casual', 'betting', 'team', 'practice']).toContain(format.category);
      expect(format.players).toBeDefined();
      expect(format.difficulty).toBeDefined();
      expect(['easy', 'medium', 'hard']).toContain(format.difficulty);
    });
  });

  it('has unique format IDs', () => {
    const ids = golfFormats.map(f => f.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });

  it('contains popular formats', () => {
    const formatNames = golfFormats.map(f => f.name.toLowerCase());
    expect(formatNames).toContain('scramble');
    expect(formatNames).toContain('best ball');
    expect(formatNames).toContain('skins');
    expect(formatNames).toContain('stableford');
  });

  it('has formats for all categories', () => {
    const categories = new Set(golfFormats.map(f => f.category));
    expect(categories.has('tournament')).toBe(true);
    expect(categories.has('casual')).toBe(true);
    expect(categories.has('betting')).toBe(true);
    expect(categories.has('team')).toBe(true);
  });

  // TODO: Add tests for:
  // - Format data validation (rules array, tips array, etc.)
  // - Proper scoring descriptions
  // - Duration format consistency
  // - Player count format validation
});
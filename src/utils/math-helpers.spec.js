import { calculateSum } from './math-helpers';

describe.only('calculateSum', () => {
  it('calculates a sum of integers', () => {
    expect(calculateSum(1, 2, 3)).toEqual(6);
  });

  it('converts stringed integers', () => {
    expect(calculateSum('1', '2', '3')).toEqual(6);
  });

  it('skips non integer values', () => {
    expect(calculateSum('', 2, 3)).toEqual(5);
  });
});

import { double, power } from './number';

it('should double the value', () => {
  expect(double(2)).toBe(4);
});

it('should calculate the fourth power of two', () => {
  expect(power(2, 4)).toBe(16);
});

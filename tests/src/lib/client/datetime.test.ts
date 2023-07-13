import { DatetimeDifference } from '$lib/client/utils/datetime';
import { describe, expect, expectTypeOf, it } from 'vitest';

describe('lib/client/utils/datetime', () => {
  describe('DatetimeDifference', () => {
    it('should create object when instantiated', () => {
      const dt = new DatetimeDifference(new Date(), new Date());
      expectTypeOf(dt).toBeObject;
    });

    describe('when intansiated', () => {
      it('should get difference in seconds', () => {
        const mDateTime = new Date(new Date().getTime() - 1 * 1000);
        const testDt = new DatetimeDifference(new Date(), mDateTime);
        expect(testDt.seconds).toBe(1);
      });

      it('should get difference in minutes', () => {
        const mDateTime = new Date(new Date().getTime() - 2 * 1000 * 60);
        const testDt = new DatetimeDifference(new Date(), mDateTime);
        expect(testDt.minutes).toBe(2);
      });

      it('should get difference in hours', () => {
        const mDateTime = new Date(new Date().getTime() - 3 * 1000 * 60 * 60);
        const testDt = new DatetimeDifference(new Date(), mDateTime);
        expect(testDt.hours).toBe(3);
      });

      it('should get difference in days', () => {
        const mDateTime = new Date(new Date().getTime() - 4 * 1000 * 60 * 60 * 24);
        const testDt = new DatetimeDifference(new Date(), mDateTime);
        expect(testDt.days).toBe(4);
      });

      it('should get difference in weeks', () => {
        const mDateTime = new Date(new Date().getTime() - 5 * 1000 * 60 * 60 * 24 * 7);
        const testDt = new DatetimeDifference(new Date(), mDateTime);
        expect(testDt.weeks).toBe(5);
      });

      it('should get difference in months', () => {
        const mDateTime = new Date(new Date().getTime() - 6 * 1000 * 60 * 60 * 24 * 30);
        const testDt = new DatetimeDifference(new Date(), mDateTime);
        expect(testDt.months).toBe(6);
      });

      it('should get difference in years', () => {
        const mDateTime = new Date(new Date().getTime() - 7 * 1000 * 60 * 60 * 24 * 30 * 12);
        const testDt = new DatetimeDifference(new Date(), mDateTime);
        expect(testDt.years).toBe(7);
      });

      it('should get all differences', () => {
        const mDateTime = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30 * 12);
        const testDt = new DatetimeDifference(new Date(), mDateTime);
        expect(testDt.difference).toMatchObject({
          seconds: 60 * 60 * 24 * 30 * 12,
          minutes: 60 * 24 * 30 * 12,
          hours: 24 * 30 * 12,
          days: 30 * 12,
          weeks: (30 / 7) * 12,
          months: 12,
          years: 1
        });
      });

      it('should get minimum difference given different time difference', () => {
        const data = [
          { value: 0, expectedKey: 'seconds', expectedValue: 0 },
          { value: 900, expectedKey: 'seconds', expectedValue: 0.9 },
          { value: 1000, expectedKey: 'seconds', expectedValue: 1 },
          { value: 1000 * 59, expectedKey: 'seconds', expectedValue: 59 },
          { value: 1000 * 60, expectedKey: 'minutes', expectedValue: 1 },
          { value: 1000 * 60 * 59, expectedKey: 'minutes', expectedValue: 59 },
          { value: 1000 * 60 * 60, expectedKey: 'hours', expectedValue: 1 },
          { value: 1000 * 60 * 60 * 23, expectedKey: 'hours', expectedValue: 23 },
          { value: 1000 * 60 * 60 * 24, expectedKey: 'days', expectedValue: 1 },
          { value: 1000 * 60 * 60 * 24 * 6, expectedKey: 'days', expectedValue: 6 },
          { value: 1000 * 60 * 60 * 24 * 7, expectedKey: 'weeks', expectedValue: 1 },
          { value: 1000 * 60 * 60 * 24 * 30, expectedKey: 'months', expectedValue: 1 },
          { value: 1000 * 60 * 60 * 24 * 30 * 11, expectedKey: 'months', expectedValue: 11 },
          { value: 1000 * 60 * 60 * 24 * 30 * 12, expectedKey: 'years', expectedValue: 1 },
          { value: 1000 * 60 * 60 * 24 * 30 * 12 * 2, expectedKey: 'years', expectedValue: 2 }
        ];

        data.forEach(({ value, expectedKey, expectedValue }) => {
          const mDateTime = new Date(new Date().getTime() - value);
          const testDt = new DatetimeDifference(new Date(), mDateTime);
          const { unit, minDiff } = testDt.minimumDifference;
          expect(unit).toBe(expectedKey);
          expect(minDiff).toBe(expectedValue);
        });
      });
    });
  });
});

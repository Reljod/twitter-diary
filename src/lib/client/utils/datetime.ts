export const UNIT_MAP = Object.freeze({
	seconds: 's',
	minutes: 'm',
	hours: 'h',
	days: 'd',
	weeks: 'w',
	months: 'M',
	years: 'Y'
});

export class DatetimeDifference {
	private date1: Date;
	private date2: Date;

	constructor(date1: Date, date2: Date) {
		this.date1 = date1;
		this.date2 = date2;
	}

	private get milliseconds(): number {
		return Math.abs(this.date1.getTime() - this.date2.getTime());
	}

	get seconds(): number {
		return this.milliseconds / 1000;
	}

	get minutes(): number {
		return this.seconds / 60;
	}

	get hours(): number {
		return this.minutes / 60;
	}

	get days(): number {
		return this.hours / 24;
	}

	get weeks(): number {
		return this.days / 7;
	}

	get months(): number {
		return this.days / 30;
	}

	get years(): number {
		return this.months / 12;
	}

	get difference() {
		return {
			seconds: this.seconds,
			minutes: this.minutes,
			hours: this.hours,
			days: this.days,
			weeks: this.weeks,
			months: this.months,
			years: this.years
		};
	}

	get minimumDifference() {
		const reverseDifferenceKeys = [...Object.entries(this.difference)].reverse();

		for (const [key, value] of reverseDifferenceKeys) {
			if (value >= 1) {
				return { unit: key, minDiff: value };
			}
		}

		return { unit: 'seconds', minDiff: this.seconds };
	}
}

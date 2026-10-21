import type { Experience } from './types';

/** `YYYY` or `YYYY-MM` as "2025" or "Feb 2025". */
const formatDate = (date: string, months: string[]) => {
    const [year, month] = date.split('-');
    return month ? `${months[Number(month) - 1]} ${year}` : year;
};

/** Same rules as the 3D site's text view: dateLabel wins, `end: null` is "present". */
export function dateRange(e: Experience, months: string[], present: string): string {
    if (e.dateLabel) return e.dateLabel;
    if (!e.start) return '';
    if (e.end === undefined) return formatDate(e.start, months);
    return `${formatDate(e.start, months)} - ${e.end === null ? present : formatDate(e.end, months)}`;
}

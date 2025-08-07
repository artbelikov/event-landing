import { EventDateType, type Conference, type EventDate } from '@/generated';

/**
 * Extracts valid timestamps from event dates
 */
export function getEventTimestamps(eventDates: EventDate[]): number[] {
    return eventDates
        .map((date) => {
            if (date.type === EventDateType.SINGLE && date.date) {
                return new Date(date.date).getTime();
            }
            if (date.type === EventDateType.PERIOD && date.from) {
                return new Date(date.from).getTime();
            }
            return null;
        })
        .filter((timestamp): timestamp is number => timestamp !== null);
}

/**
 * Gets the next upcoming event date or the earliest date if none are upcoming
 */
export function getCountdownStart(conference: Conference): string {
    const now = Date.now();
    const timestamps = getEventTimestamps(conference.eventDates);

    if (timestamps.length === 0) {
        return new Date().toISOString(); // Fallback to current time
    }

    // Find upcoming events first
    const upcoming = timestamps.filter(timestamp => timestamp > now);
    const target = upcoming.length > 0 ? Math.min(...upcoming) : Math.min(...timestamps);

    return new Date(target).toISOString();
}

/**
 * Gets the end date for the countdown, either the period end or the start date
 */
export function getCountdownEnd(conference: Conference): string {
    const startIso = getCountdownStart(conference);
    const startTime = new Date(startIso).getTime();

    // Find if there's a period event that starts at this time
    const periodEvent = conference.eventDates.find(
        (date) =>
            date.type === EventDateType.PERIOD &&
            date.from &&
            new Date(date.from).getTime() === startTime
    );

    if (periodEvent?.to) {
        return periodEvent.to;
    }

    return startIso;
} 
export interface CountdownTimerProps {
  /** The event start date/time as a Date object or ISO string */
  eventDate: Date | string;
  /** Optional: label to display above the timer */
  label?: string;
}

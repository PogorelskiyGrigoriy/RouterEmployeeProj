/**
 * @module dateUtils
 * Pure utility functions for date manipulation and formatting.
 */

import { 
  differenceInYears, 
  parseISO, 
  format, 
  isValid, 
  subYears, 
  startOfToday 
} from "date-fns";

// Centralized date formats
const DATE_FORMATS = {
  DISPLAY: "dd.MM.yyyy",
  API: "yyyy-MM-dd", // Standard for <input type="date"> and JSON-server
} as const;

/**
 * Calculates age based on ISO date string.
 * Returns 0 if date is invalid or empty.
 */
export const calculateAge = (birthDate: string | null | undefined): number => {
  if (!birthDate) return 0;
  
  const birth = parseISO(birthDate);
  return isValid(birth) ? differenceInYears(startOfToday(), birth) : 0;
};

/**
 * Formats date for UI components (e.g., tables).
 * Example output: 05.03.1990
 */
export const formatDateDisplay = (date: string | Date): string => {
  const d = typeof date === "string" ? parseISO(date) : date;
  return isValid(d) ? format(d, DATE_FORMATS.DISPLAY) : "—";
};

/**
 * Returns a date string representnig "X years ago" from today.
 * Primarily used for setting min/max boundaries in date pickers and API filters.
 * Example: ageToDate(20) -> "2006-03-09"
 */
export const ageToDate = (age: number): string => {
  const targetDate = subYears(startOfToday(), age);
  return format(targetDate, DATE_FORMATS.API);
};

/**
 * Alias for ageToDate for better semantic meaning in calendar context.
 */
export const getLimitDate = (yearsBack: number): string => ageToDate(yearsBack);
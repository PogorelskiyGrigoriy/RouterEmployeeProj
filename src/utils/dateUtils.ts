import { 
  differenceInYears, 
  parseISO, 
  format, 
  isValid, 
  subYears, 
  startOfToday 
} from "date-fns";

/**
 * Рассчитывает возраст. 
 * date-fns сама учитывает, наступил ли день рождения в этом году.
 */
export const calculateAge = (birthDate: string): number => {
  const birth = parseISO(birthDate);
  if (!isValid(birth)) return 0;
  
  return differenceInYears(startOfToday(), birth);
};

/**
 * Форматирует дату для отображения пользователю (например, в таблице)
 * Вывод: 05.03.1990
 */
export const formatDateDisplay = (date: string | Date): string => {
  const d = typeof date === "string" ? parseISO(date) : date;
  return isValid(d) ? format(d, "dd.MM.yyyy") : "—";
};

/**
 * Возвращает крайнюю дату для календаря (например, 18 лет назад от сегодня)
 * Вывод: 2008-03-05 (формат для <input type="date">)
 */
export const getLimitDate = (yearsBack: number): string => {
  const limitDate = subYears(startOfToday(), yearsBack);
  return format(limitDate, "yyyy-MM-dd");
};
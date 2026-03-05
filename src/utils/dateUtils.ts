// src/utils/dateUtils.ts

/**
 * Рассчитывает возраст на основе строки даты (ISO или YYYY-MM-DD)
 */
export const calculateAge = (birthDate: string): number => {
  const today = new Date();
  const birth = new Date(birthDate);
  
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  // Корректировка, если день рождения в этом году еще не наступил
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};
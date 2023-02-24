// Функции проверки показателей сенсоров. 2 - Все хорошо. 1 - Предупреждение. 0 - Критично.

export function checkTemperature(value) {
  if (value >= 40 && value < 60) return 1;
  if (value >= 60) return 0;
  return 2;
}

export function checkVibration(value) {
  if (value >= 20 && value < 40) return 1;
  if (value >= 40) return 0;
  return 2;
}

// Функция проверки оставшихся дней работы ротера. 2 - Все хорошо. 1 - Предупреждение. 0 - Критично.
export function calcPrognosysIndicator(value) {
  if (value > 5 && value <= 15) return 1;
  if (value <= 5) return 0;
  return 2;
}



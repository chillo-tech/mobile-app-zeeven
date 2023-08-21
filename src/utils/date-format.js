export const getFormattedDate = (entry) => {
  const year = entry.getFullYear();
  const month = `0${entry.getMonth() + 1}`.slice(-2);
  const day = `0${entry.getDate()}`.slice(-2);
  return `${day}/${month}/${year}`;
};

export const getFormattedTime = (entry) => {
  const hours = `0${entry.getHours()}`.slice(-2);
  const minutes = `0${entry.getMinutes()}`.slice(-2);
  return `${hours}:${minutes}`;
};

const getWeekNumber = (entry) => {
  // Copy date so don't modify original
  const date = new Date(Date.UTC(entry.getFullYear(), entry.getMonth(), entry.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  // Get first day of year
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  return Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
  // Return array of year and week number
};

export const getDayAndMonthLabel = (entry) => {
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const months = [
    'Jan.',
    'Fev.',
    'Mars',
    'Avr.',
    'MaI',
    'Juin',
    'Jul.',
    'Août',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.',
  ];
  return [days[entry.getDay()], months[entry.getMonth()]];
};

export const getDisplayedDate = (entry) => {
  if (!entry.trim().length) {
    return entry;
  }
  const adWeekNo = getWeekNumber(new Date(entry));
  const todayWeekNo = getWeekNumber(new Date());
  const [dayOfDate, month, year] = getFormattedDate(new Date(entry)).split('/');
  const [dayOfWeekLabel, monthLabel] = getDayAndMonthLabel(new Date(entry));
  return `${dayOfWeekLabel}, ${dayOfDate} ${monthLabel} ${year}`;
};

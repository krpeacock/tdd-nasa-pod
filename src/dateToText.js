export const dateToText = (date) => {
  return date.toISOString().split('T')[0];
};

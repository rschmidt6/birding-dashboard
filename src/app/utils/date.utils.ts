// utils/date.utils.ts
export const formatYear = (d: Date) => String(d.getFullYear());
export const formatMonth = (d: Date) =>
  String(d.getMonth() + 1).padStart(2, '0');
export const formatDay = (d: Date) => String(d.getDate()).padStart(2, '0');

export const formatDate = (date: Date | string | null | undefined): string => {
  if (!date) return "";

  const d = new Date(date);

  if (isNaN(d.getTime())) {
    return ""; // or you could return "Invalid Date" if you prefer
  }

  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0"); // getMonth() returns 0-11
  const day = d.getDate().toString().padStart(2, "0");

  return `${year}/${month}/${day}`;
};

export const formatDatetime = (date: Date) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = days[date.getDay()];
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  const HH = String(date.getHours()).padStart(2, "0");
  const MM = String(date.getMinutes()).padStart(2, "0");
  const SS = String(date.getSeconds()).padStart(2, "0");

  return `${dayName} ${dd}/${mm}/${yyyy} ${HH}:${MM}:${SS}`;
};

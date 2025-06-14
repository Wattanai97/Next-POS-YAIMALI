export function formatDateNoti(dateInput: string | Date): string {
  const date = new Date(dateInput);

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Bangkok",
  };

  const formattedParts = new Intl.DateTimeFormat("th-TH", options)
    .formatToParts(date)
    .reduce((acc, part) => {
      if (part.type !== "literal") acc[part.type] = part.value;
      return acc;
    }, {} as Record<string, string>);

  const { hour, minute, second, day, month, year } = formattedParts;

  return `${hour}:${minute}:${second} - ${day}/${month}/${year}`;
}

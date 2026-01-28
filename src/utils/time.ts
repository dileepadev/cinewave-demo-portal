// Utility to convert UTC date/time to Sri Lankan time (Asia/Colombo)
export function toSriLankaTime(dateInput: string | Date): string {
  let date: Date;
  if (typeof dateInput === "string") {
    // If no timezone info, assume UTC by appending 'Z'
    if (!dateInput.endsWith("Z") && !dateInput.includes("+")) {
      date = new Date(dateInput + "Z");
    } else {
      date = new Date(dateInput);
    }
  } else {
    date = dateInput;
  }

  return date.toLocaleString("en-US", {
    timeZone: "Asia/Colombo",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

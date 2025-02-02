interface FormatOptions {
  useAbsoluteWhenOverOneDay?: boolean;
}
export default function formatRelativeTimestamp(timestamp: number, options?: FormatOptions) {
  const diff = Math.round((timestamp - Date.now()));
  const units: Record<string, number> = {
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
  };

  if (!options?.useAbsoluteWhenOverOneDay || Math.abs(diff) <= units.day) {
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    for (const unitName in units) {
      if (Math.abs(diff) > units[unitName] || unitName === "second") {
        return rtf.format(Math.round(diff / units[unitName]), unitName as Intl.RelativeTimeFormatUnit);
      }
    }
  }

  return new Date(timestamp).toLocaleString("en-GB", {
    year: "numeric", month: "numeric", day: "numeric",
    hour: "numeric", minute: "numeric",
  });
}

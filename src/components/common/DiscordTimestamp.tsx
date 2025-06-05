import formatRelativeTimestamp from "../../repository/formatRelativeTimestamp";

interface TimestampProps {
  timestamp: number;
  format: string | undefined;
}
export default function Timestamp({ timestamp, format }: TimestampProps) {
  let formatedDate: string;
  if (format === "r") {
    formatedDate = formatRelativeTimestamp(timestamp * 1e3);
  } else {
    const formatOptions = TimestampFormats[format ?? "f"] ?? TimestampFormats["f"];
    formatedDate = new Date(timestamp * 1e3).toLocaleString("en-GB", formatOptions);
  }


  return (
    <span style={{
      display: "inline-flex",
      backgroundColor: "#97979f1f",
      borderRadius: 3,
      padding: "0 2px",
    }}
    >{formatedDate}
    </span>
  );
}

const TimestampFormats: Record<string, Intl.DateTimeFormatOptions> = {
  "f": {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  },
  "t": { // Short Time (t) - "16:20"
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  },
  "T": { // Long Time (T) - "16:20:30"
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  },
  "d": { // Short Date (d) - "20/04/2021"
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  },
  "D": { // Long Date (D) - "20 April 2021"
    day: "numeric",
    month: "long",
    year: "numeric",
  },
  "F": { // Long Date/Time (F) - "Tuesday, 20 April 2021 16:20"
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  },
};

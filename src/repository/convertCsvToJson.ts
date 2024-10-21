function convertCursor(cur: string) {
  if (cur.length <= 0) return null;
  const toNumber = Number(cur);
  if (!isNaN(toNumber) && toNumber < Number.MAX_SAFE_INTEGER) return toNumber;
  return cur;
}

export default function csvToJson(text: string, quoteChar = "\"", delimiter = ",") {
  const rows = text.split("\n");
  const headers = rows[0].split(",");

  const regex = new RegExp(`\\s*(${quoteChar})?(.*?)\\1\\s*(?:${delimiter}|$)`, "gs");

  const match = (line: string) => [...line.matchAll(regex)]
    .map((m) => m[2])
    .slice(0, -1);

  let lines = text.split("\n").filter(Boolean);
  const heads = headers ?? match(lines.shift() ?? "");
  lines = lines.slice(1);

  return lines.map((line) => match(line).reduce((acc, cur, i) => {
    // replace blank matches with `null`
    const val = convertCursor(cur);
    const key = heads[i] ?? i.toString();
    return { ...acc, [key]: val };
  }, {}));
}

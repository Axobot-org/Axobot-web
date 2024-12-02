export default function checkArrayEquity<T, L extends ArrayLike<T>>(a: L, b: L) {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (a.length !== b.length) return false;
  return Array.from(a).every((value, index) => value === b[index]);
}

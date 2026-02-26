export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const aCode = "A".charCodeAt(0);

export function rotChar(ch, n, decode) {
  const upper = ch >= "A" && ch <= "Z";
  if (!upper) return ch;
  const base = ch.charCodeAt(0) - aCode;
  const shift = decode ? (26 - n) % 26 : n;
  return String.fromCharCode(((base + shift) % 26) + aCode);
}

export function processText(text, n, decode) {
  return text
    .split("")
    .map((ch) => rotChar(ch, n, decode))
    .join("");
}

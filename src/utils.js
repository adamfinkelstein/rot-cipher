export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const ALPHA_LOW = ALPHABET.toLowerCase();

export function rotChar(ch, n, decode) {
  const lower = ch >= "a" && ch <= "z";
  if (!lower) return ch;
  const base = ch.charCodeAt(0) - 97;
  const shift = decode ? (26 - n) % 26 : n;
  return String.fromCharCode(((base + shift) % 26) + 97);
}

export function processText(text, n, decode) {
  return text.split("").map((ch) => rotChar(ch, n, decode)).join("");
}
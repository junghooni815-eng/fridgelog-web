// "대파로", "남은 밥으로": 받침이 있으면 "으로", 없거나 ㄹ 받침이면 "로".
export function withRo(word: string) {
  const code = word.charCodeAt(word.length - 1) - 0xac00;
  if (code < 0 || code > 11171) return `${word}로`;
  const jong = code % 28;
  return jong === 0 || jong === 8 ? `${word}로` : `${word}으로`;
}

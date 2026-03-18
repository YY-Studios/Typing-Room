/** 한글 한 글자의 실제 키 입력 횟수 계산 */
export const getStrokeCount = (char: string): number => {
  const code = char.charCodeAt(0) - 0xac00;
  if (code < 0 || code > 11171) return 1;

  const jungIdx = Math.floor((code % (21 * 28)) / 28);
  const jongIdx = code % 28;

  const cho = 1;
  const jungStroke = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 2, 1,
  ];
  const jung = jungStroke[jungIdx];
  const jongStroke = [
    0, 1, 2, 2, 1, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1,
    1, 1, 1,
  ];
  const jong = jongStroke[jongIdx];

  return cho + jung + jong;
};

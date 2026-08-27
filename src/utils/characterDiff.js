// src/utils/characterDiff.js

export function characterDiff(str1 = '', str2 = '') {
  const s1 = String(str1 || '');
  const s2 = String(str2 || '');
  const maxLen = Math.max(s1.length, s2.length);
  const result = [];

  for (let i = 0; i < maxLen; i++) {
    const c1 = s1[i] !== undefined ? s1[i] : null;
    const c2 = s2[i] !== undefined ? s2[i] : null;

    let status = 'match';
    if (c1 === null || c2 === null) {
      status = 'extra'; // extra character present in one string
    } else if (c1.toLowerCase() !== c2.toLowerCase()) {
      status = 'mismatch'; // character differs
    } else {
      status = 'match'; // character matches exactly
    }

    result.push({
      index: i,
      c1,
      c2,
      status
    });
  }

  return result;
}

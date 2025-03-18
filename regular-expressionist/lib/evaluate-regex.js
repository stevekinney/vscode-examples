module.exports = function evaluateRegularExpression(pattern, text, flags) {
  const result = { inputText: text, matches: [] };

  if (!pattern) {
    return result;
  }

  let regex;
  try {
    regex = new RegExp(pattern, flags);
  } catch (err) {
    result.error = err.message;
    return result;
  }

  let match;
  if (!flags.includes('g')) {
    match = regex.exec(text);
    if (match) {
      result.matches.push({
        start: match.index,
        end: match.index + match[0].length,
        text: match[0],
      });
    }
  } else {
    while ((match = regex.exec(text)) !== null) {
      result.matches.push({
        start: match.index,
        end: match.index + match[0].length,
        text: match[0],
      });
    }
  }

  return result;
};

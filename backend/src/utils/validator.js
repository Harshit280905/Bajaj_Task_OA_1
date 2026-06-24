function parseAndValidate(data) {
  const invalid = [];
  const edges = [];

  data.forEach((raw) => {
    if (typeof raw !== "string") {
      invalid.push(raw);
      return;
    }

    const trimmed = raw.trim();
    const match = /^([A-Z])->([A-Z])$/.exec(trimmed);

    if (!match) {
      invalid.push(raw);
      return;
    }

    const [, parent, child] = match;

    if (parent === child) {
      invalid.push(raw);
      return;
    }

    edges.push({ raw, parent, child, key: `${parent}->${child}` });
  });

  return { invalid, edges };
}

module.exports = { parseAndValidate };
function dedupeEdges(edges) {
  const seen = new Set();
  const duplicateSet = new Set();
  const duplicates = [];
  const uniqueEdges = [];

  edges.forEach((e) => {
    if (seen.has(e.key)) {
      if (!duplicateSet.has(e.key)) {
        duplicateSet.add(e.key);
        duplicates.push(e.key);
      }
    } else {
      seen.add(e.key);
      uniqueEdges.push(e);
    }
  });

  return { uniqueEdges, duplicates };
}

module.exports = { dedupeEdges };
const { parseAndValidate } = require("../utils/validator");
const { dedupeEdges } = require("../utils/duplicateDetector");
const { buildGraph } = require("../utils/graphBuilder");

exports.handleBfhl = (req, res) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({ error: "data must be an array of strings" });
  }

  const { invalid, edges } = parseAndValidate(data);
  const { uniqueEdges, duplicates } = dedupeEdges(edges);
  const { parentOf, childrenOf, orderedNodes } = buildGraph(uniqueEdges);

  res.json({
    invalid_entries: invalid,
    duplicate_edges: duplicates,
    nodes: orderedNodes,
    parentOf,
    childrenOf
  });
};
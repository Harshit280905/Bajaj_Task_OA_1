const { parseAndValidate } = require("../utils/validator");
const { dedupeEdges } = require("../utils/duplicateDetector");
const { buildGraph } = require("../utils/graphBuilder");
const { findRootsAndBuildTrees } = require("../utils/rootFinder");
const { findCycles } = require("../utils/cycleDetector");

exports.handleBfhl = (req, res) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({ error: "data must be an array of strings" });
  }

  const { invalid, edges } = parseAndValidate(data);
  const { uniqueEdges, duplicates } = dedupeEdges(edges);
  const { parentOf, childrenOf, orderedNodes } = buildGraph(uniqueEdges);
  const { hierarchies, visited } = findRootsAndBuildTrees(parentOf, childrenOf, orderedNodes);
  const cycles = findCycles(parentOf, childrenOf, orderedNodes, visited);

  res.json({
    invalid_entries: invalid,
    duplicate_edges: duplicates,
    hierarchies: [...hierarchies, ...cycles]
  });
};
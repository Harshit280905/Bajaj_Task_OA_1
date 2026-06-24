function buildSummary(hierarchies) {
  const trees = hierarchies.filter((h) => !h.has_cycle);
  const cycles = hierarchies.filter((h) => h.has_cycle);

  let largestTreeRoot = "";

  if (trees.length > 0) {
    trees.sort((a, b) => {
      if (b.depth !== a.depth) {
        return b.depth - a.depth;
      }

      return a.root.localeCompare(b.root);
    });

    largestTreeRoot = trees[0].root;
  }

  return {
    total_trees: trees.length,
    total_cycles: cycles.length,
    largest_tree_root: largestTreeRoot
  };
}

module.exports = { buildSummary };
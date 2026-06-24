function findRootsAndBuildTrees(parentOf, childrenOf, orderedNodes) {
  const roots = orderedNodes.filter((n) => !(n in parentOf));
  const visited = new Set();
  const hierarchies = [];

  function buildSubtree(node) {
    visited.add(node);
    const children = childrenOf[node] || [];
    const obj = {};
    let maxChildDepth = 0;

    children.forEach((c) => {
      const [subTree, depth] = buildSubtree(c);
      obj[c] = subTree;
      maxChildDepth = Math.max(maxChildDepth, depth);
    });

    return [obj, maxChildDepth + 1];
  }

  roots.forEach((root) => {
    const [subTree, depth] = buildSubtree(root);
    hierarchies.push({ root, tree: { [root]: subTree }, depth });
  });

  return { hierarchies, visited };
}

module.exports = { findRootsAndBuildTrees };
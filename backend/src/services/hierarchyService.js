function calculateDepth(node, childrenOf) {
  const children = childrenOf[node] || [];

  if (children.length === 0) {
    return 1;
  }

  let maxDepth = 0;

  for (const child of children) {
    maxDepth = Math.max(maxDepth, calculateDepth(child, childrenOf));
  }

  return maxDepth + 1;
}

function buildTree(node, childrenOf) {
  const children = childrenOf[node] || {};

  const subtree = {};

  for (const child of children) {
    subtree[child] = buildTree(child, childrenOf);
  }

  return subtree;
}

function createHierarchy(root, childrenOf) {
  return {
    root,
    tree: {
      [root]: buildTree(root, childrenOf)
    },
    depth: calculateDepth(root, childrenOf)
  };
}

module.exports = {
  createHierarchy,
  calculateDepth
};
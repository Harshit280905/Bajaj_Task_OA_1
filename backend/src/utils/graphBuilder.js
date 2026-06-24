function buildGraph(uniqueEdges) {
  const parentOf = {};
  const childrenOf = {};
  const orderedNodes = [];
  const seenNodes = new Set();

  const addNode = (n) => {
    if (!seenNodes.has(n)) {
      seenNodes.add(n);
      orderedNodes.push(n);
    }
  };

  uniqueEdges.forEach(({ parent, child }) => {
    addNode(parent);
    addNode(child);

    if (!(child in parentOf)) {
      parentOf[child] = parent;
      if (!childrenOf[parent]) childrenOf[parent] = [];
      childrenOf[parent].push(child);
    }
  });

  return { parentOf, childrenOf, orderedNodes };
}

module.exports = { buildGraph };
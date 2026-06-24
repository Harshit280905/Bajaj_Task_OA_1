function findCycles(parentOf, childrenOf, orderedNodes, visited) {
  const remaining = orderedNodes.filter((n) => !visited.has(n));
  const groupVisited = new Set();
  const cycles = [];

  remaining.forEach((node) => {
    if (groupVisited.has(node)) return;

    const stack = [node];
    const group = new Set();

    while (stack.length) {
      const cur = stack.pop();
      if (group.has(cur)) continue;
      group.add(cur);
      groupVisited.add(cur);

      if (parentOf[cur] && !group.has(parentOf[cur])) stack.push(parentOf[cur]);
      (childrenOf[cur] || []).forEach((c) => {
        if (!group.has(c)) stack.push(c);
      });
    }

    const groupRoot = [...group].sort()[0];
    cycles.push({ root: groupRoot, tree: {}, has_cycle: true });
  });

  return cycles;
}

module.exports = { findCycles };
const { parseAndValidate } = require("../utils/validator");

exports.handleBfhl = (req, res) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({ error: "data must be an array of strings" });
  }

  const { invalid, edges } = parseAndValidate(data);

  res.json({
    invalid_entries: invalid,
    valid_edges_found: edges.map((e) => e.key)
  });
};
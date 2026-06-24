const express = require("express");
const cors = require("cors");
const bfhlController = require("./src/controllers/bfhlController");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/bfhl", bfhlController.handleBfhl);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
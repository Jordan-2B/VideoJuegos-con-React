const express = require('express');
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const FILE = path.join(__dirname, "src", "dato.json"); 

app.post("/tareas", (req, res) => {
  const nueva = req.body;

  let data = [];

  try {
    data = JSON.parse(fs.readFileSync(FILE));
  } catch (error) {
    data = [];
  }

  data.push(nueva);

  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

  res.json(nueva); // 🔥 mejor que send
});

app.get("/tareas", (req, res) => {
  let data = [];

  try {
    data = JSON.parse(fs.readFileSync(FILE));
  } catch {
    data = [];
  }

  res.json(data);
});
app.post("/tareas", (req, res) => {
  try {
    // ... tu código actual
  } catch (error) {
    console.error("Error:", error); // así ves si hay crashes
    res.status(500).json({ error: error.message });
  }
});

app.listen(4000, () => console.log("Servidor en puerto 4000"));
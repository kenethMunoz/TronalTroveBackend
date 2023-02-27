import express from "express";
import { PORT } from "./config/config.js";

const app = express();

app.get("/", (req, res) => {
  res.send("hola");
});

app.listen(PORT);

console.log(`server running on port ${4000}`);

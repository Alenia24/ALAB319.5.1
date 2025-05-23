import express from "express";
import dotenv from "dotenv";
import mongoose from "./db/conn.mjs";

dotenv.config();

const PORT = 5050;
const app = express();

import grades from "./routes/grades.mjs";
import grades_agg from "./routes/grades_agg.mjs"


app.use(express.json());

app.use("/grades", grades);
app.use("/grades", grades_agg);

app.get("/", (req, res) => {
  res.send("Welcome to the API.");
});

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Seems like we messed up somewhere...");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

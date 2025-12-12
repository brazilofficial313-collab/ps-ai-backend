// FILE: src/index.ts
import express from "express";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.use("*", (req, res) => {
  res.status(404).json({ ok: false, error: "Not found" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("=====================================");
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
  console.log("=====================================");
});

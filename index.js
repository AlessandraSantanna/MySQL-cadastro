import express from "express";
import userRoutes from "./routes/users.js";
import cors from "cors";
import { db } from "./db.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", userRoutes);

app.listen(8800, () => {
  console.log("Server running on http://localhost:8800");
});
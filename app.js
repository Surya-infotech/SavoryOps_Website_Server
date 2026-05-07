require("dotenv").config({ quiet: true });
const express = require("express");
const cors = require("cors");

const userTypeRouter = require("./router/usertype-router");
const systemRouter = require("./router/AdminPanel/system-router");
const { connectAdminDB } = require("./src/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/status", (_req, res) => {
  res.status(200).send("SavoryOps backend is running");
});

app.use("/general", userTypeRouter);
app.use("/system", systemRouter);

const PORT = process.env.PORT || 8081;

connectAdminDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Failed to start server:", error);
    process.exit(1);
  });

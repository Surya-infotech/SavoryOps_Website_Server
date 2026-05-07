require("dotenv").config({ quiet: true });
const express = require("express");
const cors = require("cors");
const crypto = require('crypto');
global.crypto = require('crypto');
const userTypeRouter = require("./router/usertype-router");
const systemRouter = require("./router/AdminPanel/system-router");
const { connectAdminDB } = require("./src/db");

const app = express();

const allowedOrigins = ["http://localhost:5174", "http://localhost:5173", "https://grow.savoryops.com","https://sunshine.savoryops.com"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow same-origin/non-browser requests and the two local frontend origins.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/status", (_req, res) => {
  res.status(200).send("SavoryOps backend is running");
});

app.use("/general", userTypeRouter);
app.use("/system", systemRouter);

const PORT = process.env.PORT || 8082;

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

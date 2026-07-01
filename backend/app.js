const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const HttpError = require("./models/http-error");
const recipesRoutes = require("./routes/recipes-routes");
const usersRoutes = require("./routes/users-routes");
const healthRoute = require("./routes/health-route");

const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.DB_USER || !process.env.DB_PASS || !process.env.DB_NAME) {
  console.error("❌ ERROR: Missing MongoDB environment variables!");
  process.exit(1);
}

const mongoDbUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mrobyik.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT");
  next();
});

app.use(healthRoute);
app.use(recipesRoutes);
app.use(usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  next(error);
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => console.log(err));
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred." });
});

mongoose
  .connect(mongoDbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas!");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); 
  });

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/health", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.status(200).json({ status: "ok", db: "connected" });
  } catch (err) {
    res.status(500).json({ status: "error", db: "disconnected" });
  }
});

module.exports = router;
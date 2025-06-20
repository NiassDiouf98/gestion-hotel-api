const express = require("express");
require('dotenv').config();
const compression = require('compression');
const mongoose = require("mongoose");
const hotelRoute = require("./routes/hotel.route.js");
const cors = require('cors');
const app = express();

// Middleware
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/hotels", hotelRoute);

app.get("/", (req, res) => {
  res.send("Hello, from Express.js!");
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
    })
    .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Exportez l'application Express pour Vercel
module.exports = app;
const express = require("express");
require('dotenv').config();
const compression = require('compression');
const mongoose = require("mongoose");
const hotelRoute = require("./routes/hotel.route.js");
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();

// Middleware
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100 // Limite : 100 requêtes par IP toutes les 15 min
}));

// Routes
app.use("/api/hotels", hotelRoute);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur serveur' });
});

app.get("/", (req, res) => {
  res.send("Hello, from Express.js!");
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    // app.listen(process.env.PORT || 3000, () => {
    //   console.log(`Server is running on port ${process.env.PORT || 3000}`);
    // });
    })
    .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Exportez l'application Express pour Vercel
module.exports = app;
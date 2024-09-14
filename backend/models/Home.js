const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({
  address: String,
  price: Number,
  bedrooms: Number,
  bathrooms: Number,
  squareFeet: Number,
  image: String,
});

module.exports = mongoose.model("Home", HomeSchema);

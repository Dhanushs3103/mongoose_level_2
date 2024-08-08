//packages
let mongoose = require("mongoose");

// movies schema
let movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
},{
  versionKey:false
});

//movie model
let MovieModel = mongoose.model("movie", movieSchema);

//exporting movieModel
module.exports = MovieModel
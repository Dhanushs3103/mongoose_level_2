//packages
let mongoose = require("mongoose");

//URL
let URL = "mongodb://127.0.0.1:27017/MoviesAPI";

let connection = mongoose.connect(URL);

//exporting connection
module.exports = connection;
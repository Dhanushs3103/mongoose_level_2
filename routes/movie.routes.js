//packages
let express = require("express");

//local imports
let MovieModel = require("../models/movie.model.js");

//parent router
let movieRouter = express.Router();

// Route for adding movie-data
movieRouter.post("/add-movie", async (req, res) => {
  try {
    // destructuring the req.body data
    let { title, director, rating, category, language } = req.body;
    //adding data to DB
    let movieData = new MovieModel({
      title,
      director,
      rating,
      category,
      language,
    });
    //saving the movieData
    await movieData.save();
    //sending the response
    res.status(201).send("Movie data added successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Route for updating the movie data(PUT request)
movieRouter.put("/update-movie/:movieId", async (req, res) => {
  try {
    // destructuring the req.body data
    let { title, director, rating, category, language } = req.body;
    //storing everything in one object
    let newData = { title, director, rating, category, language };
    // getting moveId from route
    let id = req.params.movieId;
    // updating movie with new data
    await MovieModel.findByIdAndUpdate(id, newData, { new: true });
    //sending response
    res.status(201).send("data modified successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Route for updating the movie data(patch request)
movieRouter.patch("/update-movie/:movieId", async (req, res) => {
  try {
    let id = req.params.movieId;
    // updating movie with new data
    await MovieModel.findByIdAndUpdate(id, req.body, { new: true });
    //sending response
    res.status(201).send("data modified successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Route for delete the movie data
movieRouter.delete("/delete-movie/:movieId", async (req, res) => {
  try {
    let id = req.params.movieId;
    // updating movie with new data
    await MovieModel.findByIdAndDelete(id);
    //sending response
    res.status(201).send("data deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Route for getting data based on search by title
movieRouter.get("/searchByTitle", async (req, res) => {
  try {
    // destructuring the req.body data
    let { title } = req.query;
    //building query object
    let query = {};
    // checking if title exits
    if (title) {
      query.title = new RegExp(title, "i"); //using RegExp(RegularExpressions with case insensitive)
    }
    // getting movie data based on title
    let movieData = await MovieModel.find(query);
    // sending data as response
    res.status(200).json({
      message: "Data received successfully",
      data: movieData,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Route for getting data based on filter by category,language,director
movieRouter.get("/filterBy", async (req, res) => {
  try {
    // destructuring the req.body data
    let { category, language, director } = req.query;
    //building query object
    let query = {};
    // checking if title exits
    if (category) {
      query.category = new RegExp(category, "i"); //using RegExp(RegularExpressions with case insensitive)
    }
    if (language) {
      query.language = new RegExp(language, "i");
    }
    if (director) {
      query.director = new RegExp(director, "i");
    }
    // getting movie data based on title
    let movieData = await MovieModel.find(query);
    // sending data as response
    res.status(200).json({
      message: "Data received successfully",
      data: movieData,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

movieRouter.get("/", async (req, res) => {
  try {
    // destructuring the req.body data
    let { page = 1, limit = 10 } = req.query;

    // Parsing the page and limit values
    let pageNumber = parseInt(page, 10);
    let pageSize = parseInt(limit, 10);

    // creating skip to skip the documents
    const skip = (pageNumber - 1) * pageSize;

    // getting movie data from DB
    let movieData = await MovieModel.find().skip(skip).limit(pageSize);

    // Get the total number of documents
    const totalMovies = await MovieModel.countDocuments();

    // sending movie data
    res.status(200).json({
      message: "Data received successfully",
      data: movieData,
      totalPages: Math.ceil(totalMovies / pageSize),
      currentPage: pageNumber,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

movieRouter.get("/sortByRating", async (req, res) => {
  try {
    // destructuring the req.body data
    let {sortOrder} = req.query;

    // Build sort object for rating
    let sort = {};
    // checking the sortOrder and assigning the values accordingly
    if(sortOrder === "asc") {
        sort.rating = 1 //Ascending order
    }else if(sortOrder === "desc") {
        sort.rating= -1 // Descending order
    }else{
      return res.send(400).send("Wrong sort order")
    }

    //getting data from DB
    let movieData = await MovieModel.find().sort(sort);

    //sending movieData
    res.status(200).json({
        message: "Data received successfully",
        data: movieData,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
// exporting movieRouter
module.exports = movieRouter;

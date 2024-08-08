//package
let express = require("express")
let dotenv = require("dotenv").config();

//local imports
let PORT = process.env.PORT;
let connection = require("./config/db.connection.js")
let movieRouter = require("./routes/movie.routes.js")
let MovieModel = require("./models/movie.model.js")

// initializing sever
let app = express();

//middlewares
app.use(express.json())
app.use("/movie",movieRouter)

// home route
app.get("/",async(req,res)=>{
    try {
        // getting movie data from DB
        let movieData = await MovieModel.find();
        // sending movie data
        res.status(200).json({
            message:"Data received successfully",
            data:movieData
        })
    } catch (error) {
        console.log(error);
        res.status(500).send(error)        
    }
})

// server is listening to the port and connected to the DB
app.listen(PORT, async()=>{
    try {
        await connection;
        console.log(`Server is running at the port ${PORT} and connected to DB`)
    } catch (error) {
        console.log(error);
    } 
})

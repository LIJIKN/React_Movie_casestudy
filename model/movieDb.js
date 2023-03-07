const mongoose = require("mongoose");
mongoose.connect ("mongodb+srv://liji:abc@cluster0.n8yaa.mongodb.net/movieApp")


const Schema = mongoose.Schema ;
var movieSchema = new Schema ({
    MovieName: String,
    ActorName : String,
    ActressName : String,
    directorsName : String,
    year : Number,
    camera : String,
    produser : String,
    Language : String
    
});

 let Collection = mongoose.model("MovieLists", movieSchema)

 module.exports = Collection



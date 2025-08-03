// filepath: f:\website\inote\backend\db.js
const mongoose = require('mongoose');
// Use local MongoDB for development, MongoDB Atlas for production
const mongoURI = process.env.NODE_ENV === 'production' 
  ? process.env.MONGO_URI 
  : "mongodb://localhost:27017/inote";

const connectToMongo = () => {
    console.log("Mongo URI being used:", mongoURI);
    mongoose.connect(mongoURI)
        .then(() => {
            console.log("Connected to MongoDB successfully");
        })
        .catch((err) => {
            console.error("Failed to connect to MongoDB:", err);
        });
}

module.exports = connectToMongo;

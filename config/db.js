require("dotenv/config");

const mongoose = require("mongoose");

const connectDb = async() => {
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch((err) => {
    console.log(`Error while connecting to DB :${err}`);
  })
};

module.exports = connectDb
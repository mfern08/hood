const express = require("express");
const app = express();
const port = 5000;
const cors = require('cors');
//const helmet = require("helmet");
 
const mongoose = require("mongoose");
//require("dotenv").config({ path: '../.env'});
require('dotenv').config();
const ProductRouter = require("./routes/productlRouter");
const messageRouter = require('./routes/messageRoute')
 
const uploadRouter = require('./routes/uploadRouter')
 const navRouter = require('./routes/navRouter');
 const userRouter = require('./routes/userRouter');
 
const itemRouter = require('./routes/itemRouter')
const createItemsRouter = require('./routes/createItemsRouter')

 
const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASS;
const mongoDB = `mongodb+srv://${user}:${password}@cluster0.k6vfw.mongodb.net/MockOfferUp?retryWrites=true&w=majority`;
 
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => {
      console.log("Connected successfully");
    },
    (err) => {
      console.log(`Connection failed with ${err}`);
    }
  );

// Retain an instance of the connection so that we can log errors
const db = mongoose.connection;

db.on("error", () => console.log("MongoDB connection error:"));
db.on("close", () => {
  console.log("MongoDB connection closed");
});
app.use(express.json())
app.use(cors());
// Static Files
app.use('/img', express.static('../resources/uploads'));

app.use("/v1/seller", ProductRouter);
app.use('/v1/details',messageRouter);
app.use("/v1/item", itemRouter);
app.use('/v1/nav', navRouter);
app.use('/v1/user', userRouter);
app.use("/v1/create", createItemsRouter);
app.use("/v1/upload", uploadRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

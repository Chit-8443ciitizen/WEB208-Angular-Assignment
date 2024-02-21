const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api");
const cors = require('cors');
const {showAllDatabase} = require("./connect_mongo")

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));


app.use("/api", apiRoutes);

// MongoDB connection
mongoose
  .connect(
    //"mongodb+srv://qhuydev:1Qu3suVc1hEEdi6d@cluster0.dek5hts.mongodb.net/quanlydoanhnghiep?retryWrites=true&w=majority"
    "mongodb+srv://admin0:Admin123@atlascluster.htffjso.mongodb.net/quanlydoanhnghiep?retryWrites=true&w=majority"
    )
  .then(() => {
    console.log("MongoDB is ready");

    app.listen(port, () => {
      console.log(`Server is running on port: http://localhost:${port}/`);
      if(!showAllDatabase()){
        console.log("show not ok")
      } else {
        console.log(" ok")
      }
      
    });
  })
  .catch((err) => {
    console.log(`MongoDB error: ${err}`);
  });

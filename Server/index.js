const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());
const port = 3000;

//const DATABASE_NAME = "management_project";
const DATABASE_NAME = "quanlydoanhnghiem";
//const CONNECTION_STRING = "mongodb+srv://admin0:Admin123@atlascluster.htffjso.mongodb.net/?retryWrites=true&w=majority";
const CONNECTION_STRING = "mongodb+srv://qhuydev:1Qu3suVc1hEEdi6d@cluster0.dek5hts.mongodb.net/quanlydoanhnghiem?retryWrites=true&w=majority";
const client = new MongoClient(CONNECTION_STRING, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
// Error handling middleware
app.use((err, req, res, nexr)=>{ 
  console.error(err.stack);
  res.status(500).send('Some thing is wrong!');
})
async function connectToDatabase() {
  try {
    await client.connect();
    await client.db(DATABASE_NAME).command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.log("Error:", error);
    throw new Error('Unable to connect to the database.')
  }
}
// async function connectToDatabase() {
//   try {
//     await client.connect();
//     console.log("Connected to MongoDB!");

//     // Print all data in the database
//     const collections = await client.db(DATABASE_NAME).listCollections().toArray();
//     for (const collection of collections) {
//       const data = await client.db(DATABASE_NAME).collection(collection.name).find({}).toArray();
//       console.log(`Data in collection ${collection.name}:`, data);
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     throw new Error('Unable to connect to the database.');
//   }
// }

app.listen(port, () => {
  console.log(`Server is running on por: http://localhost:${port}`);
  connectToDatabase();
});
app.get('/', (req, res) => {
  res.send('Hello World!')
});

// API endpoint
const managementRouter = express.Router();
managementRouter.get('/', async (req, res)=>{
  try {
    const result = await client.db(DATABASE_NAME).collection("list_project").find({}).toArray();
    res.send(result);
  } catch (err) {
    // Pass the error to the error handling middleware
    next(err);
  }
})
app.get('/api/management', managementRouter);
app.post('api/management/addProjects',multer().none(),(req,res)=>{
  try {
    const result = client.db(DATABASE_NAME).collection("list_project").find({}).toArray();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
    // try{
    //     const result = await client.db(DATABASE_NAME).collection("list_project").count({}, function(err, numOfDocs)=>{
    //         client.db(DATABASE_NAME).collection("list_project").insertOne({
    //             id:(numOfDocs+1).toString(),
    //             name:req.body.newProject
    //         });
    //         res
    //     })
    // }
})



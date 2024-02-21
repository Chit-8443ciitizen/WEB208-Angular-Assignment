const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");


const DATABASE_NAME = "quanlydoanhnghiep"; // management_project
const CONNECTION_STRING = "mongodb+srv://admin0:Admin123@atlascluster.htffjso.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(CONNECTION_STRING, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

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
async function showAllDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    // Print all data in the database
    const collections = await client.db(DATABASE_NAME).listCollections().toArray();
    for (const collection of collections) {
      const data = await client.db(DATABASE_NAME).collection(collection.name).find({}).toArray();
      console.log(`Data in collection ${collection.name}:`, data);
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error('Unable to connect to the database.');
  }
}
async function closeConnection() {
    try {
        await client.close();
        console.log("Connection to MongoDB closed successfully.");
    } catch(err){
        console.error("Error while closing connection:", error);
        throw new Error('Unable to close the connection to the database.')
    }
}
module.exports = {
    DATABASE_NAME,
    client,
    connectToDatabase,
    showAllDatabase,
    closeConnection
}



"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if(err) {
    console.log(`failed to connect :, ${MONGODB_URI}`);
    throw err;
  }

  console.log(`connected to mongodb: ${MONGODB_URI}`);
  db.collection("tweets").find().toArray((err,resultArray) => {
    if(err) throw err;
    console.log("results.toArray : ", resultArray);
    db.close();
  });

});
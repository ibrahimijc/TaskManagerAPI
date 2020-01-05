const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager';

MongoClient.connect(url,function(err,client){
    console.log('connected successfuly to the server');

    const db = client.db(dbName);


    const userCollection = db.collection('user');

    userCollection.insertOne({
        name: "ijc",
        age : 22
    })

})
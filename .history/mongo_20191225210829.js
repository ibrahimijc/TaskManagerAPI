const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID;
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager';

MongoClient.connect(url,function(err,client){
    console.log('connected successfuly to the server');

    const db = client.db(dbName);


    // const userCollection = db.collection('user');

    // userCollection.insertOne({
    //     name: "ijc",
    //     age : 22
    // })

//     db.collection('tasks').insertMany([{
//         description : "edit your profile",
//         completed: true
//     },
//     {
//         description : "do home tasks",
//         completed: true
//     }
// ] , (error,result) => {
//     if (error)
//     return console.log("couldn't insert thr records");
//     else {
//       console.log(result.ops);  
//     }
//    }
// )


// db.collection('tasks').findOne({
//     _id : new ObjectId('5e033e7d870ab428c8d08e52')
// },(error,result)=>{
//     if (error)
//     return console.log('unable to fetch');

//     console.log(result);
// })


// db.collection('tasks').find({completed : false}).toArray((error,utasks)=>{
//     console.log(utasks);
// });

db.collection('tasks').updateMany({
    age:22
 },{
   
    $set:{
        name:'ibrahim'
    }
}).then(result => {
    console.log(result)

}).catch(error => {
    console.log(error);
})





})
const mongoose = require('mongoose');
const validator = require('validator');
mongoose.set('useCreateIndex', true);

console.log(process.env.port);
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',
 { useNewUrlParser: true ,useUnifiedTopology: true }
).catch((e)=>{
    console.log("Error in Connecting to Mongo",e.message)
});

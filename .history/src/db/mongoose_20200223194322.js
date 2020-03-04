const mongoose = require('mongoose');
const validator = require('validator');
mongoose.set('useCreateIndex', true);

console.log(process.env.dbPath);
mongoose.connect(process.env.dbPath,
 { useNewUrlParser: true ,useUnifiedTopology: true }
).catch((e)=>{
    console.log("Error in Connecting to Mongo",e.message)
});

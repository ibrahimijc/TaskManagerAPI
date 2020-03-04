const mongoose = require('mongoose');
const validator = require('validator');
mongoose.set('useCreateIndex', true);


mongoose.connect(process.env.dbPath.toString(),
 { useNewUrlParser: true ,useUnifiedTopology: true }
).catch((e)=>{
    console.log("Error in Connecting to Mongo",e.message)
});

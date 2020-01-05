const mongoose = require('mongoose');
const validator = require('validator');
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');
const User = mongoose.model('User',{
    UserName:{
        type: String,
        trim:true,
        required:true
    },
    Email:{
        type: String,
        required:true,
        trim:true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Email is invalid');     
            }
        }
    },
    Password: {
      type : String,
      required: true,
      trim:true,
      validate(value){
          if (value.toLowerCase() =='password')
          throw new Error (`bad boys don't keep passsword as password`)
      }  
    },
    age:{
        type: String,
        required:true,
        validate(value){
            if (value<18)
            throw new Error ('Under aged people arent allowed');
        }

    }


})
const task = mongoose.model('Task',{
    description:{
        type: String,
        required: true
    },
    completed: {
        type : Boolean
    }

});

const userobj = new User({
    UserName:"       sameer         khan _bajwa ",
    Email:"sameer@zaavya.com",
    age:20
})

userobj.save().then(()=>{
console.log(userobj);
}).catch((e)=>{
    console.log('error ',e.message);
});

// const mytask = new task({
  
//     completed: false
// });


// mytask.save().then(()=>{
//     console.log(mytask);
// }).catch(()=>{
//     console.log('couldnt save the task');
// })
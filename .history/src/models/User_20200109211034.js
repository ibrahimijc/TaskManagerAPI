const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    UserName:{
        type: String,
        trim:true,
        required:true
    },
    Email:{
        type: String,
        required:true,
        unique: true,
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
      minlength:7,
      validate(value){
          if (value.toLowerCase() =='password' )
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

usesSchema.statics.findByCredentials(email,password)= async function(){
    const user = await User.findOne({email});

    if (!user){
        throw Error ('unable to login');
    }
    
    const isMatch = await bcrypt.compare(password,user.Password);

    if (!isMatch){
        throw Error('unable to login');
    }

    return user;
}

userSchema.pre('save', async function(next){
    const user = this
    if (user.isModified('Password')){
        user.Password = await bcrypt.hash(user.Password,8);
    }
    next();
})



const User = mongoose.model('User',userSchema);


module.exports = User;
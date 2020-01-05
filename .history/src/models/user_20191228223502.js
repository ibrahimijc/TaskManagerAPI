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

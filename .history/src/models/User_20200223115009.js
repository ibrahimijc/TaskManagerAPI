const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./Task');
const userSchema = new mongoose.Schema({
  UserName: {
    type: String,
    trim: true,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  Password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase() == 'password')
        throw new Error(`bad boys don't keep passsword as password`)
    } 
  },
  age: {
    type: String,
    required: true,
    validate(value) {
      if (value < 18)
        throw new Error('Under aged people arent allowed');
    }
},
tokens : [{
  token:{
    type: String,
    required: true
  }
}],
avatar: {
  type : Buffer
}
},
{
  timestamps : true
}
)

userSchema.virtual('userTasks',{
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
})

// toJSON method is called before a JSON.strigify.. res.send() calls
// JSON.stringify()
userSchema.methods.toJSON = function(){
  const user = this;
  const userObject =  user.toObject();
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
}

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token =  jwt.sign({_id:user._id.toString()},process.env['secret']);
  user.tokens = user.tokens.concat({token});
  await user.save();
 
  return token;
}

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ Email: email });
  if (!user) {
    throw Error('unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.Password);
  if (!isMatch) {
    throw Error('unable to login');
  }

  return user;
}

//  runs before saving the user to store password as a hash in db
userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('Password')) {
    user.Password = await bcrypt.hash(user.Password, 8);
  }
  next();
})

userSchema.pre('remove',async function(next){
  const user = this;
  await Task.deleteMany({owner: user._id});

  next();
})


const User = mongoose.model('User', userSchema);


module.exports = User;
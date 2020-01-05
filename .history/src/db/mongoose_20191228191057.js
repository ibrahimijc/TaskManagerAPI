const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');

const task = mongoose.model('Task',{
    description:{
        type: String,
        required: true
    },
    completed: {
        type : Boolean
    }

});

const mytask = new task({
  
    completed: false
});


mytask.save().then(()=>{
    console.log(mytask);
}).catch(()=>{
    console.log('couldnt save the task');
})
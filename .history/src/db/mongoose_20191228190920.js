const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');

const task = mongoose.model('Task',{
    description:{
        type: String
    },
    completed: {
        type : Boolean
    }

});

const mytask = new task({
    description : "do laundry",
    completed: false
});


mytask.save().then(()=>{
    console.log(mytask);
}).catch(()=>{
    console.log('couldnt save the task');
})
require('./src/db/mongoose')
const Task = require ('./src/models/Task');

console.log(Task);
Task.findByIdAndDelete({ _id:"5e077499dca7e70ffc882638"}).then(()=>{
    console.log('deleted Successfully');
    return Task.find({completed: false})

}).then((tasks)=>{
    console.log(tasks);
}).catch(e=>{
    console.log(e.message);
});
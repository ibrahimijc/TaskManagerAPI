require('./src/db/mongoose')
const Task = require('./src/models/Task');

// Task.findByIdAndDelete({ _id:"5e077499dca7e70ffc882638"}).then(()=>{
//     console.log('deleted Successfully');
//     return Task.countDocuments({completed: false})

// }).then((numberoftask)=>{
//     console.log(numberoftask);
// }).catch(e=>{
//     //console.log(e.message);
// });


const findAndDelete = async function (_id = "5e077499dca7e70ffc882638") {
    await Task.findByIdAndDelete({ _id });
    const numberoftask = await Task.countDocuments({ completed: false });
    return numberoftask;
}

findAndDelete().then((IncompletedTaskcount) => {
    console.log(IncompletedTaskcount);
}).catch((e) => {
    console.log('e', e.message);
});
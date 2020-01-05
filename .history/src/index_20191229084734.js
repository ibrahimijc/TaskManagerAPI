const express = require('express');
require('./db/mongoose'); // makes sure file runs.. db connected  
const User = require('./models/User');
const Task = require('./models/Task');
const app = express();
const port = process.env.port || 3000;

app.use(express.json());

app.post('/users',(req,res)=>{
    console.log(req.body);
    const user = new User(req.body);
    user.save().then(()=>{
        res.status(201).send(user);
 
    }).catch((e)=>{
        res.status(400).send(e);
    });
})


app.post('/task',(req,res)=>{
    console.log(req.body)
    const task = new Task(req.body);
    task.save().then(()=>{
        res.status(201).send(task);
    }).catch((e)=>{
        res.status(400);
        res.send(e);
    });


});



app.get('/users',(req,res)=>{
    //const user = new User();
    User.find({}).then( (users)=>{
       res.send(users)
    }).catch(e =>{
        res.status(500).send(e.message);
    })
})


app.get('/user/:id',(req,res) =>{
    User.findById(req.params.id).then((user)=>{
        res.status(200).send(user);
    }).catch(e =>{
        res.status(404).send();
    });
})


app.get('/task/:id',(req,res) =>{
    Task.findById(req.params.id).then((task)=>{
        res.status(200).send(task);
    }).catch(e =>{
        res.status(404).send();
    });
})


app.listen(port,()=>{
    console.log('server is running');
});


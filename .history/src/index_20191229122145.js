const express = require('express');
require('./db/mongoose'); // makes sure file runs.. db connected  
const User = require('./models/User');
const Task = require('./models/Task');
const app = express();
const port = process.env.port || 3000;

app.use(express.json());

app.post('/users', async (req,res)=>{
    
    try{
      const user = new User(req.body);
      await user.save(); // this will break if not successfull
      res.status(201).send(user);
    }catch(e){
        res.status(400).send(e.message);

    }

   
})


app.post('/task', async (req,res)=>{
    
    try{
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
    }catch(e){
    res.status(400);
    res.send(e);
    }
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


app.get('/tasks',(req,res)=>{
    Task.find({}).then( (tasks)=>{
       res.send(tasks)
    }).catch(e =>{
        res.status(500).send(e.message);
    })
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


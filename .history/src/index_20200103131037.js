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



app.get('/users',async (req,res)=>{
   try{ 
    const users = await User.find({});
    res.send(users)
    }
    catch(e){
     res.status(500).send();
     console.log(e.message);
    }
})


app.get('/user/:id',async (req,res) =>{
    try{
      const user = await  User.findById(req.params.id);
      res.status(200).send(user);
    }
    catch(e){
      res.status(404).send();
    }
})


app.patch('/user/:id', async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new: true, runValidators: true});
        res.status(200).send(user);
    }catch(e){
        res.status(404).send();
    }
});



app.get('/tasks',async (req,res)=>{

    try{
    const task = await Task.find({});
    res.send(task)
    }catch(e){
    res.status(500).send(e.message);
    }
})


app.get('/task/:id', async (req,res) =>{
   
    try{
    const task = await Task.findById(req.params.id);
    res.send(task);
    }catch(e){
    res.status(404).send();
    }
})


app.listen(port,()=>{
    console.log('server is running');
});


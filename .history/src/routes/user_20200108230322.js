
const express = require('express');
const router = new express.Router();
const User = require('../models/User')

router.post('/users', async (req,res)=>{
    
    try{
      const user = new User(req.body);
      await user.save(); // this will break if not successfull
      res.status(201).send(user);
    }catch(e){
        res.status(400).send(e.message);

    }

   
})





router.get('/users',async (req,res)=>{
   try{ 
    const users = await User.find({});
    res.send(users)
    }
    catch(e){
     res.status(500).send();
     console.log(e.message);
    }
})


router.get('/user/:id',async (req,res) =>{
    try{
      const user = await  User.findById(req.params.id);
      res.status(200).send(user);
    }
    catch(e){
      res.status(404).send();
    }
})


router.patch('/user/:id', async(req,res)=>{
    
    const allowedUpdates = ["UserName","Email","Password","age"];
    const updates = Object.keys(req.body);

    let isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update);
    })
    if (!isValidOperation){
        res.status(400).send({'error':'invalid update'});
    }
    try{

        const user = await User.findById(req.params.id);

        updates.forEach((update) => {
            user[update] = req.body[update];
        })

        //const user = await User.findByIdAndUpdate(req.params.id,req.body,{new: true, runValidators: true});
        if (!user){
            return res.status(404).send();

        }
        res.status(200).send(user);
    }catch(e){
        res.status(404).send();
    }
});

router.delete('/user/:id', async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user){
            return res.status(400).send();
        }

        res.send(user);
    }catch(e){
        res.status(500).send();
    }
})


module.exports = router;
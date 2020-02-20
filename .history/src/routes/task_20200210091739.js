const express = require('express');
const router = new express.Router();
const Task = require('../models/Task');
const auth  = require('../middlewear/Auth');



router.post('/task', auth, async (req, res) => {

    try {
        const task = new Task({
            description: req.body.description,
            completed : req.body.completed,
            owner: req.user._id
        });
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400);
        res.send(e);
    }
});

// GET/ tasks/?completed=true
router.get('/tasks', auth ,async (req, res) => {

    const sort = {}
    const match = req.query.completed === 'true'
    let limit = parseInt (req.query.limit)
    let skip = parseInt (req.query.skip)
    let task;
   
    try {
        
        if (req.query.sortBy){
            let parts = req.query.sortBy.split(':');
            sort[parts[0]]= parts[1] === 'desc' ? -1 : 1; 
        }
        
        tasks = await Task.find({
            owner:req.user._id ,  
            completed : req.query.completed ? match : { $in: [true,false]}  
        }
        ).limit(limit).skip(skip).sort(sort);
        // 1 for ascending, -1 for descending
        /*
        if (req.query.completed)
         tasks = await Task.find({owner:req.user._id , completed : match}).limit(limit).skip(skip);
        else 
        tasks = await Task.find( {owner:req.user._id} ).limit(limit).skip(skip).sort({createdAt:-1});
        */
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e.message);
    }
})


router.get('/task/:id',auth, async (req, res) => {
    
    try {
        const task = await Task.findOne({
           _id: req.params.id,
           owner : req.user._id
        });

        if (!task){
            return res.status(404).send();
        }


        res.send(task);
    } catch (e) {
        res.status(404).send();
    }
})

router.patch('/task/:id', auth, async (req, res) => {

    const allowedUpdates = ["description", "completed"];
    const updates = Object.keys(req.body);
    let isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    })
    if (!isValidOperation) {
        return res.status(400).send({ 'error': 'invalid update' });
    }
    try {
        const task = await Task.findOne({_id: req.params.id, owner : req.user._id});

        updates.forEach((update) => {
            task[update] = req.body[update];
        })

        await task.save();

        //const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new: true, runValidators: true});
        if (!task) {
            return res.status(404).send();
        }
        res.status(200).send(task);
    } catch (e) {
        res.status(404).send();
    }
});


router.delete('/task/:id',auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner:req.user._id});

        if (!task) {
            return res.status(400).send();
        }

        
        //await task.save();
       
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
})

module.exports = router;
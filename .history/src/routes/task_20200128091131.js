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


router.get('/tasks', auth ,async (req, res) => {

    try {
        const task = await Task.find({owner:req.user._id});
        res.send(task)
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

router.patch('/task/:id', async (req, res) => {

    const allowedUpdates = ["description", "completed"];
    const updates = Object.keys(req.body);

    let isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    })
    if (!isValidOperation) {
        return res.status(400).send({ 'error': 'invalid update' });
    }
    try {
        const task = await Task.findByIdAndUpdate(req.params.id);

        updates.forEach((update) => {
            task[update] = req.body[update];
        })

        task.save();

        //const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new: true, runValidators: true});
        if (!task) {
            return res.status(404).send();
        }
        res.status(200).send(task);
    } catch (e) {
        res.status(404).send();
    }
});


router.delete('/task/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(400).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
})

module.exports = router;
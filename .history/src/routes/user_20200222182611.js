
const express = require('express');
const router = new express.Router();
const User = require('../models/User')
const auth = require('../middlewear/Auth');

var multer  = require('multer')
var upload = multer({ 
	dest: 'avatars/',
	fileSize: 1	
})

router.post('/users' ,async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save(); // this will break if not successfull
		const token = await user.generateAuthToken();
		res.status(201).send({ user, token });
	} catch (e) {
		res.status(400).send(e.message);
	}
})


router.post('/user/login', async (req, res) => {
	
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password);
		const token = await user.generateAuthToken();
		res.send({ user, token });
	} catch (e) {
		res.status(500).send(e.message);
	}
})


router.post('/user/logout',auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter( (token)=>{
			return token.token !== req.token;
		})
		
		await req.user.save();
		res.send();
		
	}catch (e) {
		res.send(400);
		}
})


/* 
upload.single() => middlewear function for saving forms

*/
router.post('/user/me/avatar', upload.single('avatar') ,(req,res) => {
	
		res.sendStatus(200);
	
})


/*
    Params:
    @String: route path,
    auth: middleware function to run before the function
    function: to complete the desired task
 */
router.get('/user/me', auth, async (req, res) => {
	// this function will only run if auth function calls
	// next()
	const user = req.user;
	res.send(user)
})




router.patch('/user/update',auth, async (req, res) => {
 
	
	const allowedUpdates = ["UserName", "Email", "Password", "age"];
	const updates = Object.keys(req.body);

	let isValidOperation = updates.every((update) => {
		return allowedUpdates.includes(update);
	})
	if (!isValidOperation) {
		res.status(400).send({ 'error': 'invalid update' });
	}
	try {

		const user = req.user;

		updates.forEach((update) => {
			user[update] = req.body[update];
		})
		
		await user.save();
		res.status(200).send(user);
	} catch (e) {
		res.status(404).send();
	}
});









router.delete('/user/me', auth , async function (req, res) {
	try {
		 // req.user is coming from middlewear auth
		 await req.user.remove();
		 res.send(req.user);
	} catch (e) {
		res.status(500).send();
	}
})



module.exports = router;
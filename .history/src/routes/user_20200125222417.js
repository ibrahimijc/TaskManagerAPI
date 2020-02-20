
const express = require('express');
const router = new express.Router();
const User = require('../models/User')
const auth = require('../middlewear/Auth');

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
		//console.log(req.user);
		req.user.tokens = req.user.tokens.filter( (token)=>{
			return token.token !== req.token;
		})
		
		 /*
		 await req.user.save();
		 for some reasons the function isn't working with await.
		 wasn't giving 200 response with await on postman.
		 but the user is still saved successfuly.
		 */
		req.user.save().then(()=>{
			console.log('success');
		}).catch((err)=>{
			console.log(err)
		})
		 res.send();
		} catch (e) {
		res.send(400);
		}
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


// router.get('/user/:id',auth, async (req, res) => {
// 	try {
// 		const user = await User.findById(req.params.id);
// 		res.status(200).send(user);
// 	}
// 	catch (e) {
// 		res.status(404).send();
// 	}
// })


// router.get('/user/:id',auth, async (req, res) => {
// 	try {
// 		const user = await User.findById(req.params.id);
// 		res.status(200).send(user);
// 	}
// 	catch (e) {
// 		res.status(404).send();
// 	}
// })




router.patch('/user/:id',auth, async (req, res) => {

	const allowedUpdates = ["UserName", "Email", "Password", "age"];
	const updates = Object.keys(req.body);

	let isValidOperation = updates.every((update) => {
		return allowedUpdates.includes(update);
	})
	if (!isValidOperation) {
		res.status(400).send({ 'error': 'invalid update' });
	}
	try {

		const user = await User.findById(req.params.id);

		updates.forEach((update) => {
			user[update] = req.body[update];
		})
		await user.save();
		//const user = await User.findByIdAndUpdate(req.params.id,req.body,{new: true, runValidators: true});
		if (!user) {
			return res.status(404).send();
		}


		res.status(200).send(user);
	} catch (e) {
		res.status(404).send();
	}
});


router.delete('/user/me', auth, async function (req, res) {
	try {
		console.log('here');
		await req.user.remove();
		res.send(req.user);
	} catch (e) {
		res.status(500).send();
	}
})







// router.delete('/user/:id', auth,async (req, res) => {
// 	try {
// 		const user = await User.findByIdAndDelete(req.params.id);

// 		if (!user) {
// 			return res.status(400).send();
// 		}

// 		res.send(user);
// 	} catch (e) {
// 		res.status(500).send();
// 	}
// })


module.exports = router;
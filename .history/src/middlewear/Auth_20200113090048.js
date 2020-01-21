const jwt = require('jsonwebtoken');
const User = require('../models/User');


const auth = async function (req,res,next) {
    
    const token = req.header('Authorization').replace('Bearer ','');
    try{
        const decode = await jwt.verify(token,process.env.secret);

        const user = await User.findOne({_id:decode._id,'tokens.token':token});
        if (!user){
            throw new Error();
        }
        
        req.user =user;
        next();

    }catch{
        res.status(401).send({error: 'please authenticate'});
    }

    next();
}
const express = require('express');
require('./db/mongoose'); // makes sure file runs.. db connected  

const User = require('./models/User');
const app = express();
const port = process.env.port || 3000;

app.post('/users',(req,res)=>{
    const user = new User();
    user.save().then(()=>{
        res.send(user);
 
    }).catch((e)=>{
        res.status(400);
        res.send(e);
    });
})


app.listen(port,()=>{
    console.log('server is running');
});


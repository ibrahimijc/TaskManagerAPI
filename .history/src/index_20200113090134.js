const express = require('express');
require('./db/mongoose'); // makes sure file runs.. db connected  
const User = require('./models/User');
const Task = require('./models/Task');
const app = express();
const port = process.env.port || 3000;
const UserRouter = require('./routes/user');
const TaskRouter = require('./routes/task');
const dotenv = require('dotenv');

// for using .env variables.
dotenv.config();


/* this middleware function runs before each api call
    Params: req
            res
            next : must to call to tell the function to continue
             to the called route

app.use((req,res,next)=>{

    res.status(500).send()

    next();
})
*/
app.use(express.json());
app.use(UserRouter);
app.use(TaskRouter);




app.listen(port, () => {
    console.log('server is running');
});


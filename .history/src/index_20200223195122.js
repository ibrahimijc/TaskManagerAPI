const express = require('express');
require('./db/mongoose'); // makes sure file runs.. db connected  
const User = require('./models/User');
const Task = require('./models/Task');
const UserRouter = require('./routes/user');
const TaskRouter = require('./routes/task');
const Mongoose = require('./db/mongoose');
const dotenv = require('dotenv');

// for using .env variables.
const app = express();
dotenv.config();


const port = process.env.port;

app.use(Mongoose);
app.use(express.json());
app.use(UserRouter);
app.use(TaskRouter);




app.listen(port, () => {
    console.log('server is running');
});


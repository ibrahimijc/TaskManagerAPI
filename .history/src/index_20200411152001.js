const express = require('express');
require('./db/mongoose'); // makes sure file runs.. db connected  
const User = require('./models/User');
const Task = require('./models/Task');
const UserRouter = require('./routes/user');
const TaskRouter = require('./routes/task');
const dotenv = require('dotenv');

// for using .env variables.
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(UserRouter);
app.use(TaskRouter);




app.listen(PORT, () => {
    console.log('server is running at',PORT);
});


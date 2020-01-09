const express = require('express');
require('./db/mongoose'); // makes sure file runs.. db connected  
const User = require('./models/User');
const Task = require('./models/Task');
const app = express();
const port = process.env.port || 3000;
const UserRouter = require('./routes/user');
const TaskRouter = require('./routes/task');

app.use(express.json());
app.use(UserRouter);
app.use(TaskRouter);




app.listen(port, () => {
    console.log('server is running');
});


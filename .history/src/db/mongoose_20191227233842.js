const mongoose = require('mongoose');

const task = mongoose.model('Task',{description:string,completed:boolean});


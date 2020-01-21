const mongoose = require('mongoose');
const validator = require('validator');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', { useNewUrlParser: true },{ useUnifiedTopology: true });

const task = mongoose.model('Task',{
    description:{
        type: String,
        required: true
    },
    completed: {
        type : Boolean,
        default: false
    }

});

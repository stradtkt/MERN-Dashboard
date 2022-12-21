const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    comments: [{
        text: {
            type: String,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    }],
    isCompleted: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = Task = mongoose.model('tasks', TaskSchema);
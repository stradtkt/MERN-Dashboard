const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RoleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});


module.exports = Role = mongoose.model('roles', RoleSchema);
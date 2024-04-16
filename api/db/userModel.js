const mongoose = require('mongoose');
const airbnbschema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "please enter your name"]
    },
    email: {
        type: String,
        required: [true],
        unique: [true]
    },
    password: {
        type: String,
        required: [false]
    }
    
},
{
    timestamps : true
});

const UserModel = mongoose.model('user',airbnbschema);
module.exports = UserModel;

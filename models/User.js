const mongoose = require('mongoose')

//define schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        public_id: {
            type: String
        },

        url: {
            type: String
        }
    },
    role :{
        type: String,
        default:'User'
    }
},{timestamps: true})

//create callection
const UserModel = mongoose.model('users', UserSchema)
module.exports = UserModel
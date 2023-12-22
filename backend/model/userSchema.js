const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    googleId: String,
    displayName: String,
    email: String,
    Image:String

},{
    timestamps:true
})


const userDB = new mongoose.model('users',userSchema)

module.exports = userDB;
const mongoose = require("mongoose")


const newSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    verified :{
        type:Boolean,
        required:true
    }
})

const userp = mongoose.model("User",newSchema)
const admin = mongoose.model("Admin",newSchema)
const tc = mongoose.model("TC",newSchema)


module.exports = {userp,admin,tc}
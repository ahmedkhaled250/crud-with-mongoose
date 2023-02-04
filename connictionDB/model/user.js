import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    confirmEmail:{
        type:Boolean,
        required:true,
        default:false
    },
    age:Number,
    gender:{
        type:String,
        default:'Male',
        enum:['Male','Female']
    }
},{
    timestamps:true
})
const userModel = mongoose.model('User',userSchema)
export default userModel
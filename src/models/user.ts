// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     email:{type:String,required:true,unique:true},
//     password:{type:String,required:true},
// },{timestamps:true});

// export const User = mongoose.model('user',userSchema);

import mongoose, {Schema,model,models} from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = new mongoose.Schema({
    email:{type:'string',unique:true,required:true},
    password:{type:'string',required:true},
},{timestamps:true});

export const User  = models.User || model('User',userSchema);


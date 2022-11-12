import mongoose,{ Schema } from "mongoose";

const userSchema = new Schema({
    _id: String,
    name: String,
    email: String,
    role: String,
    password: String
});

const userModel = mongoose.model('users', userSchema );

export default userModel;
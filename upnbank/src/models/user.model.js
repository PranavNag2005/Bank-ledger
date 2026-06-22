import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
      
    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 150,
       

    }},
    {
        timestamps: true
    },
);

const userModel=mongoose.model('User', userSchema);
export default userModel;
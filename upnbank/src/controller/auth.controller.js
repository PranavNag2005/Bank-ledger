import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {sendRegistrationEmail} from '../utils/email.js'

async function generateRefreshToken(user) {
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    return refreshToken;
}
export const registerUser = async (req, res) => {

    const { name, email, password } = req.body;
    console.log(email, name, password)
    try {
        if (!email || !name || !password) {
            return res
                .status(400)
                .json({ message: "Please provide all required fields" });
        }
        // Check if user already exists
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: "Password does not meet complexity requirements" });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json(
                { message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)
        const newUser = await userModel.create({ email: email, name: name, password: hashedPassword });
        await sendRegistrationEmail(newUser.email,newUser.name)
        const refreshToken = await generateRefreshToken(newUser);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
        });
        const accessToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "15m",
        });
        return res.status(201).json({
            message: "User registered successfully",
            user: newUser,
            accessToken,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error", error: err.message,
            stack: err.stack
        });
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    // get refresh token from cookies
    
    try {
       
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const refreshToken = await generateRefreshToken(user);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: true
        })
        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "15m"
        });
        return res.status(200).json({
            message: "User logged in successfully",
            accessToken,
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error", error: err.message,
            stack: err.stack
        });
    }
}


export const logoutUser = async(req,res)=>{
    try{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(400).json({message:"No refresh token found"});
        }
        res.clearCookie("refreshToken");
        return res.status(200).json({message:"User logged out successfully"});
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error", error: err.message,
            stack: err.stack
        });
    }
}


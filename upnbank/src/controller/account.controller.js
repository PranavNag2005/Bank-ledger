import accountModel from '../models/account.model.js'
import jwt from "jsonwebtoken";
const types = ['active', 'in-active', 'frozen']

export const createAccount = async (req, res) => {
    console.log(req.body)
    console.log("going to try and catch")
    try {
        console.log("Inside the try and catch block")
        let { status, currency } = req.body;
        console.log("got the status")
        status = status.toLowerCase();
        console.log(status, currency)
        if (!status && !currency) {
            return res.status(400).json({ message: "no status,currency found" })
        }
        if (!(types.includes(status))) {
            return res.status(400).json({ message: "Invalid status for creating account", validTypes: types })

        }
        const user = req.user;
        console.log(user)

        if (!user) {
            return res.status(400).json({ messge: "User not found" })
        }

        const userId = user.id;

        //checking the account already exists for the user

        const isExisting= await accountModel.find({user:userId})
        if(isExisting){
            return res.status(409).json({message:"Account already exists for the user",account:isExisting})
        }

        const newAccount = await accountModel.create({ user: userId, status: status, currency: currency })
        if (!newAccount) {
            return res.status(400).json({ message: "Error while creating account" })
        }
        return res.status(201).json({ message: "Account created successfully", account: newAccount })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err })
    }


}
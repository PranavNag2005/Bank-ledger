import mongoose, { Mongoose } from "mongoose";
import userModel from "./user.model.js";

const accountSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: [true, "account should be tagged with phonenumber"]
        },
        status: {
            type: String,
            enum: ['active', 'in-active', 'frozen'],
            required: true,
            default: 'active'
        },
        currency: {
            type: String,
            required: [true, "Creation involves depositing money"],
            default: '0 INR'
        }

    },
    {
        timestamps: true
    }
)

accountSchema.index({user:1,status:1})

export const accountModel = mongoose.model('account', accountSchema)

export default accountModel;
import mongoose from "mongoose";

const transactionSchema= new mongoose.Schema({
    fromAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'account',
        required:true,
        index:true

    },
    toAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'account',
        required:true,
        index:true

    },
    status:{
        type:String,
        default:"PENDING",
        required:true,
        index:true,
        enum:{
            values:['PENDING','COMPLETED','FAILED','REVERSED'],
            message:"Status can be either 'PENDING','COMPLETED','FAILED','REVERSED'"
        }

    },
    amount:{
        type:String,
        required:true,
        min:0

    },
    idempotency:{
        required:true,
        unique:true,
        index:true,
        type:String
    }
},{
    timestamps:true
})


export const transactionalModel= mongoose.model('transactions',transactionSchema)
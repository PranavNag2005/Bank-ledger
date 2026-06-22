import mongoose from "mongoose";

const ledgerSchema= new mongoose.Schema({
    account:{
        type:mongoose.Schema.Types.ObjectId,
        index:true,
        requried:true,
        ref:'account',
        immutable:true
    },
    amount:{
        type:Number,
        required:true,
        immutable:true,

    },
    type:{
        type:String,
        enum:{
            value:['CREDIT','DEBIT']
        },
        required:true,
        immutable:true
    }
})

function preventLedgerModification(){
    throw  new Error("ledger entries are immutable and cannot be modified or deleted")
}


// middleware hooks 

ledgerSchema.pre('findOneAndUpdate',preventLedgerModification)
ledgerSchema.pre('updateOne',preventLedgerModification)
ledgerSchema.pre('deleteOne',preventLedgerModification)
ledgerSchema.pre('remove',preventLedgerModification)
ledgerSchema.pre('deleteMany',preventLedgerModification)
ledgerSchema.pre('updateMany',preventLedgerModification)
ledgerSchema.pre('findOneAndDelete',preventLedgerModification)
ledgerSchema.pre('findOneAndReplace',preventLedgerModification)
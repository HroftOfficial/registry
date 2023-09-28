import { Schema, model } from "mongoose";


const TransactionSchema = new Schema(
  {
    trancheId:{
        type: String,
        required: true,
    },   
    repay:{
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      required: true,
      },
    real: {
      type: Boolean,
      default: false,
    },
    plannedRepay:{
      type:Number,
      default: 0,
    }, 
    info: [String],
  },
  { timestamps: true }
);


export const transactionModel = model("transactions", TransactionSchema);

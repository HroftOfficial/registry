import { Schema, model } from "mongoose";

const TrancheSchema = new Schema(
  {
    org: {
      name: {
        type: String,
        required: true,
      },
      _id: {
        type: String,
        required: true,
      },
    },
    creditForm: {
      name: {
        type: String,
        required: true,
      },
      _id: {
        type: String,
        required: true,
      },
    },
    debt: {
      type: Number,
      required: true,
    },
    trancheDay: {
      type: Number,
      default: 90,
    },
    balance: {
      type: Number,
      required: true,
    },
	returnTranche:{
		type: Date,
	},
	date: {
		type: Date,
		required: true,
	  },
  },
  { timestamps: true }
);


export const trancheModel = model("tranches", TrancheSchema);

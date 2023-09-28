import { Schema, model } from 'mongoose';

const CreditFormSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true }
);

export const creditFormModel = model('credit-forms', CreditFormSchema);

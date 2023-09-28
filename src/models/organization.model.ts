import { Schema, model } from 'mongoose';

const OrganizationSchema = new Schema({
  name:{
    type: String,
    required: true,
    unique: true,
  },
  limit:{
    type: Number,
    required: true,
  }
},
{ timestamps: true });

export const organizationModel = model('organizations', OrganizationSchema);
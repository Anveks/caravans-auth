import * as mongoose from 'mongoose';

export const CredentialsSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // regEx validation 
  },
  password: { 
    type: String, 
    required: true,
  },
});

export interface Credentials extends mongoose.Document { 
  email: string,
  password: string
} 
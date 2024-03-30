// class User {
//   - id: ObjectId
//   - name: String
//   - password: String
//   - email: String
//   - address: String
//   - type: UserType
// }

import * as mongoose from 'mongoose';
import { UserType } from '../enums/user_type.enum';

// a custom validation function for password format
function validatePassword(password: string): boolean {
  // regEx for password validation (at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

export const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // regEx validation 
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6,
    validation: [validatePassword, 'Invalid password.'] // custom password validation + err message if invalid
  },
  address: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    enum: UserType,
    required: true, 
    default: UserType.USER // default type is always a regular user
   }
});

export interface User extends mongoose.Document { // interface inherits and has all the mongoose features
  _id: string,
  name: string,
  email: string,
  password: string,
  address: string,
  type: UserType
} 
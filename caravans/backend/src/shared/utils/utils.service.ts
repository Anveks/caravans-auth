import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';
import { Model } from "mongoose";
import { User } from "src/users/users.model";
import { ServerError, ValidationError } from "../models/error.models";

@Injectable()
export class UtilsService {

  constructor(@InjectModel("User") private readonly userModel: Model<User>){}

  // PASSWORDS:
  async hashPassword(password: string): Promise<string> {
    try {
      if (!password) throw new ValidationError(null, "Password is required.")
      const hashedPassword = await bcrypt.hash(password, 10);      
      return hashedPassword;
    } catch (err: any) {
      throw new ServerError(500, err.message);
    }
  };

  async validatePassword(password: string, user: User): Promise<boolean> {
    console.log('validate password reached');
    
    try {
      if (!password) throw new ValidationError(null, "Password is required.")
      const validPassword = await bcrypt.compare(
        password,
        user.password
      );    

      return validPassword;
    } catch(err: any) {
      throw new ServerError(500, err.message);
    }
  };

  // EMAILS:
  async emailIsTaken(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({email: email}).exec();    
    return user !== null; // returns true if user exists (email is taken), false otherwise
  };  

  // TOKENS:
  // add token logic here later
}
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import mongoose, { Model } from "mongoose";
import { UserType } from "src/shared/enums/user_type.enum";
import { User } from "src/users/users.model";

@Injectable()
export class UtilsService {

  constructor(@InjectModel("User") private readonly userModel: Model<User>){}

  // PASSWORDS:
  async hashPassword(password: string): Promise<string> {
    try {
      if (!password) throw new BadRequestException("Password is required.");
      const hashedPassword = await bcrypt.hash(password, 10);      
      return hashedPassword;
    } catch (err: any) {
      throw new Error('Error hashing password: ' + err.message);
    }
  };

  async validatePassword(password: string, user: User): Promise<boolean> {
    try {
      if (!password) throw new BadRequestException("Password is required.");
      const validPassword = await bcrypt.compare(
        password,
        user.password
      );    

      return validPassword;
    } catch(err: any) {
      throw new Error('Error validating password: ' + err.message);
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
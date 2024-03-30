import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import mongoose, { Model } from "mongoose";
import { UserType } from "src/shared/enums/user_type.enum";
import { UtilsService } from "src/shared/utils/utils.service";
import { User } from "src/users/users.model";

@Injectable()
export class AuthService {

  private SECRET_KEY: string = 'secret';

  constructor(@InjectModel("User") private readonly userModel: Model<User>, 
              private readonly utilsService: UtilsService
              ){}

  async register(name: string, email: string, password: string, address: string): Promise<User> {
    try {
      
      const emalIsTaken = await this.utilsService.emailIsTaken(email);      
      if (emalIsTaken) throw new BadRequestException("Email is already taken");
      
      const hashedPassword = await this.utilsService.hashPassword(password);

      const newUser = new this.userModel({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        email: email,
        password: password,
        address: address,
        type: UserType.USER
      });

      newUser.password = hashedPassword;
      
      const result = await newUser.save();
      return result;

    } catch(err: any) {
      if (err instanceof BadRequestException) throw err; // Re-throw BadRequestException
      throw new InternalServerErrorException(err.message);
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      console.log(user);
      
      if (!user) {
        throw new NotFoundException("User does not exist.");
      }
      
      const passwordIsValid = await this.utilsService.validatePassword(password, user);
      if (!passwordIsValid) {
        throw new BadRequestException("Invalid password.");
      }
  
      // If the password is valid, generate a JWT token and return it
      const token = jwt.sign({
        user: {
          _id: user._id,
          email: user.email,
          password: user.password,
          type: user.type,
        }
      }, this.SECRET_KEY, { expiresIn: "1h" });
  
      return token;
  
    } catch (err) {
      if (err instanceof BadRequestException) throw err; // Re-throw BadRequestException
      throw new InternalServerErrorException("Error while logging in.");
    }
  }

  async logout() {
    return { "success": true, "message": "Logout successful" }
  }
  
}

// todo:
// 1. outsource token + validations into utils file
// 2. create custom validationModel
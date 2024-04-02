import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as jwt from 'jsonwebtoken';
import mongoose, { Model } from "mongoose";
import { UserType } from "src/shared/enums/user_type.enum";
import { ResourceNotFoundError, ValidationError } from "src/shared/models/error.models";
import { UtilsService } from "src/shared/utils/utils.service";
import { User } from "src/users/users.model";

@Injectable()
export class AuthService {

  private SECRET_KEY: string = 'secret';

  constructor(@InjectModel("User") private readonly userModel: Model<User>, 
              private readonly utilsService: UtilsService
              ){}

  async register(name: string, email: string, password: string, address: string): Promise<User> {
    const emalIsTaken = await this.utilsService.emailIsTaken(email);  

    if (emalIsTaken) throw new ValidationError(email);
    
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
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userModel.findOne({ email }).exec();
    console.log(user);
    
    if (user === null) {
      console.log('user not found trigger here');
      console.log(user);
      // throw new HttpException({ status: HttpStatus.NOT_FOUND, error: 'Invalid credentials' }, HttpStatus.NOT_FOUND);
      throw new ResourceNotFoundError(email);
    }
    
    const passwordIsValid = await this.utilsService.validatePassword(password, user);
    if (!passwordIsValid) {
      throw new ValidationError(null, "Invalid password.");
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
  }

  async logout() {
    return { "success": true, "message": "Logout successful" }
  }
  
}

// todo:
// 1. outsource token + validations into utils file
// 2. create custom validationModel
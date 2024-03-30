import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./users.model";
import { UtilsService } from "src/shared/utils/utils.service";

@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private readonly userModel: Model<User>, 
              private readonly utilsService: UtilsService
              ){} // injecting the Schema  

  // get all
  async getAllUsers(){
    let users: User[] = [];
    try {
      users = await this.userModel.find();
      return users;
    } catch (err: any) {
      if (users.length === 0) throw new InternalServerErrorException("Error while fetching the users."); // if no users found - throw a server err
    }
  };

  async getCurrentUser(id: string): Promise<User> {
    let currentUser: User;
    try {     
      currentUser = await this.userModel.findById(id).exec();
      console.log(currentUser);
      return currentUser;
    } catch (err: any) {
      if (!currentUser) throw new InternalServerErrorException("Error while fetching the user data.");
    }
  }

  async updatePassword(id: string, password: string) : Promise<any> {
    try {    
      // TODO: add check if the new password is the same as old
      const newHashedPassword = await this.utilsService.hashPassword(password);      
      await this.userModel.updateOne({ _id: id }, { $set: { password: newHashedPassword } });
      return { "success": true, "message": "Password update successful" }
    } catch (err: any) {
      throw new InternalServerErrorException("Error while updating the password.");
    }
  }
}
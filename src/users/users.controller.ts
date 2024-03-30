import { Body, Controller, Get, InternalServerErrorException, Put, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./users.model";
import { UserDecorator } from "./user.decorator";

@Controller('/users')
export class UsersController {
  constructor (private readonly usersService: UsersService) {}

  @Get()
  async getUsers(@UserDecorator() user): Promise<User[]> {
    try {
      if (user.type !== "admin") throw new UnauthorizedException("Not authorized.")
      const result = await this.usersService.getAllUsers(); // getting all users
      return result;
    } catch(err: any) {
      throw new InternalServerErrorException(err.message); // rethrow error message if occurs
    }
  }

  @Get("/profile")
  async getProfile(@UserDecorator() user): Promise<User> {
    try {     
      const result = await this.usersService.getCurrentUser(user._id);
      return result;
    } catch (err: any) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Put("/profile")
  async updatePassword(
    @UserDecorator() user,
    @Body("password") password: string
  ): Promise<any> {
    try {
      const result = await this.usersService.updatePassword(user._id, password);
      return result;
    } catch (err: any) {
      throw new InternalServerErrorException(err.message);
    }
  }
};
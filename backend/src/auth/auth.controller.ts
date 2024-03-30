import { Body, Controller, InternalServerErrorException, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "src/users/users.service";

@Controller('/auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

//   - id: ObjectId
//   - name: String
//   - password: String
//   - email: String
//   - address: String
//   - type: UserType

  @Post("/register")
  async register(
    // id is auto generated
    @Body("name") name: string,
    @Body("email") email: string,
    @Body("password") password: string,
    @Body("address") address: string,
    // type is assigned in the service
  ) {
    try {
      const result = await this.authService.register(name, email, password, address);
      console.log(result);
      return result;
    } catch(err: any) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Post("/login")
  async login(
    @Body("email") email: string,
    @Body("password") password: string
  ): Promise<string> {
    try {     
      const result = await this.authService.login(email, password);
      return result;
    } catch(err: any) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Post("/logout")
  async logout() {
    try {
      const res = await this.authService.logout();
      return res;
    } catch(err: any) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
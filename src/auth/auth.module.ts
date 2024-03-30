import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/users/users.model";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UtilsService } from "src/shared/utils/utils.service";

@Module({
  imports: [
    MongooseModule.forFeature([{
    name: 'User',
    schema: UserSchema
  },
  // {
  //   name: "Credentials",
  //   schema: CredentialsSchema
  // }
])
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    UtilsService
  ]
}) export class AuthModule {}
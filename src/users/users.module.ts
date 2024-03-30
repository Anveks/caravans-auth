import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./users.model";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UtilsService } from "src/shared/utils/utils.service";

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'User',
      schema: UserSchema // importing the UserSchema that we inject in service
    }])
  ],
  controllers: [
    UsersController
  ],
  providers: [
    UsersService,
    UtilsService
  ]
}) export class UsersModule {}
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/users/users.model";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UtilsService } from "src/shared/utils/utils.service";
import { APP_FILTER } from "@nestjs/core";
import { AllExceptionsFilter } from "src/shared/middleware/all-exceptions.filter";

@Module({
  imports: [
    MongooseModule.forFeature([{
    name: 'User',
    schema: UserSchema
  }
])
  ],
  controllers: [
    AuthController
  ],
  providers: [ // providing the all exceptions filter for the AuthService; when exception is thrown the exceptionFilter catches and handles it 
    UtilsService,
    AuthService, 
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
}) export class AuthModule {}
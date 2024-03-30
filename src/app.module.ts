import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './shared/middleware/check-auth.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/caravans'),
    // ConfigModule.forRoot({
    //   envFilePath: 'src\keys.env',
    // }),
    AuthModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware) // register the middleware
    .forRoutes( // define the routes
      { path: "/users", method: RequestMethod.GET },
      { path: "/auth/logout", method: RequestMethod.POST },
      { path: "/users/profile", method: RequestMethod.GET },
      { path: "/users/profile", method: RequestMethod.PUT },
    )
  }
  
}

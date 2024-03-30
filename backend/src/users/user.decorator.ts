
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// custom decorator for extracting the data from request
export const UserDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // console.log(request.user);
    return request.user.user;
  },
);
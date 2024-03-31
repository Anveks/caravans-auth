import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  let token: string = "";
  let modifiedRequest = req;

  authService.token.subscribe((token) => {
    if (token) token = token;
  });

  if (token) {
    modifiedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  };

  return next(modifiedRequest);
};


// if (!token) return next(req);

// console.log('AUTH SERVICE TOKEN');
// console.log(token);
// modifiedRequest = req.clone({
//   setHeaders: {
//     Authorization: `Bearer ${token}`
//   }
// });

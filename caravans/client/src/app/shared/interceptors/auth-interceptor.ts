import { HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { take, exhaustMap } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next): any => {
  console.log('interceptor reached');

  const authService = inject(AuthService);

  return authService.token.pipe(
    take(1),
    exhaustMap((token) => {
      console.log('TOKEN', token);

      if (!token) return next(req);

      const modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('MODIFIED');
      console.log(modifiedReq.headers);
      return next(modifiedReq);
    })
  )
};


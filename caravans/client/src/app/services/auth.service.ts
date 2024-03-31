import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap } from "rxjs";
import { UserModel } from "../models/user.model";
import { ErrorModel } from "../models/error.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

@Injectable()
export class AuthService {

  token = new BehaviorSubject<string>("");
  user = new BehaviorSubject<UserModel | null>(null);
  error = new BehaviorSubject<ErrorModel | null>(null);

  constructor(private http: HttpClient){}


  login(email: string, password: string) {
    const userData = {
      email: email,
      password: password
    };

    return this.http.post<any>("http://localhost:3000/auth/login", userData)
      .pipe(
        tap((resData: any) => {
          // handle successful login here
          this.token.next(resData.token);
          console.log("login successful:", resData);
        }),
        catchError(this.handleError)
      );
  }

  register(email: string, password: string, name: string, address: string) {
    const newUser = {
      email: email,
      password: password,
      name: name,
      address: address
    };

    return this.http.post<any>("http://localhost:3000/auth/register", newUser)
      .pipe(
        tap((resData: any) => {
          // handle registration response
          this.token.next(resData.token);
          console.log("registration successful:", resData);
        }),
        catchError(this.handleError)
      )
  }

  logout() {
    return this.http.post("http://localhost:3000/auth/logout", {}).pipe(
      catchError(this.handleError),
    )
  }

  private handleError(errorRes: HttpErrorResponse) {
    // console.log(errorRes);
    return throwError(errorRes); // return an observable to satisfy the catchError operator
  }

  handleAuth(userData: any) {
    console.log(userData);
  }

}

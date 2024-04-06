import { HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthService } from './services/auth.service';
import { httpInterceptor } from "./shared/interceptors/auth-interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpInterceptor])),
    // HttpClient,
    importProvidersFrom(HttpClientModule),
    AuthService,
  ],
};

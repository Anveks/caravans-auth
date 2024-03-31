import { Routes } from '@angular/router';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/placeholder', pathMatch: 'full' },
  { path: 'placeholder', component: PlaceholderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

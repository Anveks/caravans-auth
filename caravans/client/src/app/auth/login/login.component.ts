import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoadingSpinnerComponent } from "../../shared/loaders/spinner.component";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [
        CommonModule,
        RouterLink,
        LoadingSpinnerComponent,
        FormsModule,
    ]
})
export class LoginComponent {

  isLoading: boolean = false;
  error: any = null;
  email: string = "";
  password: string = "";

  constructor(private authService: AuthService,
              private router: Router
              ) {}

  onSubmit(form: NgForm){
    this.isLoading = !this.isLoading;
    if (!form.valid) return;

    const {email, password} = form.value;
    this.authService.login(email, password).subscribe(
      (resData: any) => {
        this.isLoading = !this.isLoading;
        this.router.navigate(['/placeholder'])
      },
      (error: any) => {
        this.error = error.error.message;
        this.isLoading = !this.isLoading;
      }
    );

    form.reset();
  }

}

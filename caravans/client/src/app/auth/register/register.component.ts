import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoadingSpinnerComponent } from "../../shared/loaders/spinner.component";
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    imports: [
        CommonModule,
        RouterLink,
        FormsModule,
        LoadingSpinnerComponent
    ]
})
export class RegisterComponent {

  isLoading: boolean = false;
  error = null;
  email: string = ""
  password: string = "";
  name: string = "";
  address: string = "";

  constructor(private authService: AuthService,
              private router: Router){}

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    const { email, password, name, address } = form.value;
    this.authService.register(email, password, name, address)
    .subscribe(
       (resData: any) => {
         this.isLoading = !this.isLoading;
         this.router.navigate(['/placeholder'])
       },
       (error: any) => {
         this.error = error.error.message;
         this.isLoading = !this.isLoading;
       }
    );
  }

}

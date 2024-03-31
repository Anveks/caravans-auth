import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  imports: [],
  templateUrl: './placeholder.component.html',
  styleUrl: './placeholder.component.css'
})
export class PlaceholderComponent {
  constructor(private authService: AuthService,
              private router: Router) {}

  logout() {
    this.authService.logout().subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/login']);
      },
      (err) => {
        console.log(err);
      });
  }
}

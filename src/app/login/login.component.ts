// src/app/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login = '';
  pwd = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) { }

  /**
   * Gère la tentative de connexion de l'utilisateur.
   */
  onSubmit() {
    this.authService.login(this.login, this.pwd).subscribe(success => {
      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'Login ou mot de passe incorrect';
      }
    });
  }
}

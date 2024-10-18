import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  passwordVisible: boolean = false; 

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible; 
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.http
        .post('http://127.0.0.1:5000/api/login', this.loginForm.value)
        .subscribe(
          (response: any) => {
            console.log('Login successful', response);
            if (response.token) {
              localStorage.setItem('token', response.token); 
            }
            this.router.navigate(['/dashboard']);
          },
          (error) => {
            console.error('Login failed', error);
          }
        );
    } else {
      console.log('Form is not valid');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}

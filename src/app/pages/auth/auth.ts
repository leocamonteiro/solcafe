import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule ],
  templateUrl: './auth.html',
  styleUrl: './auth.scss'
})
export class Auth {
  loginForm: FormGroup;
  signupForm: FormGroup;
  

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });

    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
      ]],
      role: ['client']
    });

  }

  onLogin() {
    this.auth.login(this.loginForm.value).subscribe({
      next: res => {
        this.auth.saveToken(res.token);
        this.snackBar.open("Bem vindo!", "FECHAR", {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/']);
      },
      error: err => alert('Login inválido')
    });
  }

  onSignup() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.auth.signup(this.signupForm.value).subscribe({
      next: res => {
        alert('Cadastro realizado com sucesso!');
        this.signupForm.reset();
      },
      error: err => alert('Erro ao cadastrar usuário')
    });
  }
}
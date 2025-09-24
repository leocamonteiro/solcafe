import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule ],
  templateUrl: './auth.html',
  styleUrl: './auth.scss'
})
export class Auth {
  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onSubmit() {
    this.auth.login(this.form.value).subscribe({
      next: res => {
        this.auth.saveToken(res.token);
        this.router.navigate(['/user-panel']);
      },
      error: err => alert('Login inválido')
    });
  }
}


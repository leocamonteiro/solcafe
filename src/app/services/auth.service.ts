import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroment';
import { User } from '../models/users';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  apiUrl: string = environment.apiUrl;
  users: User[] = []
  private _isAuthenticated = signal(this.hasToken()); 

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}login`, credentials);
  }

  saveToken(token: string) {
    localStorage.setItem('jwt', token);
    this._isAuthenticated.set(true); 
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  logout() {
    localStorage.removeItem('jwt');
    this._isAuthenticated.set(false); // ✅ atualiza o sinal
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('jwt');
  }

  isAuthenticated = this._isAuthenticated.asReadonly();

  getUsers(): Observable<User[]> {
    const token = this.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<User[]>(`${this.apiUrl}users`, { headers });
  }

  signup(userData: { username: string; email: string; password: string; role: string }) {
    const token = this.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post(`${this.apiUrl}users`, userData, { headers });
  }

// Implementação para pegar o papel do usuário

private getUserRole(): string | null {
  const token = this.getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || null;
  } catch (e) {
    console.error('Erro ao decodificar o token:', e);
    return null;
  }
}

isAdmin(): boolean {
  return this.getUserRole() === 'admin';
}

}
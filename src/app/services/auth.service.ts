import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  apiUrl: string = environment.apiUrl;
  private _isAuthenticated = signal(this.hasToken()); // ✅ sinal reativo

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}login`, credentials);
  }

  saveToken(token: string) {
    localStorage.setItem('jwt', token);
    this._isAuthenticated.set(true); // ✅ atualiza o sinal
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

  isAuthenticated = this._isAuthenticated.asReadonly(); // ✅ expõe como readonly

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
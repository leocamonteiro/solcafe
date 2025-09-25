import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coffee } from '../models/models';
import { Observable } from 'rxjs';
import { environment } from '../../enviroment';
import { AuthService } from './auth.service'; // Importa o AuthService

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService // Injeta o AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Usa o AuthService para obter o token
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getProducts(): Observable<Array<Coffee>> {
    return this.httpClient.get<Array<Coffee>>(`${this.apiUrl}products`);
  }

  addNewProduct(product: Coffee): Observable<Coffee> {
    return this.httpClient.post<Coffee>(
      `${this.apiUrl}products`,
      product,
      { headers: this.getAuthHeaders() }
    );
  }

  editProduct(product: Coffee): Observable<Coffee> {
    return this.httpClient.put<Coffee>(
      `${this.apiUrl}products/${product.id}`,
      product,
      { headers: this.getAuthHeaders() } // ✅ Usa o token do AuthService
    );
  }

  removeProduct(productId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.apiUrl}products/${productId}`,
      { headers: this.getAuthHeaders() }
    );
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coffee } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl: string = 'https://solcafe-api.onrender.com/'
  // apiUrl: string = 'http://localhost:3000/'
  
  constructor (
    private httpClient: HttpClient
  ){}
  
  getProducts(): Observable<Array<Coffee>>{
    return this.httpClient.get<Array<Coffee>>(`${this.apiUrl}products`)
  }

}

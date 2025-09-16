import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coffee } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl: string = 'https://solcafe-api.onrender.com/'
  
  constructor (
    private httpClient: HttpClient
  ){}
  
  getProducts(): Observable<Array<Coffee>>{
    return this.httpClient.get<Array<Coffee>>(`${this.apiUrl}products`)
  }

}

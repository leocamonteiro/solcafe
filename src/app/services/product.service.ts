import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coffee } from '../models/models';
import { Observable } from 'rxjs';
import { environment } from '../../enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl: string = environment.apiUrl
  
  constructor (
    private httpClient: HttpClient
  ){}
  
  getProducts(): Observable<Array<Coffee>>{
    return this.httpClient.get<Array<Coffee>>(`${this.apiUrl}products`)
  }

}

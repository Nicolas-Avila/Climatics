import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  // private apiUrl = 'http://localhost:3000/api'; // 👈 Ajustá si hace falta
  private apiUrl = 'http://192.168.1.47:3000/api';

  constructor(private http: HttpClient) {}

  getRecommendation(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ropa`);
  }
}

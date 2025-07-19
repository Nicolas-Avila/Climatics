import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  // private apiUrl = 'http://localhost:3000/api';
  private apiUrl = 'http://192.168.1.47:3000/api';
  constructor(private http: HttpClient) {}

  getTemperature(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/clima`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://localhost:44340/api';

  constructor(private _http: HttpClient) { }

  registerUser(model: any) {
    return this._http.post<any>(`${this.baseUrl}/auth/register`, 
      {
        firstName: model.firstName,
        lastName: model.lastName,
        email: model.email,
        password: model.password
      })
  }

  loginUser(model: any) {
    return this._http.post<any>(`${this.baseUrl}/auth/login`, 
    {
      email: model.email,
      password: model.password
    })
  }
}

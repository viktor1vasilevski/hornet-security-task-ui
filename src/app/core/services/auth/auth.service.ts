import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterModel } from '../../models/auth/register.model';
import { LoginModel } from '../../models/auth/login.model';
import { BaseResponse } from '../../models/responses/base-response.model';
import { ApiResponse } from '../../models/responses/api-response.model';
import { TokenResponse } from '../../models/responses/token-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://localhost:44340/api';

  constructor(private _http: HttpClient) { }

  registerUser(model: RegisterModel) {
    return this._http.post<BaseResponse>(`${this.baseUrl}/auth/register`, 
      {
        firstName: model.firstName,
        lastName: model.lastName,
        email: model.email,
        password: model.password
      })
  }

  loginUser(model: LoginModel) {
    return this._http.post<ApiResponse<TokenResponse>>(`${this.baseUrl}/auth/login`, 
    {
      email: model.email,
      password: model.password
    })
  }
}

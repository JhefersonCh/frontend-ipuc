import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Login, LoginResponse } from '../interfaces/login.interface';
import { environment } from '../../../environments/environment.development';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient: HttpClient = inject(HttpClient);
  constructor() {}

  login(data: Login): Observable<LoginResponse> {
    return this._httpClient
      .post<LoginResponse>(`${environment.apiUrl}auth/login`, data)
      .pipe(
        tap((response) => {
          localStorage.setItem('session', JSON.stringify(response));
        })
      );
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../shared/interfaces/user.interface';
import { ApiResponseInterface } from '../../shared/interfaces/api-response.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private readonly _httpClient: HttpClient = inject(HttpClient);
  constructor() {}

  getUserProfile(id: string): Observable<ApiResponseInterface<User>> {
    return this._httpClient.get<ApiResponseInterface<User>>(
      `${environment.apiUrl}user/${id}`
    );
  }

  updateUserProfile(id: string, body: unknown): Observable<void> {
    return this._httpClient.patch<void>(
      `${environment.apiUrl}user/${id}`,
      body
    );
  }
}

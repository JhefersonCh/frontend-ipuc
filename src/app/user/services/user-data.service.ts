import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../shared/interfaces/user.interface';
import { ApiResponseInterface } from '../../shared/interfaces/api-response.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { PasswordInterface } from '../../auth/interfaces/passwords';
import {
  ChangePassword,
  StatisticsInterface,
} from '../interface/profile.interface';

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

  updateUserPassword(
    changePasswordPayload: ChangePassword
  ): Observable<ApiResponseInterface<ChangePassword>> {
    return this._httpClient.post<ApiResponseInterface<ChangePassword>>(
      `${environment.apiUrl}user/change-password`,
      changePasswordPayload
    );
  }

  getStatistics(): Observable<ApiResponseInterface<StatisticsInterface>> {
    return this._httpClient.get<ApiResponseInterface<StatisticsInterface>>(
      `${environment.apiUrl}profile/statistics`
    );
  }
}

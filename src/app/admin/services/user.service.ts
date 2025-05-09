import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HttpUtilitiesService } from '../../shared/utilities/http-utilities.service';
import { Observable } from 'rxjs';
import { User } from '../../shared/interfaces/user.interface';
import { PaginationInterface } from '../../shared/interfaces/pagination.interface';
import { environment } from '../../../environments/environment';
import {
  ApiResponseCreateInterface,
  ApiResponseInterface,
} from '../../shared/interfaces/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _httpUtilities: HttpUtilitiesService =
    inject(HttpUtilitiesService);

  usersPaginatedList(query: object): Observable<{
    data: User[];
    pagination: PaginationInterface;
  }> {
    const params = this._httpUtilities.httpParamsFromObject(query);
    return this._httpClient.get<{
      data: User[];
      pagination: PaginationInterface;
    }>(`${environment.apiUrl}manage-users/paginted-list`, { params });
  }

  userById(id: string): Observable<ApiResponseInterface<User>> {
    return this._httpClient.get<ApiResponseInterface<User>>(
      `${environment.apiUrl}manage-users/${id}`
    );
  }

  createUser(body: User): Observable<ApiResponseCreateInterface> {
    return this._httpClient.post<ApiResponseCreateInterface>(
      `${environment.apiUrl}manage-users`,
      body
    );
  }

  updateUser(body: User): Observable<any> {
    return this._httpClient.patch<any>(
      `${environment.apiUrl}manage-users/${body.id}`,
      body
    );
  }

  deleteUser(id: string): Observable<any> {
    return this._httpClient.delete<any>(
      `${environment.apiUrl}manage-users/${id}`
    );
  }
}

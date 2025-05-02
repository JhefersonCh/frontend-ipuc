import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Activity } from '../interfaces/activity.interface';
import { ApiResponseInterface } from '../../shared/interfaces/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class PanelService {
  private readonly _httpClient: HttpClient = inject(HttpClient);

  getActivities(): Observable<ApiResponseInterface<Activity[]>> {
    return this._httpClient.get<ApiResponseInterface<Activity[]>>(
      `${environment.apiUrl}panel/activities`
    );
  }

  addActivity(body: Activity) {
    return this._httpClient.post(
      `${environment.apiUrl}panel/activity/create`,
      body
    );
  }

  updateActivity(body: Activity) {
    return this._httpClient.patch(
      `${environment.apiUrl}panel/activity/update`,
      body
    );
  }

  deleteActivity(id: string) {
    return this._httpClient.delete(
      `${environment.apiUrl}panel/activity/delete/${id}`
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Activity } from '../interfaces/activity.interface';
import { ApiResponseInterface } from '../../shared/interfaces/api-response.interface';
import { HomeForm } from '../interfaces/home.interface';
import { AboutForm, GeneralForm } from '../interfaces/about.interface';

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

  getHome() {
    return this._httpClient.get<ApiResponseInterface<HomeForm>>(
      `${environment.apiUrl}panel/home`
    );
  }

  updateHome(body: HomeForm) {
    return this._httpClient.patch(
      `${environment.apiUrl}panel/home/update`,
      body
    );
  }

  getAbout() {
    return this._httpClient.get<ApiResponseInterface<AboutForm>>(
      `${environment.apiUrl}panel/about`
    );
  }

  updateAbout(body: AboutForm) {
    return this._httpClient.patch(
      `${environment.apiUrl}panel/about/update`,
      body
    );
  }

  updateGeneral(body: GeneralForm) {
    return this._httpClient.patch(
      `${environment.apiUrl}panel/general-info/update`,
      body
    );
  }

  getGeneral() {
    return this._httpClient.get<ApiResponseInterface<GeneralForm>>(
      `${environment.apiUrl}panel/general-info`
    );
  }
}

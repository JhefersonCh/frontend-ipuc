import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UploadFileInterface } from '../interfaces/files.interface';
import { Observable } from 'rxjs';
import { ApiResponseInterface } from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private readonly _httpClient: HttpClient = inject(HttpClient);

  uploadFile(
    body: UploadFileInterface
  ): Observable<
    HttpEvent<ApiResponseInterface<{ publicId: string; url: string }>>
  > {
    const formData = new FormData();
    formData.append('file', body.file);
    if (body.fileName) {
      formData.append('fileName', body.fileName);
    }
    if (body.folder) {
      formData.append('folder', body.folder);
    }
    return this._httpClient.post<
      ApiResponseInterface<{ publicId: string; url: string }>
    >(`${environment.apiUrl}files`, formData, {
      reportProgress: true,
      observe: 'events',
      responseType: 'json',
    });
  }

  deleteFile(publicId: string) {
    return this._httpClient.post(`${environment.apiUrl}files/delete`, {
      publicId,
    });
  }
}

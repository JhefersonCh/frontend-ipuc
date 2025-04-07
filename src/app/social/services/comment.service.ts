import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ApiResponseCreateInterface,
  ApiResponseInterface,
} from '../../shared/interfaces/api-response.interface';
import { Observable } from 'rxjs';
import { Comment, CreateComment } from '../interfaces/comment.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly _httpClient: HttpClient = inject(HttpClient);
  constructor() {}

  getCommentsByPostId(
    postId: string
  ): Observable<ApiResponseInterface<Comment[]>> {
    return this._httpClient.get<ApiResponseInterface<Comment[]>>(
      `${environment.apiUrl}comment/${postId}`
    );
  }

  sendCreateComment(
    comment: CreateComment
  ): Observable<ApiResponseCreateInterface> {
    return this._httpClient.post<ApiResponseCreateInterface>(
      `${environment.apiUrl}comment`,
      comment
    );
  }

  createComment(comment: Comment): Observable<ApiResponseCreateInterface> {
    return this._httpClient.post<ApiResponseCreateInterface>(
      `${environment.apiUrl}comment`,
      comment
    );
  }

  updateComment({
    id,
    ...comment
  }: Comment): Observable<ApiResponseInterface<unknown>> {
    return this._httpClient.patch<ApiResponseInterface<unknown>>(
      `${environment.apiUrl}comment/${id}`,
      comment
    );
  }

  deleteComment(id: string): Observable<ApiResponseInterface<unknown>> {
    return this._httpClient.delete<ApiResponseInterface<unknown>>(
      `${environment.apiUrl}comment/${id}`
    );
  }
}

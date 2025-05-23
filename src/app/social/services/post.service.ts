import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ApiResponseCreateInterface,
  ApiResponseInterface,
} from '../../shared/interfaces/api-response.interface';
import { Post } from '../interfaces/forum.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly _httpClient: HttpClient = inject(HttpClient);
  constructor() {}

  getPosts(): Observable<ApiResponseInterface<Post[]>> {
    return this._httpClient.get<ApiResponseInterface<Post[]>>(
      `${environment.apiUrl}forum/posts`
    );
  }

  createPost(post: Post): Observable<ApiResponseCreateInterface> {
    return this._httpClient.post<ApiResponseCreateInterface>(
      `${environment.apiUrl}forum/post`,
      post
    );
  }

  updatePost({ id, ...post }: Post): Observable<ApiResponseInterface<unknown>> {
    return this._httpClient.patch<ApiResponseInterface<unknown>>(
      `${environment.apiUrl}forum/post/${id}`,
      post
    );
  }

  deletePost(id: string): Observable<ApiResponseInterface<unknown>> {
    return this._httpClient.delete<ApiResponseInterface<unknown>>(
      `${environment.apiUrl}forum/post/${id}`
    );
  }

  addLike(postId: string): Observable<ApiResponseInterface<unknown>> {
    return this._httpClient.post<ApiResponseInterface<unknown>>(
      `${environment.apiUrl}like`,
      { postId }
    );
  }

  removeLike(postId: string): Observable<ApiResponseInterface<unknown>> {
    return this._httpClient.delete<ApiResponseInterface<unknown>>(
      `${environment.apiUrl}like/${postId}`
    );
  }

  getPost(id: string): Observable<ApiResponseInterface<Post>> {
    return this._httpClient.get<ApiResponseInterface<Post>>(
      `${environment.apiUrl}forum/post/${id}`
    );
  }
}

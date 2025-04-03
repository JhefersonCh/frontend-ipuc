import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../interfaces/forum.interface';
import { ActivatedRoute } from '@angular/router';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
import { CapitalizePipe } from '../../../shared/pipes/capitalize.pipe';
import { TimePipe } from '../../../shared/pipes/time.pipe';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';
import { finalize } from 'rxjs';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-post-details',
  imports: [
    TruncatePipe,
    CapitalizePipe,
    TimePipe,
    BackButtonComponent,
    LoaderComponent,
  ],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
})
export class PostDetailsComponent implements OnInit {
  private readonly _postService: PostService = inject(PostService);
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  postId: string = '';
  post?: Post;
  loading: boolean = true;

  ngOnInit(): void {
    this.postId = this._route.snapshot.params['id'];
    this._getPost();
  }

  private _getPost(): void {
    this.loading = true;
    this._postService
      .getPost(this.postId)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.post = res.data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}

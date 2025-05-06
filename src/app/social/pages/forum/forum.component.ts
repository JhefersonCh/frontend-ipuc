import { Component, inject, OnInit } from '@angular/core';
import { CreateOrEditDiscussionComponent } from '../../components/create-or-edit-discussion/create-or-edit-discussion.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Post } from '../../interfaces/forum.interface';
import { DiscussionCardComponent } from '../../components/discussion-card/discussion-card.component';
import { PostService } from '../../services/post.service';
import { YesNoDialohComponent } from '../../../shared/components/yes-no-dialoh/yes-no-dialoh.component';
import { finalize } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../shared/interfaces/user.interface';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  imports: [MatButtonModule, DiscussionCardComponent, LoaderComponent],
  styleUrls: ['./forum.component.scss'],
  standalone: true,
})
export class ForumComponent implements OnInit {
  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly _postService: PostService = inject(PostService);
  private readonly _authService: AuthService = inject(AuthService);
  posts: Post[] = [];
  currentUser: User | null = null;
  loading: boolean = true;

  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Foro - IPUC sede cuarta, Mocoa, Putumayo');
    this._authService.currentUser$.pipe().subscribe((user) => {
      this.currentUser = user;
      this.getPosts();
    });
  }

  private getPosts(): void {
    this._postService
      .getPosts(this.currentUser?.id || '')
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          this.posts = res.data;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  private createPost(
    { id, ...post }: Post,
    dialogRef: MatDialogRef<CreateOrEditDiscussionComponent, any>
  ): void {
    this._postService
      .createPost(post)
      .pipe(finalize(() => dialogRef.componentInstance.setLoading(false)))
      .subscribe({
        next: () => {
          dialogRef.close();
          this.getPosts();
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  private updatePost(
    post: Post,
    dialogRef: MatDialogRef<CreateOrEditDiscussionComponent, any>
  ): void {
    this._postService
      .updatePost(post)
      .pipe(finalize(() => dialogRef.componentInstance.setLoading(false)))
      .subscribe({
        next: () => {
          dialogRef.close();
          this.getPosts();
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  private deletePost(
    id: string,
    dialogRef: MatDialogRef<YesNoDialohComponent, any>
  ): void {
    this._postService
      .deletePost(id)
      .pipe(finalize(() => dialogRef.componentInstance.setLoading(false)))
      .subscribe({
        next: () => {
          this.getPosts();
          dialogRef.close();
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  openCreateOrEditDiscussionDialog(post?: Post): void {
    const dialogRef: MatDialogRef<CreateOrEditDiscussionComponent, any> =
      this.dialog.open(CreateOrEditDiscussionComponent, {
        data: post,
      });

    dialogRef.componentInstance.saveEvent.subscribe((post) => {
      if (post && !post.id) {
        this.createPost(post, dialogRef);
      } else if (post && post.id) {
        this.updatePost(post, dialogRef);
      }
    });
  }

  openDeleteDialog(post: Post): void {
    const dialogRef: MatDialogRef<YesNoDialohComponent, any> = this.dialog.open(
      YesNoDialohComponent,
      {
        data: {
          title: 'Eliminar discusión',
          description: '¿Estás seguro de eliminar esta discusión?',
        },
      }
    );

    dialogRef.componentInstance.yesEvent.subscribe(() => {
      if (post?.id) {
        this.deletePost(post.id, dialogRef);
      }
    });
  }

  reloadPosts(): void {
    this.getPosts();
  }
}

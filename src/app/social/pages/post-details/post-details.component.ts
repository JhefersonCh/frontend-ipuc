import { CommentCardComponent } from './../../components/comment-card/comment-card.component';
import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../interfaces/forum.interface';
import { ActivatedRoute } from '@angular/router';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
import { CapitalizePipe } from '../../../shared/pipes/capitalize.pipe';
import { TimePipe } from '../../../shared/pipes/time.pipe';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';
import { finalize } from 'rxjs';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../interfaces/comment.interface';
import { User } from '../../../shared/interfaces/user.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { YesNoDialohComponent } from '../../../shared/components/yes-no-dialoh/yes-no-dialoh.component';
import { CreateOrEditCommentComponent } from '../../components/create-or-edit-comment/create-or-edit-comment.component';

@Component({
  selector: 'app-post-details',
  imports: [
    TruncatePipe,
    CapitalizePipe,
    TimePipe,
    BackButtonComponent,
    LoaderComponent,
    CommentCardComponent,
  ],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
})
export class PostDetailsComponent implements OnInit {
  private readonly _postService: PostService = inject(PostService);
  private readonly _commentService: CommentService = inject(CommentService);
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly dialog: MatDialog = inject(MatDialog);

  currentUser: User | null = null;
  postId: string = '';
  post?: Post;
  comments?: Comment[] = [];
  loading: boolean = true;

  ngOnInit(): void {
    this.postId = this._route.snapshot.paramMap.get('id') || '';
    this.getComments();
    this.getPost();
    this._authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  private getPost(): void {
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

  private getComments(): void {
    this.loading = true;

    this._commentService
      .getCommentsByPostId(this.postId)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          this.comments = res.data;
        },
        error: (err) => {
          console.error('Error al obtener comentarios', err);
        },
      });
  }

  private createComment(
    { id, ...comment }: Comment,
    dialogRef: MatDialogRef<CreateOrEditCommentComponent, any>
  ): void {
    this._commentService
      .createComment(comment)
      .pipe(finalize(() => dialogRef.componentInstance.setLoading(false)))
      .subscribe({
        next: () => {
          dialogRef.close();
          this.getComments();
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  private updateComment(
    comment: Comment,
    dialogRef: MatDialogRef<CreateOrEditCommentComponent, any>
  ): void {
    this._commentService
      .updateComment(comment)
      .pipe(finalize(() => dialogRef.componentInstance.setLoading(false)))
      .subscribe({
        next: () => {
          dialogRef.close();
          this.getComments();
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  private deleteComment(
    id: string,
    dialogRef: MatDialogRef<YesNoDialohComponent, any>
  ): void {
    this._commentService
      .deleteComment(id)
      .pipe(finalize(() => dialogRef.componentInstance.setLoading(false)))
      .subscribe({
        next: () => {
          this.getComments();
          dialogRef.close();
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  openCreateorEditCommentDialog(comment?: Comment): void {
    const dialogRef: MatDialogRef<CreateOrEditCommentComponent, any> =
      this.dialog.open(CreateOrEditCommentComponent, {
        data: comment,
      });

    dialogRef.componentInstance.saveEvent.subscribe((comment) => {
      if (comment && !comment.id) {
        this.createComment(comment, dialogRef);
      } else if (comment && comment.id) {
        this.updateComment(comment, dialogRef);
      }
    });
  }

  openDeleteComment(comment: Comment): void {
    const dialogRef: MatDialogRef<YesNoDialohComponent, any> = this.dialog.open(
      YesNoDialohComponent,
      {
        data: {
          title: 'Eliminar comentario',
          description: '¿Estás seguro de eliminar este comentario?',
        },
      }
    );
    dialogRef.componentInstance.yesEvent.subscribe(() => {
      if (comment?.id) {
        this.deleteComment(comment.id, dialogRef);
      }
    });
  }
}

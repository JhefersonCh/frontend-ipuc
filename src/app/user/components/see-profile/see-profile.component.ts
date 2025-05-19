import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../shared/interfaces/user.interface';
import { UserDataService } from '../../services/user-data.service';
import { finalize } from 'rxjs';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { MatIconModule } from '@angular/material/icon';
import { StatisticsInterface } from '../../interface/profile.interface';
import { DatePipe } from '@angular/common';
import { DiscussionCardComponent } from '../../../social/components/discussion-card/discussion-card.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Post } from '../../../social/interfaces/forum.interface';
import { YesNoDialohComponent } from '../../../shared/components/yes-no-dialoh/yes-no-dialoh.component';
import { CreateOrEditDiscussionComponent } from '../../../social/components/create-or-edit-discussion/create-or-edit-discussion.component';
import { PostService } from '../../../social/services/post.service';
import { CommentCardComponent } from '../../../social/components/comment-card/comment-card.component';

@Component({
  selector: 'app-see-profile',
  standalone: true,
  imports: [
    LoaderComponent,
    ReactiveFormsModule,
    MatIconModule,
    DiscussionCardComponent,
    CommentCardComponent,
  ],
  templateUrl: './see-profile.component.html',
  styleUrl: './see-profile.component.scss',
  providers: [DatePipe],
})
export class SeeProfileComponent implements OnChanges {
  @Input() user?: User;

  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _userService: UserDataService = inject(UserDataService);
  private readonly cdRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  constructor(private datePipe: DatePipe) {}
  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly _postService: PostService = inject(PostService);

  isLoading: boolean = false;
  formattedDate: string | null = null;
  statistics?: StatisticsInterface;

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['user']?.currentValue !== changes['user']?.previousValue &&
      this.user
    ) {
      this.getStatistics();
      this.cdRef.detectChanges();
      this.formatDate();
    }
  }

  reloadPosts(): void {
    this.getStatistics();
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
          this.getStatistics();
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
          dialogRef.close();
          this.getStatistics();
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
        // this.createPost(post, dialogRef);
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

  private formatDate(): void {
    const date = this.user?.createdAt;
    if (date) {
      const formatted = this.datePipe.transform(
        date,
        "d 'de' MMMM 'de' y",
        'es-ES'
      );
      this.formattedDate = `Te uniste el ${formatted}`;
    }
  }

  /**
   * @param getStatistics - Carga las estadísticas del usuario.
   */
  private getStatistics(): void {
    this.isLoading = true;

    this._userService
      .getStatistics()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => {
          this.statistics = response.data;
          console.log(this.statistics.lastComments.topLevelComments);
        },
        error: (error) => {
          console.error('Error al obtener las estadísticas', error);
        },
      });
  }
}

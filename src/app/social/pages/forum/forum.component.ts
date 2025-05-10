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
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';
import {
  PaginationInterface,
  ParamsPaginationInterface,
} from '../../../shared/interfaces/pagination.interface';
import { FormGroup } from '@angular/forms';
import { SearchFieldsComponent } from '../../../shared/components/search-fields/search-fields.component';
import { PageEvent } from '@angular/material/paginator';
import { SearchField } from '../../../shared/interfaces/data-table.interface';
import { UserService } from '../../../admin/services/user.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  imports: [
    MatButtonModule,
    DiscussionCardComponent,
    LoaderComponent,
    PaginatorComponent,
    SearchFieldsComponent,
  ],
  styleUrls: ['./forum.component.scss'],
  standalone: true,
})
export class ForumComponent implements OnInit {
  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly _postService: PostService = inject(PostService);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _userService: UserService = inject(UserService);
  posts: Post[] = [];
  currentUser: User | null = null;
  loading: boolean = true;
  searchFields: SearchField[] = [
    {
      name: 'search',
      label: 'Buscar',
      type: 'text',
      placeholder: 'Buscar por nombre o descripción',
    },
  ];
  paginationParams: ParamsPaginationInterface = {
    order: 'ASC',
    page: 1,
    perPage: 10,
  };
  paginationResults: PaginationInterface = {
    page: 1,
    perPage: 10,
    total: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  };
  params: object = {};
  form!: FormGroup;
  users: User[] = [];

  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Foro - IPUC sede cuarta, Mocoa, Putumayo');
    this._authService.currentUser$.pipe().subscribe((user) => {
      this.currentUser = user;
      this.getPosts();
      //this._getUsers();

      // if (user) {
      //   this.searchFields = [
      //     ...this.searchFields,
      //     {
      //       name: 'userId',
      //       label: 'Usuario',
      //       type: 'autocomplete',
      //       placeholder: 'Buscar por usuario',
      //       autocompleteOptions: [],
      //       displayWith: (value: any) =>
      //         value && value.firstName + ' ' + value.lastName,
      //       onAutocompleteChange: (value: any) => {
      //         this._getUsers(value.id ? value.email : value);
      //       },
      //     },
      //   ];
      // }
    });
  }

  // private _getUsers(search?: string): void {
  //   this._userService
  //     .usersPaginatedList({ search })
  //     .pipe(finalize(() => (this.loading = false)))
  //     .subscribe({
  //       next: (res) => {
  //         this.users = res.data;
  //         const userIdField = this.searchFields.find(
  //           (field) => field.name === 'userId'
  //         );
  //         if (userIdField) {
  //           userIdField.autocompleteOptions = this.users;
  //         }
  //       },
  //       error: (err) => {
  //         console.error(err);
  //       },
  //     });
  // }

  private getPosts(): void {
    this._postService
      .getPaginatedPosts(this.currentUser?.id || '', {
        ...this.paginationParams,
        ...this.params,
      })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          this.paginationResults = res.data.pagination;
          this.posts = res.data.data;
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

  onChangePagination(event: PageEvent) {
    this.paginationParams.perPage = event.pageSize;
    this.paginationParams.page = event.pageIndex + 1;
    this.getPosts();
  }

  onSearchChange(values: any): void {
    this.params = { search: values.value.search || '' };
    this.getPosts();
  }
}

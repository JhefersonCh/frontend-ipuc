import { Component, inject, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import { MatButtonModule } from '@angular/material/button';
import {
  ActionInterface,
  SearchField,
} from '../../../shared/interfaces/data-table.interface';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  PaginationInterface,
  ParamsPaginationInterface,
} from '../../../shared/interfaces/pagination.interface';
import { finalize } from 'rxjs';
import { PostService } from '../../../social/services/post.service';
import { Post } from '../../../social/interfaces/forum.interface';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { YesNoDialohComponent } from '../../../shared/components/yes-no-dialoh/yes-no-dialoh.component';
import { CreateOrEditDiscussionComponent } from '../../../social/components/create-or-edit-discussion/create-or-edit-discussion.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-manage-forum',
  imports: [DataTableComponent, MatButtonModule],
  templateUrl: './manage-forum.component.html',
  styleUrl: './manage-forum.component.scss',
})
export class ManageForumComponent implements OnInit {
  private readonly _userService: UserService = inject(UserService);
  private readonly _postService: PostService = inject(PostService);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _matDialog: MatDialog = inject(MatDialog);
  loading: boolean = true;
  paginationParams: ParamsPaginationInterface = {
    order: 'ASC',
    page: 1,
    perPage: 10,
  };
  userId?: string;
  paginationResults: PaginationInterface = {
    page: 1,
    perPage: 10,
    total: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  };
  searchFields: SearchField[] = [
    {
      name: 'search',
      label: 'Buscar',
      type: 'text',
      placeholder: 'Buscar por nombre o usuario',
    },
    // {
    //   name: 'userId',
    //   label: 'Usuario',
    //   type: 'autocomplete',
    //   placeholder: 'Buscar por usuario',
    //   autocompleteOptions: [],
    //   displayWith: (value: any) =>
    //     value && value.firstName + ' ' + value.lastName,
    //   onAutocompleteChange: (value: any) => {
    //     this._getUsers(value.id ? value.email : value);
    //   },
    //},
  ];
  columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Titulo' },
    { key: 'userId', label: 'Usuario' },
    { key: 'createdAt', label: 'Creado en' },
  ];
  currentPost?: Post;
  actions: ActionInterface[] = [
    {
      label: 'Editar',
      icon: 'edit',
      color: 'primary',
      action: (item?: Post) => {
        if (item?.id) {
          this._postService.getPost(item.id).subscribe({
            next: (res) => {
              this.currentPost = res.data;
              this.openCreateOrUpdatePostDialog(this.currentPost);
            },
            error: (err) => {
              console.log(err);
            },
          });
        }
      },
    },
    {
      label: 'Eliminar',
      icon: 'delete',
      color: 'warn',
      action: (item?: Post) => {
        if (item?.id) {
          this._openYesNoDialog(item);
        }
      },
    },
  ];
  results: Partial<Post>[] = [];
  params: object = {};
  form!: FormGroup;

  ngOnInit(): void {
    this.userId = this._authService.getAllUserData().user.id;
    if (!this.userId) {
      this._authService.cleanStorageAndRedirectToLogin();
    } else {
      //this._getUsers();
      this._getPosts();
    }
  }

  // private _getUsers(search?: string): void {
  //   this._userService
  //     .usersPaginatedList({ search })
  //     .pipe(finalize(() => (this.loading = false)))
  //     .subscribe({
  //       next: (res) => {
  //         const userField = this.searchFields.find((f) => f.name === 'userId');
  //         if (userField) {
  //           userField.autocompleteOptions = res.data;
  //         }
  //       },
  //     });
  // }

  private _getPosts(): void {
    this._postService
      .getPaginatedPosts(this.userId ?? '', {
        ...this.params,
        ...this.paginationParams,
      })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          this.results = res.data?.data;
          this.paginationResults = res.data?.pagination;
        },
      });
  }

  private _openYesNoDialog(item?: Post): void {
    const dialogRef = this._matDialog.open(YesNoDialohComponent, {
      data: {
        title: 'Eliminar post',
        message: `¿Estás seguro de eliminar el post ${item?.title}?`,
      },
    });
    dialogRef.componentInstance.yesEvent.subscribe(() => {
      if (item?.id) {
        this._deletePost(item);
      }
    });
  }

  openCreateOrUpdatePostDialog(post?: Post): void {
    const dialogRef = this._matDialog.open(CreateOrEditDiscussionComponent, {
      data: {
        title: post?.title,
        description: post?.description,
        id: post?.id,
      },
    });
    dialogRef.componentInstance.saveEvent.subscribe((post) => {
      if (post.id) {
        this._updatePost(post, dialogRef);
      } else {
        this._addPost(post, dialogRef);
      }
    });
  }

  private _addPost(
    post: Post,
    dialogRef: MatDialogRef<CreateOrEditDiscussionComponent>
  ): void {
    this._postService.createPost(post).subscribe({
      next: () => {
        this._getPosts();
        dialogRef.close();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private _updatePost(
    post: Post,
    dialogRef: MatDialogRef<CreateOrEditDiscussionComponent>
  ): void {
    this._postService.updatePost(post).subscribe({
      next: () => {
        this._getPosts();
        dialogRef.close();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private _deletePost(post: Post): void {
    if (post.id) {
      this._postService.deletePost(post.id).subscribe({
        next: () => {
          this._getPosts();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  onChangePagination(event: PageEvent) {
    this.paginationParams.perPage = event.pageSize;
    this.paginationParams.page = event.pageIndex + 1;
    this._getPosts();
  }

  onSearchChange(values: any): void {
    if (values.value.search) {
      this.params = { ...this.params, search: values.value.search };
      this._getPosts();
    }
  }
}

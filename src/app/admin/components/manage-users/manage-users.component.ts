import { PageEvent } from '@angular/material/paginator';
import { Component, inject, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import {
  PaginationInterface,
  ParamsPaginationInterface,
} from '../../../shared/interfaces/pagination.interface';
import { User } from '../../../shared/interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import {
  ActionInterface,
  SearchField,
} from '../../../shared/interfaces/data-table.interface';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateOrUpdateUserComponent } from '../create-or-update-user/create-or-update-user.component';
import { v4 as uuidv4 } from 'uuid';
import { YesNoDialohComponent } from '../../../shared/components/yes-no-dialoh/yes-no-dialoh.component';

@Component({
  selector: 'app-manage-users',
  imports: [DataTableComponent, MatButtonModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss',
})
export class ManageUsersComponent implements OnInit {
  private readonly _userService: UserService = inject(UserService);
  private readonly _matDialog: MatDialog = inject(MatDialog);
  searchFields: SearchField[] = [
    {
      name: 'search',
      label: 'Buscar',
      type: 'text',
      placeholder: 'Buscar por nombre o usuario',
    },
  ];
  columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre' },
    { key: 'username', label: 'Usuario' },
    { key: 'email', label: 'Correo' },
    { key: 'role', label: 'Rol' },
    { key: 'createdAt', label: 'Creado en' },
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
  currentUser?: User;
  actions: ActionInterface[] = [
    {
      label: 'Editar',
      icon: 'edit',
      color: 'primary',
      action: (item?: User) => {
        if (item?.id) {
          this._userService.userById(item.id).subscribe({
            next: (res) => {
              this.currentUser = res.data;
              this.openCreateOrUpdateUserDialog(this.currentUser);
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
      action: (item?: User) => {
        if (item?.id) {
          this.openYesNoDialog(item);
        }
      },
    },
  ];
  results: Partial<User>[] = [];
  params: object = {};
  form!: FormGroup;

  ngOnInit(): void {
    this._getUsers();
  }

  private _getUsers() {
    this._userService
      .usersPaginatedList({
        ...this.params,
        ...this.paginationParams,
      })
      .subscribe({
        next: (res) => {
          this.paginationResults = res.pagination;
          const formatedResults: Partial<User>[] = this._formatResults(
            res.data
          );
          this.results = formatedResults;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private _formatResults(users: User[]): Partial<User>[] {
    const formatedResults: Partial<User>[] = users.map((user) => {
      const formatedResult = {
        ...user,
        name: `${user.firstName} ${user.lastName}`,
      };
      delete formatedResult.firstName;
      delete formatedResult.lastName;
      delete formatedResult.updatedAt;
      delete formatedResult.password;
      return formatedResult;
    });
    return formatedResults;
  }

  onChangePagination(event: PageEvent) {
    this.paginationParams.perPage = event.pageSize;
    this.paginationParams.page = event.pageIndex + 1;
    this._getUsers();
  }

  onSearchSubmit(values: any): void {
    this.params = values;
    this._getUsers();
  }

  onSearchChange(values: any): void {
    this.params = { ...this.params, search: values.value.search };
    this._getUsers();
  }

  openCreateOrUpdateUserDialog(user?: User) {
    const dialogRef = this._matDialog.open(CreateOrUpdateUserComponent, {
      data: { user },
    });
    dialogRef.componentInstance.saveForm.subscribe((res) => {
      if (user?.id) {
        this._updateUser(res, dialogRef);
      } else {
        this._createUser(res, dialogRef);
      }
    });
  }

  private _updateUser(
    user: User,
    dialogRef: MatDialogRef<CreateOrUpdateUserComponent>
  ) {
    this._userService.updateUser(user).subscribe({
      next: (res) => {
        this._getUsers();
        dialogRef.close();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private _createUser(
    user: User,
    dialogRef: MatDialogRef<CreateOrUpdateUserComponent>
  ) {
    const userToCreate = {
      ...user,
      id: uuidv4(),
    };
    this._userService.createUser(userToCreate).subscribe({
      next: (res) => {
        this._getUsers();
        dialogRef.close();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openYesNoDialog(user: User) {
    const dialogRef = this._matDialog.open(YesNoDialohComponent, {
      data: {
        title: 'Eliminar usuario',
        description: '¿Estas seguro de eliminar este usuario?',
      },
    });
    dialogRef.componentInstance.yesEvent.subscribe(() => {
      this._deleteUser(user);
    });
  }

  private _deleteUser(user: User) {
    if (user.id) {
      this._userService.deleteUser(user.id).subscribe({
        next: (res) => {
          this._getUsers();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}

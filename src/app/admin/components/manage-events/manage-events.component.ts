import { Component, inject } from '@angular/core';
import {
  ActionInterface,
  SearchField,
} from '../../../shared/interfaces/data-table.interface';
import {
  PaginationInterface,
  ParamsPaginationInterface,
} from '../../../shared/interfaces/pagination.interface';
import { Activity, EventInterface } from '../../interfaces/activity.interface';
import { PanelService } from '../../services/panel.service';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateOrUpdateEventComponent } from '../create-or-update-event/create-or-update-event.component';
import { YesNoDialohComponent } from '../../../shared/components/yes-no-dialoh/yes-no-dialoh.component';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-manage-events',
  imports: [DataTableComponent, MatButtonModule],
  templateUrl: './manage-events.component.html',
  styleUrl: './manage-events.component.scss',
})
export class ManageEventsComponent {
  private readonly _panelService: PanelService = inject(PanelService);
  private readonly _matDialog: MatDialog = inject(MatDialog);
  searchFields: SearchField[] = [
    {
      name: 'search',
      label: 'Buscar',
      type: 'text',
      placeholder: 'Buscar por nombre o descripción',
    },
  ];
  columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Titulo' },
    { key: 'description', label: 'Descripción' },
    { key: 'date', label: 'Fecha' },
    { key: 'activityId', label: 'Actividad' },
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
  currentEvent?: EventInterface;
  actions: ActionInterface[] = [
    {
      label: 'Editar',
      icon: 'edit',
      color: 'primary',
      action: (item?: EventInterface) => {
        if (item?.id) {
          this.openCreateOrUpdateEventDialog(item);
        }
      },
    },
    {
      label: 'Eliminar',
      icon: 'delete',
      color: 'warn',
      action: (item?: EventInterface) => {
        if (item?.id) {
          this.openYesNoDialog(item);
        }
      },
    },
  ];
  results: Partial<EventInterface>[] = [];
  params: object = {};
  form!: FormGroup;
  activities: Activity[] = [];

  ngOnInit(): void {
    this._getEvents();
    this._getActivities();
  }

  private _getActivities() {
    this._panelService.getActivities().subscribe({
      next: (res) => {
        this.activities = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private _getEvents() {
    this._panelService
      .getEventsPaginatedList({
        ...this.params,
        ...this.paginationParams,
      })
      .subscribe({
        next: (res) => {
          this.paginationResults = res.pagination || this.paginationResults;
          this.results = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  onChangePagination(event: PageEvent) {
    this.paginationParams.perPage = event.pageSize;
    this.paginationParams.page = event.pageIndex + 1;
    this._getEvents();
  }

  onSearchSubmit(values: any): void {
    this.params = values;
    this._getEvents();
  }

  onSearchChange(values: any): void {
    this.params = { ...this.params, search: values.value.search };
    this._getEvents();
  }

  openCreateOrUpdateEventDialog(event?: EventInterface) {
    const dialogRef = this._matDialog.open(CreateOrUpdateEventComponent, {
      data: { event, activities: this.activities },
    });
    dialogRef.componentInstance.saveForm.subscribe((res) => {
      if (event?.id) {
        this._updateEvent(res, dialogRef);
      } else {
        this._createEvent(res, dialogRef);
      }
    });
  }

  private _updateEvent(
    event: EventInterface,
    dialogRef: MatDialogRef<CreateOrUpdateEventComponent>
  ) {
    this._panelService.updateEvent(event).subscribe({
      next: (res) => {
        this._getEvents();
        dialogRef.close();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private _createEvent(
    event: EventInterface,
    dialogRef: MatDialogRef<CreateOrUpdateEventComponent>
  ) {
    this._panelService.addEvent(event).subscribe({
      next: (res) => {
        this._getEvents();
        dialogRef.close();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openYesNoDialog(event: EventInterface) {
    const dialogRef = this._matDialog.open(YesNoDialohComponent, {
      data: {
        title: 'Eliminar evento',
        description: '¿Estas seguro de eliminar este evento?',
      },
    });
    dialogRef.componentInstance.yesEvent.subscribe(() => {
      this._deleteEvent(event);
      dialogRef.close();
    });
  }

  private _deleteEvent(event: EventInterface) {
    if (event.id) {
      this._panelService.deleteEvent(event.id).subscribe({
        next: (res) => {
          this._getEvents();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}

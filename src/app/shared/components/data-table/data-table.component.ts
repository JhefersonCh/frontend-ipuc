import { Component, Input, input, output } from '@angular/core';
import { PaginatorComponent } from '../paginator/paginator.component';
import { PaginationInterface } from '../../interfaces/pagination.interface';
import { PageEvent } from '@angular/material/paginator';
import {
  ActionInterface,
  SearchField,
} from '../../interfaces/data-table.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SearchFieldsComponent } from '../search-fields/search-fields.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-table',
  imports: [
    PaginatorComponent,
    MatIconModule,
    MatButtonModule,
    SearchFieldsComponent,
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent {
  withActions = input<boolean>(false);
  withPagination = input<boolean>(false);
  withSearchFields = input<boolean>(false);
  searchFields = input<SearchField[]>([]);
  @Input() form!: FormGroup;
  actions = input<ActionInterface[]>([]);
  columns = input<{ key: string; label: string }[]>([]);
  paginationParams = input<PaginationInterface>({
    page: 0,
    perPage: 10,
    total: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  results = input<any[]>([]);
  onPageChange = output<PageEvent>();
  onSearchSubmit = output<any>();
  onSearchChange = output<any>();

  onPageChangeHandler(event: PageEvent) {
    this.onPageChange.emit(event);
  }

  getResultEntries(res: any): [string, any][] {
    return Object.entries(res);
  }

  formatCell(value: any, key: string): string {
    if (!value) return '';

    if (key === 'createdAt') {
      return new Date(value).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      });
    }

    if (key === 'actions') {
      return this.withActions() ? '[acciones]' : '';
    }

    return String(value);
  }

  onSearchSubmitHandler(values: any): void {
    this.onSearchSubmit.emit(values);
  }

  onSearchChangeHandler(values: any): void {
    this.onSearchChange.emit(values);
  }
}

import { Component, input, output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PaginationInterface } from '../../interfaces/pagination.interface';

@Component({
  selector: 'app-paginator',
  imports: [MatPaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  paginationParams = input<PaginationInterface>({
    page: 0,
    perPage: 10,
    total: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  onPageChange = output<PageEvent>();

  onPageChangeHandler(event: PageEvent) {
    this.onPageChange.emit(event);
  }
}

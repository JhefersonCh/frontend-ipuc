import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialogComponent } from '../../../shared/components/base-dialog/base-dialog.component';
import { EventInterface } from '../../../admin/interfaces/activity.interface';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-event-dialog',
  imports: [BaseDialogComponent, DatePipe, MatButtonModule],
  templateUrl: './event-dialog.component.html',
  styleUrl: './event-dialog.component.scss',
})
export class EventDialogComponent implements OnInit {
  private readonly _dialogRef: MatDialogRef<EventDialogComponent> = inject(
    MatDialogRef<EventDialogComponent>
  );
  readonly data? = inject<{ event: EventInterface }>(MAT_DIALOG_DATA);

  close() {
    this._dialogRef.close();
  }

  ngOnInit(): void {
    console.log(this.data?.event);
  }
}

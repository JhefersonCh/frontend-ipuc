import { MatInputModule } from '@angular/material/input';
import { Component, EventEmitter, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Activity, EventInterface } from '../../interfaces/activity.interface';
import { BaseDialogComponent } from '../../../shared/components/base-dialog/base-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-create-or-update-event',
  imports: [
    BaseDialogComponent,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-or-update-event.component.html',
  styleUrl: './create-or-update-event.component.scss',
})
export class CreateOrUpdateEventComponent {
  private readonly _dialogRef: MatDialogRef<CreateOrUpdateEventComponent> =
    inject(MatDialogRef<CreateOrUpdateEventComponent>);
  private readonly _fb: FormBuilder = inject(FormBuilder);
  readonly data? = inject<{ event: EventInterface; activities: Activity[] }>(
    MAT_DIALOG_DATA
  );
  form!: FormGroup;
  saveForm = new EventEmitter<EventInterface>();

  constructor() {
    this.form = this._fb.group({
      id: [this.data?.event?.id],
      title: [this.data?.event?.title, [Validators.required]],
      description: [this.data?.event?.description, [Validators.required]],
      date: [this.data?.event?.date],
      activityId: [this.data?.event?.activityId],
      publicId: ['N/A'],
      imageUrl: ['N/A'],
    });
  }

  close() {
    this._dialogRef.close({ success: false, event: this.form.value });
  }

  onSave() {
    if (this.form.valid) {
      this.saveForm.emit({
        ...this.form.value,
        id: this.data?.event?.id || undefined,
      });
    }
  }
}

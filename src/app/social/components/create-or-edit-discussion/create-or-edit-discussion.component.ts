import { Component, EventEmitter, inject, Output } from '@angular/core';
import { BaseDialogComponent } from '../../../shared/components/base-dialog/base-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Post } from '../../interfaces/forum.interface';

@Component({
  selector: 'app-create-or-edit-discussion',
  imports: [
    BaseDialogComponent,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './create-or-edit-discussion.component.html',
  styleUrl: './create-or-edit-discussion.component.scss',
})
export class CreateOrEditDiscussionComponent {
  readonly dialogRef: MatDialogRef<any, any> = inject(
    MatDialogRef<CreateOrEditDiscussionComponent>
  );
  readonly data? = inject<{ id: number; title: string; description: string }>(
    MAT_DIALOG_DATA
  );
  private readonly _fb: FormBuilder = inject(FormBuilder);
  form!: FormGroup;
  maxLenght: number = 2000;
  loading: boolean = false;
  @Output() saveEvent = new EventEmitter<Post>();

  constructor() {
    this.form = this._fb.group({
      id: [this.data?.id],
      title: [this.data?.title, [Validators.required]],
      description: [this.data?.description, [Validators.required]],
    });
  }

  save(): void {
    this.setLoading(true);
    this.saveEvent.emit(this.form.value);
  }

  setLoading(value: boolean): void {
    this.loading = value;
  }
}

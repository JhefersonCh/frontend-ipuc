import { Comment } from './../../interfaces/comment.interface';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { BaseDialogComponent } from '../../../shared/components/base-dialog/base-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-or-edit-comment',
  imports: [
    BaseDialogComponent,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './create-or-edit-comment.component.html',
  styleUrl: './create-or-edit-comment.component.scss',
})
export class CreateOrEditCommentComponent {
  @Output() saveEvent = new EventEmitter<Comment>();

  readonly dialogRef: MatDialogRef<any, any> = inject(
    MatDialogRef<CreateOrEditCommentComponent>
  );
  readonly data = inject<{ id: number; comment: string }>(MAT_DIALOG_DATA);
  private readonly _fb: FormBuilder = inject(FormBuilder);

  form!: FormGroup;
  maxLenght: number = 2000;
  loading: boolean = false;

  constructor() {
    this.form = this._fb.group({
      id: [this.data?.id],
      comment: [this.data?.comment, [Validators.required]],
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

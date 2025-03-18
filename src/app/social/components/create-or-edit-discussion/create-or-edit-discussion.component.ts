import { Component, inject } from '@angular/core';
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
  readonly data = inject<unknown>(MAT_DIALOG_DATA);
  form!: FormGroup;
  private readonly _fb: FormBuilder = inject(FormBuilder);
  maxLenght: number = 2000;

  constructor() {
    this.form = this._fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }
}

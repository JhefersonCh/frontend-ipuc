import { Component, EventEmitter, inject } from '@angular/core';
import { BaseDialogComponent } from '../../../shared/components/base-dialog/base-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-create-or-update-user',
  imports: [
    BaseDialogComponent,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-or-update-user.component.html',
  styleUrl: './create-or-update-user.component.scss',
})
export class CreateOrUpdateUserComponent {
  private readonly _dialogRef: MatDialogRef<CreateOrUpdateUserComponent> =
    inject(MatDialogRef<CreateOrUpdateUserComponent>);
  private readonly _fb: FormBuilder = inject(FormBuilder);
  readonly data? = inject<{ user: User }>(MAT_DIALOG_DATA);
  form!: FormGroup;
  saveForm = new EventEmitter<User>();
  roles = [
    {
      value: 'admin',
      label: 'Administrador',
    },
    {
      value: 'user',
      label: 'Usuario',
    },
  ];

  constructor() {
    this.form = this._fb.group({
      id: [this.data?.user?.id],
      firstName: [this.data?.user?.firstName, [Validators.required]],
      lastName: [this.data?.user?.lastName, [Validators.required]],
      username: [this.data?.user?.username, [Validators.required]],
      email: [this.data?.user?.email, [Validators.required, Validators.email]],
      role: [this.data?.user?.role, [Validators.required]],
      password: [this.data?.user?.password],
    });
    this.setPasswordValidator();
  }

  setPasswordValidator() {
    if (!this.data?.user?.id) {
      this.form.get('password')?.setValidators([Validators.required]);
    }
    this.form.get('password')?.updateValueAndValidity();
  }

  close() {
    this._dialogRef.close({ success: false, user: this.form.value });
  }

  onSave() {
    if (this.form.valid) {
      if (this.data?.user?.id) {
        delete this.form?.value?.password;
      }
      this.saveForm.emit(this.form.value);
    }
  }
}

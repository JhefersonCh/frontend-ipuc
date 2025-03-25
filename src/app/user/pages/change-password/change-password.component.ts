import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { UserDataService } from '../../services/user-data.service';
import { finalize } from 'rxjs/operators';
import { CustomValidationsService } from '../../../shared/services/customValidations.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    MatIcon,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    RouterLink,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  form: FormGroup;
  loading = false;

  private readonly _fb: FormBuilder = inject(FormBuilder);
  private _userService = inject(UserDataService); // Inyectar el servicio de usuario

  constructor() {
    // Inicializar form antes de que se use
    this.form = this._fb.group({
      passwordOld: ['', Validators.required],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          CustomValidationsService.PasswordRegex(),
        ],
      ],
    });
  }

  saveNewPassword() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const body = this.form.value;

    this._userService
      .changePasswordUser(body)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.form.reset();
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
  }
}

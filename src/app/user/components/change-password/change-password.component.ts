import { Component, EventEmitter, inject, Output } from '@angular/core';
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
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CustomValidationsService } from '../../../shared/services/customValidations.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  passwordMismatch = false;
  eyeOpen = faEye;
  eyeClose = faEyeSlash;
  showOldPassword: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  private readonly _userDataservice: UserDataService = inject(UserDataService);
  private readonly _router: Router = inject(Router);
  private readonly _customValidations: CustomValidationsService = inject(
    CustomValidationsService
  );
  private readonly _passwordValidationService: CustomValidationsService =
    inject(CustomValidationsService);

  /**
   * Se recibe la información diligenciada en el formulario.
   * @param constructor - Creación del formulario.
   * @param oldPassword - Formulario 1 de información personal.
   * @param passwordStrength - Válida que la contraseña poseea más de 6 carácteres, 1 minúscula, 1 mayúscula y 1 carácter especial.
   * @param passwordsMatch - Válida que la contraseña sea igual a confirmar contraseña.
   */
  constructor(private fb: FormBuilder) {
    this.changePasswordForm = this.fb.group(
      {
        oldPassword: ['', Validators.required],
        newPassword: [
          '',
          [
            Validators.required,
            this._passwordValidationService.passwordStrength(),
          ],
        ],
        confirmNewPassword: ['', Validators.required],
      },
      {
        validators: this._customValidations.passwordsMatch(
          'newPassword',
          'confirmNewPassword'
        ),
      }
    );
  }

  /**
   * @description Cambia la contraseña del usuario si el formulario es válido.
   */
  onChangePassword(): void {
    const { oldPassword, newPassword, confirmNewPassword } =
      this.changePasswordForm.value;

    if (newPassword !== confirmNewPassword) {
      this.passwordMismatch = true;
      return;
    }

    this.passwordMismatch = false;

    this._userDataservice
      .updateUserPassword({
        oldPassword,
        newPassword,
        confirmNewPassword,
      })
      .subscribe({
        next: (res) => {
          this._router.navigate([], {
            queryParams: { 'tab-panel': 0 },
            queryParamsHandling: 'merge',
          });
        },
        error: (err) => {
          console.error('Error al cambiar la contraseña:', err);
        },
      });
  }

  /**
   * @param toggleOldPasswordVisibility - Ver antigua contraseña.
   */
  toggleOldPasswordVisibility(): void {
    this.showOldPassword = !this.showOldPassword;
  }

  /**
   * @param togglePasswordVisibility - Ver contraseña.
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * @param toggleConfirmPasswordVisibility - Ver confirmar contraseña.
   */
  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}

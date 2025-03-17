import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuid } from 'uuid';
import { CustomValidationsService } from '../../../shared/services/customValidations.service';
import { RegisterUser } from '../../interfaces/register.interface';
import { RegisterService } from '../../services/regsiter.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    FontAwesomeModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly _registerService: RegisterService = inject(RegisterService);
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _router: Router = inject(Router);
  showPassword = false;
  showConfirmPassword = false;
  eyeOpen = faEye;
  eyeClose = faEyeSlash;
  form: FormGroup;

  constructor() {
    this.form = this._fb.group(
      {
        id: [uuid()],
        username: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            CustomValidationsService.PasswordRegex(),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: CustomValidationsService.PasswordMatch(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  register(): void {
    if (!this.form.valid) {
      return this.form.markAllAsTouched();
    }
    const user: RegisterUser = this.form.value;
    user &&
      this.form.valid &&
      this._registerService.registerUser(user).subscribe({
        next: () => {
          this._router.navigate([`auth/login`]);
        },
      });
  }
}

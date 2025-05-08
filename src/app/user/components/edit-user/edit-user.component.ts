import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { LocalStorageService } from '../../../shared/services/localStorage.service';
import { UserDataService } from '../../services/user-data.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../shared/interfaces/user.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { finalize } from 'rxjs';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-edit-user',
  standalone: true,

  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIcon,
    MatInputModule,
    MatButtonModule,
    LoaderComponent,
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent implements OnInit {
  @Output() userUpdated = new EventEmitter<void>();

  isLoading: boolean = false;
  userId: string = '';
  user?: User;
  form: FormGroup;

  private readonly _localStorageService: LocalStorageService =
    inject(LocalStorageService);
  private readonly _userService: UserDataService = inject(UserDataService);
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  private readonly _router: Router = inject(Router);

  constructor() {
    // Inicializar form antes de que se use
    this.form = this._fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      username: [''],
    });
  }

  /**
   * @param ngOnInit - Inicializa las funciones.
   */
  ngOnInit(): void {
    this.isLoading = true;
    const sessionData = this._localStorageService.getAllSessionData();

    this.userId =
      sessionData?.user?.id || this._route.snapshot.params['id'] || '';

    console.log('User ID obtenido:', this.userId); // Verifica si se obtiene el ID
    if (this.userId) {
      this.getUserData(this.userId);
    }
  }

  /**
   * @param getUserData - Obtiene los datos del usuario.
   */
  getUserData(userId: string): void {
    this._userService
      .getUserProfile(userId)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => {
          this.user = response?.data;

          this.updateFormData();
        },
        error: (error) => {
          console.error('Error al encontrar el usuario', error);
        },
      });
  }

  /**
   * @param updateFormData - Actualiza los datos del formulario.
   */
  updateFormData(): void {
    this.form?.patchValue({
      firstName: this.user?.firstName,
      lastName: this.user?.lastName,
      email: this.user?.email,
      username: this.user?.username,
    });
  }

  /**
   * @param saveInfo - Guarda la información del usuario.
   */
  saveInfo(): void {
    const userUpdate = {
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      email: this.form.get('email')?.value,
      username: this.form.get('username')?.value,
    };

    if (this.form.invalid) return;
    this._userService.updateUserProfile(this.userId, userUpdate).subscribe({
      next: () => {
        this._router.navigate([], {
          queryParams: { 'tab-panel': 0 },
          queryParamsHandling: 'merge',
        });
      },
      error: (error) => {
        console.error('Error al actualizar el usuario', error);
      },
    });
  }
}

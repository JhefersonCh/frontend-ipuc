import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { User } from '../../../shared/interfaces/user.interface';
import { UserDataService } from '../../services/user-data.service';
import { LocalStorageService } from '../../../shared/services/localStorage.service';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIcon,
    MatMenuModule,
    RouterLink,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  userId: string = '';
  user?: User;
  form: FormGroup;

  private readonly _localStorageService: LocalStorageService =
    inject(LocalStorageService);
  private readonly _userService: UserDataService = inject(UserDataService);
  private readonly _fb: FormBuilder = inject(FormBuilder);

  constructor() {
    // Inicializar form antes de que se use
    this.form = this._fb.group({
      email: [''],
      createdAt: [''],
      updatedAt: [''],
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  private loadUserProfile(): void {
    const sessionData = this._localStorageService.getAllSessionData();
    this.userId = sessionData?.user?.id || '';

    if (!this.userId) {
      console.error('No se encontró el ID del usuario en LocalStorage');
      return;
    }

    this._userService.getUserProfile(this.userId).subscribe({
      next: (response) => {
        if (response?.data) {
          this.user = response.data;
          this.form.patchValue({
            email: this.user.email,
            createdAt: this.user.createdAt,
            updatedAt: this.user.updatedAt,
          });
        }
      },
      error: (error) => {
        console.error('Error al cargar el usuario', error);
      },
    });
  }
}

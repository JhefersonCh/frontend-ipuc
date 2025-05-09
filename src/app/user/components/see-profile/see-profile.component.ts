import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../shared/interfaces/user.interface';
import { LocalStorageService } from '../../../shared/services/localStorage.service';
import { UserDataService } from '../../services/user-data.service';
import { finalize } from 'rxjs';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { MatIconModule } from '@angular/material/icon';
import { StatisticsInterface } from '../../interface/profile.interface';

@Component({
  selector: 'app-see-profile',
  standalone: true,
  imports: [LoaderComponent, ReactiveFormsModule, MatIconModule],
  templateUrl: './see-profile.component.html',
  styleUrl: './see-profile.component.scss',
})
export class SeeProfileComponent implements OnInit {
  private readonly _localStorageService: LocalStorageService =
    inject(LocalStorageService);
  private readonly _userService: UserDataService = inject(UserDataService);
  private readonly _fb: FormBuilder = inject(FormBuilder);

  isLoading: boolean = false;
  userId: string = '';
  user?: User;
  form: FormGroup;
  statistics?: StatisticsInterface;

  constructor() {
    this.form = this._fb.group({
      email: [''],
      createdAt: [''],
      updatedAt: [''],
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadUserProfile();
    this.getStatistics();
  }

  private loadUserProfile(): void {
    const sessionData = this._localStorageService.getAllSessionData();
    this.userId = sessionData?.user?.id || '';

    if (!this.userId) {
      console.error('No se encontró el ID del usuario en LocalStorage');
      return;
    }

    this._userService
      .getUserProfile(this.userId)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
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

  /**
   * @param _getStatistics - Carga las estadísticas del usuario.
   */
  private getStatistics(): void {
    this._userService.getStatistics().subscribe({
      next: (response) => {
        this.statistics = response.data;
      },
      error: (error) => {
        console.error('Error al obtener las estadísticas', error);
      },
    });
  }
}

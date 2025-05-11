import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { EditUserComponent } from '../../components/edit-user/edit-user.component';
import { ChangePasswordComponent } from '../../components/change-password/change-password.component';
import { SeeProfileComponent } from '../../components/see-profile/see-profile.component';
import { HorizontalVerticalTabsComponent } from '../../../shared/components/horizontal-vertical-tabs/horizontal-vertical-tabs.component';
import { TabComponent } from '../../../shared/components/tab/tab.component';
import { UserDataService } from '../../services/user-data.service';
import { LocalStorageService } from '../../../shared/services/localStorage.service';
import { User } from '../../../shared/interfaces/user.interface';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatMenuModule,
    MatTabsModule,
    EditUserComponent,
    ChangePasswordComponent,
    SeeProfileComponent,
    HorizontalVerticalTabsComponent,
    TabComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user?: User;
  isLoading = false;
  userId: string = '';

  constructor(
    private _localStorage: LocalStorageService,
    private _userService: UserDataService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const sessionData = this._localStorage.getAllSessionData();
    this.userId = sessionData?.user?.id || '';

    if (!this.userId) {
      console.error('No se encontró el ID del usuario');
      return;
    }

    this.isLoading = true;
    this._userService
      .getUserProfile(this.userId)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => {
          this.user = response.data;
        },
        error: (err) => console.error('Error cargando el usuario', err),
      });
  }

  onUserUpdated(): void {
    if (!this.userId) return;

    this.isLoading = true;
    this._userService
      .getUserProfile(this.userId)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => {
          // Crear un nuevo objeto para forzar la detección de cambios
          this.user = { ...response.data };
          this.cdRef.detectChanges();
        },
        error: (err) => console.error('Error recargando usuario', err),
      });
  }
}

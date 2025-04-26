import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { EditUserComponent } from '../../components/edit-user/edit-user.component';
import { ChangePasswordComponent } from '../../components/change-password/change-password.component';
import { SeeProfileComponent } from '../../components/see-profile/see-profile.component';

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
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  selectedTab: string = 'see-profile';

  userId: string = '';

  setTab(tab: string) {
    this.selectedTab = tab;
  }
}

import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { EditUserComponent } from '../../components/edit-user/edit-user.component';
import { ChangePasswordComponent } from '../../components/change-password/change-password.component';
import { SeeProfileComponent } from '../../components/see-profile/see-profile.component';
import { Title } from '@angular/platform-browser';

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
export class ProfileComponent implements OnInit {
  selectedTab: string = 'see-profile';

  userId: string = '';

  constructor(private title: Title) {}

  setTab(tab: string) {
    this.selectedTab = tab;
  }

  ngOnInit(): void {
    this.title.setTitle('Perfil - IPUC sede cuarta, Mocoa, Putumayo');
  }
}

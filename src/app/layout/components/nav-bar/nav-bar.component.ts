import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  input,
  InputSignal,
  Output,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../../shared/interfaces/user.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterLink,
    CommonModule,
    MatIcon,
    MatMenuModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  currentUser: InputSignal<User | undefined> = input<User>();
  loading: InputSignal<boolean> = input.required<boolean>();
  menuOpen: boolean = false;
  profileMenuOpen: boolean = false;
  @Output() logout = new EventEmitter<void>();

  log() {
    console.log(this.currentUser());
  }

  menuClose() {
    this.menuOpen = false;
  }
}

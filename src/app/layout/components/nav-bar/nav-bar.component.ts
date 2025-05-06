import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  input,
  InputSignal,
  Output,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../../shared/interfaces/user.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterLink,
    RouterLinkActive,
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
  logo: InputSignal<string> = input.required<string>();
  menuOpen: boolean = false;
  profileMenuOpen: boolean = false;
  @Output() logout = new EventEmitter<void>();

  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }

  menuClose() {
    this.menuOpen = false;
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../shared/interfaces/user.interface';
import { filter, finalize } from 'rxjs';
import { PanelService } from '../../../admin/services/panel.service';
import { GeneralForm } from '../../../admin/interfaces/about.interface';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, FooterComponent],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss',
})
export class DefaultLayoutComponent implements OnInit {
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _panelService: PanelService = inject(PanelService);
  router: Router = inject(Router);
  currentUser?: User;
  loading: boolean = false;
  appInfo?: GeneralForm;

  ngOnInit(): void {
    this.loading = true;
    this._getCurrentUserDate();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (!this.currentUser) {
          this._getCurrentUserDate();
        }
      });
    this._getAppInfo();
  }

  private _getAppInfo() {
    this._panelService.getGeneral().subscribe({
      next: (res) => {
        this.appInfo = res?.data;
      },
    });
  }

  private _getCurrentUserDate() {
    if (this._authService.isLogged) {
      this._authService
        .getLoggedUserData()
        .pipe(finalize(() => (this.loading = false)))
        .subscribe({
          next: (res) => {
            this.currentUser = res?.data;
          },
        });
    } else {
      this.loading = false;
    }
  }

  logout() {
    this._authService.logout();
    this.currentUser = undefined;
  }
}

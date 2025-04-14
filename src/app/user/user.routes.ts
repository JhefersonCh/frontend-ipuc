import { Routes } from '@angular/router';

export const userRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },
      {
        path: ':id/see-profile',
        loadComponent: () =>
          import('./components/see-profile/see-profile.component').then(
            (m) => m.SeeProfileComponent
          ),
      },
      {
        path: ':id/edit-user',
        loadComponent: () =>
          import('./components/edit-user/edit-user.component').then(
            (m) => m.EditUserComponent
          ),
      },
      {
        path: ':id/change-password',
        loadComponent: () =>
          import('./components/change-password/change-password.component').then(
            (m) => m.ChangePasswordComponent
          ),
      },
    ],
  },
];

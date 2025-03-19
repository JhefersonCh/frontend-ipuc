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
        path: ':id/edit-user',
        loadComponent: () =>
          import('./pages/edit-user/edit-user.component').then(
            (m) => m.EditUserComponent
          ),
      },
      {
        path: ':id/change-password',
        loadComponent: () =>
          import('./pages/change-password/change-password.component').then(
            (m) => m.ChangePasswordComponent
          ),
      },
    ],
  },
];

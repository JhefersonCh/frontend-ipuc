import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout/default-layout.component';
import { adminGuard } from './shared/guards/admin.guard';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./public/public.routes').then((m) => m.publicRoutes),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.routes').then((m) => m.authRoutes),
      },
      {
        path: 'public',
        loadChildren: () =>
          import('./public/public.routes').then((m) => m.publicRoutes),
      },
      {
        path: 'user',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./user/user.routes').then((m) => m.userRoutes),
      },
      {
        path: 'social',
        loadChildren: () =>
          import('./social/social.routes').then((m) => m.socialRoutes),
      },
      {
        path: 'admin',
        canActivate: [authGuard, adminGuard],
        loadChildren: () =>
          import('./admin/admin.routes').then((m) => m.adminRoutes),
      },
    ],
  },
  {
    path: 'auth/:userId/change-password',
    loadComponent: () =>
      import('./auth/pages/change-password/change-password.component').then(
        (m) => m.ChangePasswordComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

import { Routes } from '@angular/router';
export const adminRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/admin/panel',
        pathMatch: 'full',
      },
      {
        path: 'panel',
        loadComponent: () =>
          import('./pages/panel/panel.component').then((m) => m.PanelComponent),
      },
    ],
  },
];

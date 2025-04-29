import { Routes } from '@angular/router';
export const adminRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/admin/configuration',
        pathMatch: 'full',
      },
      {
        path: 'configuration',
        loadComponent: () =>
          import('./pages/panel/panel.component').then((m) => m.PanelComponent),
      },
    ],
  },
];

import { Routes } from '@angular/router';

export const socialRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'forum',
        loadComponent: () =>
          import('./pages/forum/forum.component').then((m) => m.ForumComponent),
      },
    ],
  },
];

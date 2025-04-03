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
      {
        path: 'post/:id',
        loadComponent: () =>
          import('./pages/post-details/post-details.component').then(
            (m) => m.PostDetailsComponent
          ),
      },
    ],
  },
];

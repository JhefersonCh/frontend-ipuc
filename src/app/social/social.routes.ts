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
        path: 'discussions',
        loadComponent: () =>
          import('./components/discussions/discussions.component').then(
            (m) => m.DiscussionsComponent
          ),
      },
      {
        path: 'create-discussion',
        loadComponent: () =>
          import(
            './components/create-discussion/create-discussion.component'
          ).then((m) => m.CreateDiscussionComponent),
      },
    ],
  },
];

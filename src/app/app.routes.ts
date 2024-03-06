import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'list-hero',
    loadComponent: () => import('./pages/list-hero/list-hero.component'),
  },
  {
    path: 'update-hero',
    loadComponent: () => import('./pages/update-hero/update-hero.component'),
  },
  {
    path: '',
    redirectTo: '/list-hero',
    pathMatch: 'full'
  },
];

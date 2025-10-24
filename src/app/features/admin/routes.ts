import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  { path: 'dashboard', loadComponent: () => import('./dashboard').then(m => m.Dashboard) },
  { path: 'users', loadComponent: () => import('./users').then(m => m.Users) },
  { path: 'approvals', loadComponent: () => import('./approvals').then(m => m.Approvals) },
  { path: 'announcements', loadComponent: () => import('./announcements').then(m => m.Announcements) },
];

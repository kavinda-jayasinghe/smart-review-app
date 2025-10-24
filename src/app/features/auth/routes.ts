import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  { path: 'login', loadComponent: () => import('./login').then(m => m.Login) },
  { path: 'register', loadComponent: () => import('./register').then(m => m.Register) },
  { path: 'forgot', loadComponent: () => import('./forgot').then(m => m.Forgot) },
];

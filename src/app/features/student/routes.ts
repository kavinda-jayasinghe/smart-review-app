import { Routes } from '@angular/router';

export const STUDENT_ROUTES: Routes = [
  { path: 'dashboard', loadComponent: () => import('./dashboard').then(m => m.Dashboard) },
  { path: 'home', loadComponent: () => import('./dashboard').then(m => m.Dashboard) },
  { path: 'smart-review', loadComponent: () => import('./smart-review').then(m => m.SmartReview) },
  { path: 'logs', loadComponent: () => import('./logs').then(m => m.Logs) },
  { path: 'assignments', loadComponent: () => import('./assignments').then(m => m.Assignments) },
  { path: 'classes', loadComponent: () => import('./classes').then(m => m.Classes) },
];

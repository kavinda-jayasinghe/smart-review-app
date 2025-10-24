import { Routes } from '@angular/router';

export const TEACHER_ROUTES: Routes = [
  { path: 'dashboard', loadComponent: () => import('./dashboard').then(m => m.Dashboard) },
  { path: 'classes', loadComponent: () => import('./classes').then(m => m.Classes) },
  { path: 'assignments', loadComponent: () => import('./assignments').then(m => m.Assignments) },
  { path: 'topics', loadComponent: () => import('./topics').then(m => m.Topics) },
  { path: 'reports', loadComponent: () => import('./reports').then(m => m.Reports) },
];

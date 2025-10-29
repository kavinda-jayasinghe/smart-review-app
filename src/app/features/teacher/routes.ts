import { Routes } from '@angular/router';

export const TEACHER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./teacher-base/teacher-base').then(m => m.TeacherBase),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./dashboard').then(m => m.Dashboard) },
      { path: 'classes', loadComponent: () => import('./classes').then(m => m.Classes) },
      { path: 'topics', loadComponent: () => import('./topics').then(m => m.Topics) },
      { path: 'reports', loadComponent: () => import('./reports').then(m => m.Reports) },
    ],
  },
];

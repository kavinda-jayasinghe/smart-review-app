import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard'; // Ensure this path matches the actual file location

export const routes: Routes = [
  // Default → Login
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  // Public auth routes (lazy)
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/routes').then(m => m.AUTH_ROUTES),
  },

  // Guarded application area with shell layout
  {
    path: 'app',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./core/layout/app-layout').then(m => m.AppLayout),
    children: [
      // Default landing inside app
      { path: '', redirectTo: 'student/dashboard', pathMatch: 'full' },

      // Feature areas (lazy)
      {
        path: 'student',
        loadChildren: () =>
          import('./features/student/routes').then(m => m.STUDENT_ROUTES),
      },
      {
        path: 'teacher',
        loadChildren: () =>
          import('./features/teacher/routes').then(m => m.TEACHER_ROUTES),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./features/admin/routes').then(m => m.ADMIN_ROUTES),
      },

      // App-level 404
      {
        path: '**',
        loadComponent: () =>
          import('./shared/components/not-found').then(m => m.NotFound),
      },
    ],
  },

  // Global 404
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/not-found').then(m => m.NotFound),
  },
];

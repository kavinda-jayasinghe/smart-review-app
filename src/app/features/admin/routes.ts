import { Routes } from '@angular/router';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { AdminTeacher } from './admin-teacher/admin-teacher';
import { AdminStudent } from './admin-student/admin-student';

export const ADMIN_ROUTES: Routes = [
  { path: 'dashboard', loadComponent: () => import('./admin-dashboard/admin-dashboard').then(m => AdminDashboard) },
  { path: 'teacher', loadComponent: () => import('./admin-teacher/admin-teacher').then(m => AdminTeacher) },
  { path: 'student', loadComponent: () => import('./admin-student/admin-student').then(m => AdminStudent) },
  // { path: 'announcements', loadComponent: () => import('./announcements').then(m => m.Announcements) },
];

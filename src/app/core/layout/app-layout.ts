import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatIconModule, MatButtonModule],
  styles: [`
    .shell { min-height: 100vh; display: flex; background: var(--mat-sys-surface); }
    .aside {
      width: 240px; background:#fff; color: #111827; padding:16px; border-right:1px solid rgba(0,0,0,.06);
      position: sticky; top:0; height:100vh; box-shadow: 0 1px 2px rgba(0,0,0,.03);
    }
    .brand { font-weight:700; font-size:18px; margin:4px 0 16px; }
    .nav { display:flex; flex-direction:column; gap:6px; }
    .link { color: #111827; text-decoration:none; padding:8px 10px; border-radius:12px; display:block; }
    .link.active { background: rgba(99,102,241,.10); color:#1f2937; }
    .section-label { font-size:12px; text-transform:uppercase; color:#6b7280; margin:8px 0 4px; }
    .main { flex:1; }
    .header {
      height:56px; border-bottom:1px solid rgba(0,0,0,.06);
      display:flex; align-items:center; justify-content:space-between; padding:0 16px;
      position: sticky; top:0; background: var(--mat-sys-surface);
      z-index: 10;
    }
    .menu-btn { display:none; }
    .content { padding:16px; max-width: 1200px; margin: 0 auto; }
    @media (max-width: 900px) {
      .aside { display: none; }
      .aside.open { display:block; position:fixed; inset:56px auto 0 0; z-index:20; }
      .menu-btn { display:inline-flex; align-items:center; gap:6px; }
    }
  `],
  template: `
  <div class="shell">
    <!-- Sidebar -->
    <aside class="aside" [class.open]="open()">
      <div class="brand">StudyReview</div>
      <nav class="nav">
        <div class="section-label">Student</div>
        <a routerLink="/app/student/dashboard"
           routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }"
           class="link">Dashboard</a>
        <a routerLink="/app/student/smart-review" routerLinkActive="active" class="link">Smart Review</a>
        <a routerLink="/app/student/logs" routerLinkActive="active" class="link">Logs</a>
        <a routerLink="/app/student/assignments" routerLinkActive="active" class="link">Assignments</a>
        <a routerLink="/app/student/classes" routerLinkActive="active" class="link">Classes</a>

        <div class="section-label">Areas</div>
        <a routerLink="/app/teacher/dashboard" routerLinkActive="active" class="link">Teacher</a>
        <a routerLink="/app/admin/dashboard" routerLinkActive="active" class="link">Admin</a>
      </nav>
    </aside>

    <!-- Main -->
    <main class="main">
      <header class="header">
        <button class="menu-btn" (click)="toggle()">Menu</button>
        <div></div>
        <div style="display:flex; gap:12px; align-items:center;">
          <button mat-icon-button aria-label="Logout" (click)="logout()" title="Logout">
            <mat-icon>logout</mat-icon>
          </button>
          <a routerLink="/app/notifications">Notifications</a>
          <a routerLink="/app/profile">Profile</a>
        </div>
      </header>

      <section class="content">
        <router-outlet />
      </section>
    </main>
  </div>
  `
})
export class AppLayout {
  open = signal(false);
  toggle() { this.open.update(v => !v); }
  private router = inject(Router);
  private auth = inject(AuthService);
  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/auth/login');
  }
}


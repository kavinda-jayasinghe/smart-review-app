import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  styles: [`
    .shell { min-height: 100vh; display: flex; }
    .aside { width: 240px; background:#111827; color:#fff; padding:16px; }
    .brand { font-weight:600; font-size:18px; margin-bottom:12px; }
    .nav { display:flex; flex-direction:column; gap:6px; }
    .link { color:#fff; text-decoration:none; padding:6px 8px; border-radius:8px; }
    .link.active { background: rgba(255,255,255,.12); }
    .main { flex:1; }
    .header {
      height:56px; border-bottom:1px solid #e5e7eb;
      display:flex; align-items:center; justify-content:space-between; padding:0 16px;
      position: sticky; top:0; background: var(--mat-sys-surface);
      z-index: 10;
    }
    .menu-btn { display:none; }
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
      <div class="brand">smart-review</div>
      <nav class="nav">
        <!-- Student quick links -->
        <a routerLink="/app/student/dashboard"
           routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }"
           class="link">Student • Dashboard</a>
        <a routerLink="/app/student/smart-review"
           routerLinkActive="active" class="link">Student • Smart Review</a>
        <a routerLink="/app/student/logs"
           routerLinkActive="active" class="link">Student • Logs</a>
        <a routerLink="/app/student/assignments"
           routerLinkActive="active" class="link">Student • Assignments</a>
        <a routerLink="/app/student/classes"
           routerLinkActive="active" class="link">Student • Classes</a>

        <hr style="border-color:rgba(255,255,255,.15); margin:10px 0;">

        <!-- Section entries -->
        <a routerLink="/app/teacher/dashboard"
           routerLinkActive="active" class="link">Teacher</a>
        <a routerLink="/app/admin/dashboard"
           routerLinkActive="active" class="link">Admin</a>
      </nav>
    </aside>

    <!-- Main -->
    <main class="main">
      <header class="header">
        <button class="menu-btn" (click)="toggle()">
          ☰ Menu
        </button>
        <div>App</div>
        <div style="display:flex; gap:12px;">
          <a routerLink="/app/notifications">🔔</a>
          <a routerLink="/app/profile">Profile</a>
        </div>
      </header>

      <section style="padding:16px;">
        <router-outlet />
      </section>
    </main>
  </div>
  `
})
export class AppLayout {
  open = signal(false);
  toggle() { this.open.update(v => !v); }
}

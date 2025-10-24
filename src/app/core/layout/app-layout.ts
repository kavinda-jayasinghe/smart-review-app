import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
  <div style="min-height:100vh; display:flex;">
    <aside style="width:240px; background:#111827; color:white; padding:16px; display:none;"
           class="md:block">
      <div style="font-weight:600; font-size:18px; margin-bottom:8px;">smart-review</div>
      <nav style="display:flex; flex-direction:column; gap:6px;">
        <a routerLink="/app/student/dashboard" style="color:white; text-decoration:none;">Student</a>
        <a routerLink="/app/teacher/dashboard" style="color:white; text-decoration:none;">Teacher</a>
        <a routerLink="/app/admin/dashboard" style="color:white; text-decoration:none;">Admin</a>
      </nav>
    </aside>

    <main style="flex:1;">
      <header style="height:56px; border-bottom:1px solid #e5e7eb; display:flex; align-items:center; justify-content:space-between; padding:0 16px;">
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

}

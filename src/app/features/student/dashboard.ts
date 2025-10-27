import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({standalone: true,
  selector: 'app-student-dashboard',
  imports: [MatCardModule, MatButtonModule, RouterLink],
  template: `
  <div class="container">
    <div class="grid-3">
      <mat-card class="card">
        <h3 class="h3">Today</h3>
        <p class="muted">Suggested reviews: 3</p>
        <a mat-raised-button color="primary" routerLink="/app/student/smart-review">Review Now</a>
      </mat-card>

      <mat-card class="card">
        <h3 class="h3">Assignments</h3>
        <p>Due this week: 2</p>
        <a mat-stroked-button routerLink="/app/student/assignments">Open</a>
      </mat-card>

      <mat-card class="card">
        <h3 class="h3">Streak</h3>
        <p>Current: 4 days 🔥</p>
      </mat-card>
    </div>
  </div>
  `
})
export class Dashboard {

}

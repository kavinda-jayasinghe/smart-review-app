import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, RouterLink, MatButtonModule, MatCardModule],
  template: `
    <mat-card>
      <h2>Login</h2>
      <!-- TODO: form -->
      <a routerLink="/auth/forgot" mat-button>Forgot password?</a>
    </mat-card>
  `
})
export class Login {

}

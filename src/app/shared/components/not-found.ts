import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="display:grid; place-items:center; min-height:60vh; text-align:center;">
      <div>
        <h1 style="margin:0 0 8px; font-size:40px;">404</h1>
        <p style="margin:0 0 16px;">Page not found</p>
        <a routerLink="/auth/login">Go to Login</a>
      </div>
    </div>
  `
})
export class NotFound {

}

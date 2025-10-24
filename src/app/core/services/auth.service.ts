import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _token = signal<string | null>(null);

  token() { return this._token(); }
  isLoggedIn() { return !!this._token(); }

  login(email: string, _password: string) {
    // TODO: replace with real API call
    const fake = 'demo.jwt.token';
    this._token.set(fake);
    return true;
  }

  logout() { this._token.set(null); }
}

import { Injectable, signal } from '@angular/core';

function readInitialToken(): string | null {
  try {
    const t = localStorage.getItem('token');
    if (t) return t;
    const authnStr = localStorage.getItem('authnResult');
    if (authnStr) {
      const parsed = JSON.parse(authnStr);
      if (parsed?.access_token) return parsed.access_token as string;
    }
    const authz = localStorage.getItem('authzData');
    if (authz) return authz;
  } catch {}
  return null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _token = signal<string | null>(typeof localStorage !== 'undefined' ? readInitialToken() : null);

  token() { return this._token(); }
  isLoggedIn() { return !!this._token(); }

  login(email: string, _password: string) {
    // TODO: replace with real API call to obtain JWT
    const fake = 'demo.jwt.token'; // replace with server token
    this.setToken(fake);
    return true;
  }

  setToken(token: string) {
    this._token.set(token);
    try { localStorage.setItem('token', token); } catch {}
  }

  logout() {
    this._token.set(null);
    try { localStorage.removeItem('token'); } catch {}
  }
}

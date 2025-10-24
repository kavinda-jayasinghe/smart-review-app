import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

class AuthServiceStub {
  // TODO: replace with your real AuthService
  isLoggedIn() { return true; } // set to false to test redirect
}

export const AuthGuard: CanActivateFn = () => {
  // Replace AuthServiceStub with your real AuthService when ready
  const auth = new AuthServiceStub();
  const router = inject(Router);

  if (auth.isLoggedIn()) return true;
  router.navigateByUrl('/auth/login');
  return false;
};

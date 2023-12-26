import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let x = localStorage.getItem('token');
  if (x !== undefined && x !== null && x !== "") {
    return true;
  }
  router.navigateByUrl('/login')
  return false;
};

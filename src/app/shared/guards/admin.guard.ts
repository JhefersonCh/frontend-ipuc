import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/localStorage.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const localStorageService: LocalStorageService = inject(LocalStorageService);
  const router: Router = inject(Router);
  const userRole = localStorageService.getUserData()?.role?.toLowerCase();

  if (userRole !== 'admin' && userRole !== 'superadmin') {
    router.navigate(['/home']);
    return false;
  }
  return true;
};

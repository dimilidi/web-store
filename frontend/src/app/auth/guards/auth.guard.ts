import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStateService } from 'src/app/services/user-state.service';

export const authGuard: CanActivateFn = (route,state) => {
  const userStateService = inject(UserStateService);
  const router = inject(Router);

  if (userStateService.currentUser?.token) {
    return true;
  } else {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false
  }
};

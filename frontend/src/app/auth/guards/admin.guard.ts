import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.currentUser?.isAdmin) {
    console.log(userService.currentUser?.isAdmin);
    
    return true;
  } else {
    router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    return false
  }
};

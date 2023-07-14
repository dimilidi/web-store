import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  console.log('userService:', userService.currentUser?.token);

  
  

  if (userService.currentUser?.token) {
    return true;
  } else {
  

    // Redirect to the login page
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false
   
  }
};

import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthenticationManagerService } from "../services/authentication-manager/authentication-manager.service";

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthenticationManagerService);
    const router = inject(Router);
    const isLoggedIn = authService.isLoggedIn();
  
    if (isLoggedIn) {
      return true;
    } else {
      router.navigate(['/unauthorized']);
      return false;
    }
}
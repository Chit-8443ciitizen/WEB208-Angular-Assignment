import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiAccessTokenService } from './api-access-token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private apiAccessTokenService: ApiAccessTokenService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const accessToken = this.apiAccessTokenService.getAccessToken();
    const routePath = route.routeConfig?.path; // lấy đường dẫn router

    if (accessToken) {
      const level = this.authService.getLevel();
      if (level === 'leader') {
        return true;
      } else if (level === 'employee') {
        if (routePath !== 'task') {
          this.router.navigate(['access-denied']);
          return false;
        }
      } else {
        this.router.navigate(['access-denied']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

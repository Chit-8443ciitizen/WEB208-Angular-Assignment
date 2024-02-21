// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { switchMap, tap } from 'rxjs';
// import { ApiAccessTokenService } from 'src/app/helper/api-access-token.service';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent {
//   username: string = '';
//   password: string = '';
//   isLoading: boolean = false;

//   constructor(
//     private authService: AuthService,
//     private toastr: ToastrService,
//     private apiAccessTokenService: ApiAccessTokenService,
//     private router: Router
//   ) {}


//   loginUser() {
//     this.isLoading = true;
//     const userData = { username: this.username, password: this.password };
//     this.authService
//       .login(userData)
//       .pipe(switchMap((response) => {
//           if (response.status === true) {
//             this.isLoading = false;
//             this.toastr.success(`${response.message}`, 'Success');
//             localStorage.setItem('accessToken', response.accessToken);
//             localStorage.setItem('refreshToken', response.refreshToken);
//             return this.apiAccessTokenService.get().pipe(
//               tap((response) => {
//                 localStorage.setItem('level', response.level);
//                 localStorage.setItem('username', response.username);
//                 this.authService.setLevel(response.level);
//                 if (response.level === 'employee') {
//                   this.router.navigateByUrl('/task');
//                 } else if (response.level === 'leader') {
//                   this.router.navigateByUrl('/');
//                 } else {
//                   this.router.navigate(['access-denied']);
//                 }
//               })
//             );
//           } else {
//             this.toastr.error(`${response.message}`, 'Error');
//             throw new Error('Login failed');
//           }
//         })
//       )
//       .subscribe(
//         () => {
//           console.log('');
//         },
//         (error) => {
//           console.log(error);
//         }
//       );
//   }
// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiAccessTokenService } from 'src/app/helper/api-access-token.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private apiAccessTokenService: ApiAccessTokenService,
    private router: Router
  ) {}

  loginUser() {
    this.isLoading = true;
    const userData = { username: this.username, password: this.password };

    this.authService.login(userData).pipe(
      switchMap(response => {
        if (response.status === true) {
          this.handleSuccessfulLogin(response);
          return this.apiAccessTokenService.get().pipe(
            tap(apiResponse => this.handleApiResponse(apiResponse))
          );
        } else {
          this.toastr.error(`${response.message}`, 'Error');
          return of(); // Ngăn chặn luồng dữ liệu tiếp tục nếu đăng nhập thất bại
        }
      }),
      catchError(error => {
        console.error(error);
        this.toastr.error('An unexpected error occurred.', 'Error');
        return of(); // Xử lý lỗi một cách an toàn
      }),
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

  private handleSuccessfulLogin(response: any) {
    this.toastr.success(`${response.message}`, 'Success');
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
  }

  private handleApiResponse(response: any) {
    localStorage.setItem('level', response.level);
    localStorage.setItem('username', response.username);
    this.authService.setLevel(response.level);
    this.navigateBasedOnRole(response.level);
  }

  private navigateBasedOnRole(level: string) {
    if (level === 'employee') {
      this.router.navigateByUrl('/task');
    } else if (level === 'leader') {
      this.router.navigateByUrl('/');
    } else {
      this.router.navigate(['access-denied']);
    }
  }
}


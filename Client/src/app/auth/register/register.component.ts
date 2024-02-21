// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { AreaService } from 'src/app/services/area.service';
// import { AuthService } from 'src/app/services/auth.service';
// import { catchError, finalize } from 'rxjs/operators';
// import { throwError } from 'rxjs';


// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css'],
// })
// export class RegisterComponent implements OnInit {
//   username: string = '';
//   email: string = '';
//   area: string = '';
//   password: string = '';
//   isLoading: boolean = false;
//   areas: any;

//   constructor(
//     private authService: AuthService,
//     private areaService: AreaService,
//     private toastr: ToastrService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.getArea();
//   }

//   getArea() {
//     this.areaService.get()
//       .pipe(
//         catchError(error => {
//           console.error(error);
//           return throwError('An error occurred while fetching areas.');
//         })
//       )
//       .subscribe(
//         (response: any) => {
//           this.areas = response;
//         }
//       );
//   }

//   registerUser() {
//     this.isLoading = true;
//     const userData = {
//       username: this.username,
//       email: this.email,
//       area: this.area,
//       password: this.password,
//     };
//     this.authService.register(userData)
//       .pipe(
//         finalize(() => this.isLoading = false)
//       )
//       .subscribe(
//         (response: any) => {
//           if (response.status === true) {
//             this.toastr.success(response.message, 'Success');
//             this.router.navigate(['/login']);
//           } else {
//             this.toastr.error(response.message, 'Error');
//           }
//         },
//         (error) => {
//           console.error(error);
//         }
//       );
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AreaService } from 'src/app/services/area.service';
import { AuthService } from 'src/app/services/auth.service';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface Area {
  // Giả định cấu trúc của một Area, cần thay đổi dựa trên cấu trúc thực tế
  _id: number;
  name: string;
}

interface RegisterResponse {
  status: boolean;
  message: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  username: string = '';
  email: string = '';
  area: string = '';
  password: string = '';
  isLoading: boolean = false;
  areas: Area[] = []; // Sử dụng array của Area

  constructor(
    private authService: AuthService,
    private areaService: AreaService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getArea();
  }

  getArea(): void {
    this.areaService.get().pipe(
      catchError(error => {
        console.error(error);
        this.toastr.error('An error occurred while fetching areas.', 'Error');
        return throwError('An error occurred while fetching areas.');
      })
    ).subscribe((response: Area[]) => {
      this.areas = response;
    });
  }

  registerUser(): void {
    this.isLoading = true;
    const userData = { username: this.username, email: this.email, area: this.area, password: this.password };
    this.authService.register(userData).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      (response: RegisterResponse) => {
        if (response.status) {
          this.toastr.success(response.message, 'Success');
          this.router.navigate(['/login']);
        } else {
          this.toastr.error(response.message, 'Error');
        }
      },
      (error) => {
        console.error(error);
        this.toastr.error('An error occurred during registration.', 'Error');
      }
    );
  }
}

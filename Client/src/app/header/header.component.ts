import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ApiAccessTokenService } from '../helper/api-access-token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  username: string = '';
  email: string = '';
  area: string = '';
  level: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private apiAccessTokenService: ApiAccessTokenService,
    private toastr: ToastrService
  ) {}

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('level');
    this.authService.setLevel(null);
    this.router.navigate(['/login']);
  }

  onClickEdit() {
    this.apiAccessTokenService.getUserInfo().subscribe(
      (response) => {
        // console.log(response);
        this.username = response.username;
        this.email = response.email;
        this.area = response.area;
        this.level = response.level;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateUserInfo() {
    const updatedUserInfo = {
      username: this.username,
      email: this.email,
      area: this.area,
      level: this.level
    };
  
    this.apiAccessTokenService.updateUserInfo(updatedUserInfo).subscribe(
      (response) => {
        this.toastr.success(`${response.message}`, 'Success');
        this.username = updatedUserInfo.username;
        this.email = updatedUserInfo.email;
        this.area = updatedUserInfo.area;
        this.level = updatedUserInfo.level;
        console.log('User info updated successfully');
      },
      (error) => {
        console.log('Failed to update user info:', error);
      }
    );
  }


}

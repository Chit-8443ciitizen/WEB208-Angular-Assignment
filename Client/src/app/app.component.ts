import { Component, OnInit } from '@angular/core';
import { ApiAccessTokenService } from './helper/api-access-token.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'QLDA';
  level: string = "";
  constructor(private apiAccessTokenService: ApiAccessTokenService, private authService: AuthService) {}

  ngOnInit() {
    // Gọi hàm refreshToken khi ứng dụng khởi chạy hoặc sau mỗi lần hết hạn AccessToken
    // this.authService.level.subscribe((level) => {
    //   this.level = level || "";
    //   // console.log(this.level);
    // });
    // this.level = this.authService.getLevel() || "";
    console.log(localStorage.getItem('level'));
    console.log(localStorage.getItem('username'));
    this.refreshToken();
  }

  refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      this.apiAccessTokenService.refreshToken(refreshToken).subscribe(
        (response) => {
          const accessToken = response.accessToken;
          // Cập nhật access token mới trong localStorage
          localStorage.setItem('accessToken', accessToken);
          console.log('Access token refreshed');
        },
        (error) => {
          console.log('Failed to refresh access token', error);
        }
      );
    }
  }
}

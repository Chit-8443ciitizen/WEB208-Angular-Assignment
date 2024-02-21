import { Component, OnInit } from '@angular/core';
import { ApiAccessTokenService } from './helper/api-access-token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'HuyDev';
  constructor(private apiAccessTokenService: ApiAccessTokenService) {}

  ngOnInit() {
    // Gọi hàm refreshToken khi ứng dụng khởi chạy hoặc sau mỗi lần hết hạn AccessToken
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

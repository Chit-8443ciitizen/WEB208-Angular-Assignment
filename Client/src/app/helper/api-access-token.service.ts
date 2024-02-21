import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiAccessTokenService {
  private baseURL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  createAuthHeader(): HttpHeaders {
    const accessToken = this.getAccessToken();
    return new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
  }

  get(): Observable<any> {
    const headers = this.createAuthHeader();
    return this.http.get(`${this.baseURL}/verifyAccessToken`, { headers });
  }

  getUserInfo(): Observable<any> {
    const headers = this.createAuthHeader();
    return this.http.get(`${this.baseURL}/user`, { headers });
  }

  updateUserInfo(userInfo: any): Observable<any> {
    const headers = this.createAuthHeader();
    return this.http.put(`${this.baseURL}/updateUser`, userInfo, { headers });
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/refreshToken`, {
      refreshToken,
    });
  }
}

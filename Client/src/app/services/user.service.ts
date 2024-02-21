import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiAccessTokenService } from '../helper/api-access-token.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseURL = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private apiAccessTokenService: ApiAccessTokenService
  ) {}

  get(): Observable<any> {
    const headers = this.apiAccessTokenService.createAuthHeader();
    return this.http.get(`${this.baseURL}/getUsers`, { headers });
  }

  getUserId(username: string): Observable<any> {
    const headers = this.apiAccessTokenService.createAuthHeader();
    return this.http.get(`${this.baseURL}/getUserId/${username}`, { headers });
  }

  getUserPage(page: number, limit: number): Observable<any> {
    const headers = this.apiAccessTokenService.createAuthHeader();
    return this.http.get(
      `${this.baseURL}/getUsers?page=${page}&limit=${limit}`,
      { headers }
    );
  }

  update(id: any, data: any): Observable<any> {
    const headers = this.apiAccessTokenService.createAuthHeader();
    return this.http.put(`${this.baseURL}/updateUser/${id}`, data, {
      headers,
    });
  }

  delete(id: any): Observable<any> {
    const headers = this.apiAccessTokenService.createAuthHeader();
    return this.http.delete(`${this.baseURL}/deleteUser/${id}`, { headers });
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ApiAccessTokenService } from '../helper/api-access-token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseURL = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private apiAccessTokenService: ApiAccessTokenService
  ) {}

  add(data: any): Observable<any> {
    const headers = this.apiAccessTokenService.createAuthHeader();
    return this.http.post(`${this.baseURL}/addTask`, data, { headers });
  }
  get(): Observable<any> {
    const headers = this.apiAccessTokenService.createAuthHeader();
    return this.http.get(`${this.baseURL}/getTasks`, { headers });
  }
  getTaskPage(page: number, limit: number): Observable<any> {
    const headers = this.apiAccessTokenService.createAuthHeader();
    return this.http.get(
      `${this.baseURL}/getTasks?page=${page}&limit=${limit}`,
      { headers }
    );
  }

  getTaskPageUser(page: number, limit: number, _id: string): Observable<any> {
    const headers = this.apiAccessTokenService.createAuthHeader();
    return this.http.get(
      `${this.baseURL}/getTasks?_id=${_id}&page=${page}&limit=${limit}`,
      { headers }
    );
  }

  getID(id: any): Observable<any> {
    const headers = this.apiAccessTokenService.createAuthHeader();
    return this.http.get(`${this.baseURL}/getIDTask/${id}`, { headers });
  }

  update(id: any, data: any): Observable<any> {
    const headers = this.apiAccessTokenService.createAuthHeader();
    return this.http.put(`${this.baseURL}/updateTask/${id}`, data, { headers });
  }

  delete(id: any): Observable<any> {
    const headers = this.apiAccessTokenService.createAuthHeader();
    return this.http.delete(`${this.baseURL}/deleteTask/${id}`, { headers });
  }
}

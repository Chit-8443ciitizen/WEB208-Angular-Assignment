import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiAccessTokenService } from '../helper/api-access-token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseURL = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private apiAccessTokenService: ApiAccessTokenService
  ) {}

  add(data: any): Observable<any> {
    const headers = this.apiAccessTokenService.createAuthHeader();
    return this.http.post(`${this.baseURL}/addProject`, data, { headers });
  }

  get(): Observable<any> {
    const headers = this.apiAccessTokenService.createAuthHeader();
    return this.http.get(`${this.baseURL}/getProjects`, { headers });
  }

  getProjectPage(page: number, limit: number): Observable<any> {
    const headers = this.apiAccessTokenService.createAuthHeader();
    return this.http.get(
      `${this.baseURL}/getProjects?page=${page}&limit=${limit}`,
      { headers }
    );
  }

  getSelect(selectedValue: any): Observable<any> {
    const headers = this.apiAccessTokenService.createAuthHeader();
    const params = { huydev: selectedValue };
    return this.http.get(`${this.baseURL}/getProjects`, { headers, params });
  }

  getID(id: any): Observable<any> {
    const headers = this.apiAccessTokenService.createAuthHeader();
    return this.http.get(`${this.baseURL}/getIDProject/${id}`, { headers });
  }

  update(id: any, data: any): Observable<any> {
    const headers = this.apiAccessTokenService.createAuthHeader();
    return this.http.put(`${this.baseURL}/updateProject/${id}`, data, {
      headers,
    });
  }

  delete(id: any): Observable<any> {
    const headers = this.apiAccessTokenService.createAuthHeader();
    return this.http.delete(`${this.baseURL}/deleteProject/${id}`, { headers });
  }
}

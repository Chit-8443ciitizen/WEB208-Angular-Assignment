import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiAccessTokenService } from '../helper/api-access-token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  private baseURL = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private apiAccessTokenService: ApiAccessTokenService
  ) {}
  get(): Observable<any> {
    return this.http.get(`${this.baseURL}/getAreas`);
  }

  getAreaPage(page: number, limit: number): Observable<any> {
    const headers = this.apiAccessTokenService.createAuthHeader();
    return this.http.get(
      `${this.baseURL}/getAreas?page=${page}&limit=${limit}`,
      { headers }
    );
  }
  add(data: any): Observable<any> {
    const headers = this.apiAccessTokenService.createAuthHeader();
    return this.http.post(`${this.baseURL}/addArea`, data, { headers });
  }

  update(id: any, data: any): Observable<any> {
    const headers = this.apiAccessTokenService.createAuthHeader();
    return this.http.put(`${this.baseURL}/updateArea/${id}`, data, {
      headers,
    });
  }

  delete(id: any): Observable<any> {
    const headers = this.apiAccessTokenService.createAuthHeader();
    return this.http.delete(`${this.baseURL}/deleteArea/${id}`, { headers });
  }
}

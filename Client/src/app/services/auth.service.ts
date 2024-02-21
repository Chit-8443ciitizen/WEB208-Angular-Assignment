import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = environment.apiUrl;
  private levelSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  constructor(private http: HttpClient) {
    const storedLevel = localStorage.getItem('level');
    this.levelSubject = new BehaviorSubject<string | null>(storedLevel);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseURL}/register`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.baseURL}/login`, userData);
  }

  //  load khi vô nó hiển thị luôn

  huyit = this.levelSubject.asObservable();
  getLevel(): string | null {
    return this.levelSubject.getValue();
  }
  setLevel(level: string | null) {
    this.levelSubject.next(level);
  }

  // get users
  
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseURL}/getUsers`);
  }



}

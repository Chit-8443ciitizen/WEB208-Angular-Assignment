// mongodb-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MongoDBAPIService {
  private apiUrl = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-wwrwc/endpoint/data/v1/action/findOne';

  constructor(private http: HttpClient) {}

  findOne(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'Yn0zHwqzRf8bYe8bSDot9WdiOzuxYsTJrcQhhNm72ISiazFZWalb5OaYoXcUV7tj',
    });

    const data = {
      collection: 'images',
      database: 'game_pokemon',
      dataSource: 'AtlasCluster',
      projection: { "_id": 1 }
    };

    return this.http.post<any>(this.apiUrl, data, { headers });
  }
}

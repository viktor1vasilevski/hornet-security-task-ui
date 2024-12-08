import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpaceXService {

  constructor(private http: HttpClient) {}

  getLaunches(type: 'past' | 'latest' | 'upcoming'): Observable<any> {
    let baseUrl = "https://localhost:44340/api/spacex"
    if(type == 'past' || type == 'upcoming') {
      baseUrl = baseUrl + '/launches'
    }
    return this.http.get(`${baseUrl}/${type}`);
  }
}

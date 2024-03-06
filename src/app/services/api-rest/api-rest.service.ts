import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiRestService {
  constructor(private readonly http: HttpClient) {}

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  public post<T, U>(url: string, body: U): Observable<T> {
    return this.http.post<T>(url, body);
  }

  public delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}

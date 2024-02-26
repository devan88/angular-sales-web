import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.webapi.baseUrl;

  constructor(private http: HttpClient) {}

  public get<T>(
    url: string,
    params = new HttpParams(),
    headers = new HttpHeaders(),
  ): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${url}`, {
      headers: headers,
      params: params,
    });
  }

  public put<TRequest, TResponse>(
    url: string,
    body: TRequest,
    params = new HttpParams(),
    headers = new HttpHeaders(),
  ): Observable<HttpEvent<TResponse>> {
    return this.http.put<TResponse>(`${this.baseUrl}/${url}`, body, {
      headers: headers,
      params: params,
      observe: 'response',
    });
  }
}

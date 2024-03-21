import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filmCard } from '../models/film';


@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private apiUrl = ' http://localhost:3000/films'

  constructor(private http: HttpClient) { }

  getall(): Observable<filmCard[]> {
    return this.http.get<filmCard[]>(this.apiUrl)
  }

  getById(id: number): Observable<filmCard> {
    return this.http.get<filmCard>(`${this.apiUrl}/${id}`)
  }

  addFilm(request: filmCard): Observable<filmCard> {
    return this.http.post<filmCard>(this.apiUrl, request);
  }

  deletFilm(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

  uptadeFilm(request: filmCard, id: number): Observable<filmCard> {
    return this.http.put<filmCard>(`${this.apiUrl}/${id}`, request)
  }
}

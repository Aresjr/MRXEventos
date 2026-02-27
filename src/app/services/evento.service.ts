import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Evento } from '../models/evento.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private apiUrl = environment.apiUrl;
  private eventosSubject = new BehaviorSubject<Evento[]>([]);
  public eventos$ = this.eventosSubject.asObservable();

  constructor(private http: HttpClient) {
    this.carregarEventos();
  }

  carregarEventos(): void {
    this.http.get<Evento[]>(this.apiUrl).pipe(
      catchError(() => of([]))
    ).subscribe({
      next: (data) => {
        this.eventosSubject.next(data);
      }
    });
  }

  getEventos(): Observable<Evento[]> {
    return this.eventos$;
  }

  adicionarEvento(evento: Omit<Evento, 'id'>): Observable<Evento> {
    return this.http.post<Evento>(this.apiUrl, evento).pipe(
      tap(() => this.carregarEventos())
    );
  }

  atualizarEvento(evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${this.apiUrl}/${evento.id}`, evento).pipe(
      tap(() => this.carregarEventos())
    );
  }

  excluirEvento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.carregarEventos())
    );
  }
}


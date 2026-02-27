import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Evento } from '../models/evento.model';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private eventosSubject = new BehaviorSubject<Evento[]>([]);
  public eventos$ = this.eventosSubject.asObservable();
  private readonly STORAGE_KEY = 'mrx_eventos';
  private initialized = false;

  constructor(private http: HttpClient) {
    this.carregarEventos();
  }

  carregarEventos(): void {
    if (this.initialized) {
      return;
    }

    // Primeiro tenta carregar do localStorage
    const eventosLocal = this.getEventosFromLocalStorage();

    if (eventosLocal && eventosLocal.length > 0) {
      this.eventosSubject.next(eventosLocal);
      this.initialized = true;
    } else {
      // Se não houver no localStorage, carrega do JSON inicial
      this.http.get<Evento[]>('assets/data/eventos.json').pipe(
        catchError(() => of([]))
      ).subscribe({
        next: (data) => {
          this.eventosSubject.next(data);
          this.saveEventosToLocalStorage(data);
          this.initialized = true;
        }
      });
    }
  }

  getEventos(): Observable<Evento[]> {
    return this.eventos$;
  }

  adicionarEvento(evento: Omit<Evento, 'id'>): Observable<Evento> {
    const eventos = this.eventosSubject.value;
    const novoId = eventos.length > 0 ? Math.max(...eventos.map(e => e.id)) + 1 : 1;
    const novoEvento: Evento = { ...evento, id: novoId };

    const novosEventos = [...eventos, novoEvento];
    this.eventosSubject.next(novosEventos);
    this.saveEventosToLocalStorage(novosEventos);

    return of(novoEvento);
  }

  atualizarEvento(evento: Evento): Observable<Evento> {
    const eventos = this.eventosSubject.value;
    const index = eventos.findIndex(e => e.id === evento.id);

    if (index !== -1) {
      eventos[index] = evento;
      this.eventosSubject.next([...eventos]);
      this.saveEventosToLocalStorage(eventos);
      return of(evento);
    }

    return of(evento);
  }

  excluirEvento(id: number): Observable<boolean> {
    const eventos = this.eventosSubject.value;
    const novosEventos = eventos.filter(e => e.id !== id);

    this.eventosSubject.next(novosEventos);
    this.saveEventosToLocalStorage(novosEventos);

    return of(true);
  }

  private getEventosFromLocalStorage(): Evento[] | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  private saveEventosToLocalStorage(eventos: Evento[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(eventos));
  }
}


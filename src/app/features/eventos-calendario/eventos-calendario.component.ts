import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Evento } from '../../models/evento.model';
import { EventoCardComponent } from '../evento-card/evento-card.component';

@Component({
  selector: 'app-eventos-calendario',
  imports: [CommonModule, EventoCardComponent],
  templateUrl: './eventos-calendario.component.html',
  styleUrl: './eventos-calendario.component.scss'
})
export class EventosCalendarioComponent implements OnInit {
  eventos: Evento[] = [];
  eventosFuturos: Evento[] = [];
  eventosPassados: Evento[] = [];
  selectedYear: number = 2025;
  selectedMonth: number | null = null;
  years: number[] = [2025, 2026];

  meses = [
    { numero: 0, nome: 'Janeiro' },
    { numero: 1, nome: 'Fevereiro' },
    { numero: 2, nome: 'Março' },
    { numero: 3, nome: 'Abril' },
    { numero: 4, nome: 'Maio' },
    { numero: 5, nome: 'Junho' },
    { numero: 6, nome: 'Julho' },
    { numero: 7, nome: 'Agosto' },
    { numero: 8, nome: 'Setembro' },
    { numero: 9, nome: 'Outubro' },
    { numero: 10, nome: 'Novembro' },
    { numero: 11, nome: 'Dezembro' }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarEventos();
  }

  carregarEventos(): void {
    this.http.get<Evento[]>('assets/data/eventos.json').subscribe({
      next: (data) => {
        this.eventos = data.sort((a, b) =>
          new Date(b.data).getTime() - new Date(a.data).getTime()
        );
        this.separarEventos();
      },
      error: (error) => {
        console.error('Erro ao carregar eventos:', error);
      }
    });
  }

  separarEventos(): void {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    this.eventosFuturos = this.eventos.filter(evento => {
      const dataEvento = new Date(evento.data + 'T00:00:00');
      return dataEvento >= hoje;
    }).sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

    this.eventosPassados = this.eventos.filter(evento => {
      const dataEvento = new Date(evento.data + 'T00:00:00');
      return dataEvento < hoje;
    }).sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
  }

  get eventosFiltrados(): Evento[] {
    return this.eventos.filter(evento => {
      const dataEvento = new Date(evento.data + 'T00:00:00');
      const anoCorreto = dataEvento.getFullYear() === this.selectedYear;

      if (this.selectedMonth === null) {
        return anoCorreto;
      }

      return anoCorreto && dataEvento.getMonth() === this.selectedMonth;
    });
  }

  get eventosFuturosFiltrados(): Evento[] {
    if (this.selectedMonth === null) {
      return this.eventosFuturos;
    }

    return this.eventosFuturos.filter(evento => {
      const dataEvento = new Date(evento.data + 'T00:00:00');
      return dataEvento.getMonth() === this.selectedMonth &&
             dataEvento.getFullYear() === this.selectedYear;
    });
  }

  get eventosPassadosFiltrados(): Evento[] {
    if (this.selectedMonth === null) {
      return this.eventosPassados;
    }

    return this.eventosPassados.filter(evento => {
      const dataEvento = new Date(evento.data + 'T00:00:00');
      return dataEvento.getMonth() === this.selectedMonth &&
             dataEvento.getFullYear() === this.selectedYear;
    });
  }

  selecionarMes(mes: number | null): void {
    this.selectedMonth = mes;
  }

  selecionarAno(ano: number): void {
    this.selectedYear = ano;
    this.selectedMonth = null; // Reset month when changing year
  }

  getEventosDoMes(mes: number): number {
    return this.eventos.filter(evento => {
      const dataEvento = new Date(evento.data + 'T00:00:00');
      return dataEvento.getMonth() === mes && dataEvento.getFullYear() === this.selectedYear;
    }).length;
  }

  temEventosNoMes(mes: number): boolean {
    return this.getEventosDoMes(mes) > 0;
  }

  // Verifica se o evento já passou
  isEventoPast(evento: Evento): boolean {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataEvento = new Date(evento.data + 'T00:00:00');
    return dataEvento < hoje;
  }
}

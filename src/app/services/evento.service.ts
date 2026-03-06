import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Evento } from '../models/evento.model';
import { getSupabaseClient } from '../core/supabase.client';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private supabase = getSupabaseClient();
  private eventosSubject = new BehaviorSubject<Evento[]>([]);
  public eventos$ = this.eventosSubject.asObservable();
  private readonly TABLE_NAME = 'eventos';

  constructor() {
    this.carregarEventos();
  }

  carregarEventos(): void {
    from(
      this.supabase
        .from(this.TABLE_NAME)
        .select('*')
        .order('data', { ascending: false })
    ).subscribe({
      next: ({ data, error }) => {
        if (error) {
          console.error('Erro ao carregar eventos:', error);
          return;
        }
        this.eventosSubject.next(data || []);
      }
    });
  }

  getEventos(): Observable<Evento[]> {
    return this.eventos$;
  }

  adicionarEvento(evento: Omit<Evento, 'id'>): Observable<Evento> {
    return from(
      this.supabase
        .from(this.TABLE_NAME)
        .insert([evento as any])
        .select()
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Evento;
      }),
      tap(() => this.carregarEventos())
    );
  }

  atualizarEvento(evento: Evento): Observable<Evento> {
    return from(
      this.supabase
        .from(this.TABLE_NAME)
        .update(evento as any)
        .eq('id', evento.id)
        .select()
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Evento;
      }),
      tap(() => this.carregarEventos())
    );
  }

  excluirEvento(id: number): Observable<void> {
    return from(
      this.supabase
        .from(this.TABLE_NAME)
        .delete()
        .eq('id', id)
    ).pipe(
      map(({ error }) => {
        if (error) throw error;
      }),
      tap(() => this.carregarEventos())
    );
  }

  // Upload de imagem para Supabase Storage
  async uploadFoto(file: File, eventoId: number): Promise<string> {
    const fileName = `${eventoId}/${Date.now()}_${file.name}`;
    const { error } = await this.supabase.storage
      .from('eventos-fotos')
      .upload(fileName, file);

    if (error) throw error;

    // Obter URL pública
    const { data: urlData } = this.supabase.storage
      .from('eventos-fotos')
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  }

  // Deletar foto do Storage
  async deletarFoto(fotoUrl: string): Promise<void> {
    // Extrair o caminho do arquivo da URL
    const urlParts = fotoUrl.split('/eventos-fotos/');
    if (urlParts.length < 2) return;

    const filePath = urlParts[1];
    const { error } = await this.supabase.storage
      .from('eventos-fotos')
      .remove([filePath]);

    if (error) throw error;
  }
}


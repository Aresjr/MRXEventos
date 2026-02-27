import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  eventos: Evento[] = [];

  novoEvento = {
    titulo: '',
    data: '',
    localizacao: '',
    fotos: [] as string[]
  };

  fotosPreview: string[] = [];
  mensagem = '';
  mensagemTipo: 'success' | 'error' = 'success';

  constructor(private eventoService: EventoService) {}

  ngOnInit(): void {
    this.carregarEventos();
  }

  carregarEventos(): void {
    this.eventoService.getEventos().subscribe({
      next: (eventos) => {
        this.eventos = eventos.sort((a, b) =>
          new Date(b.data).getTime() - new Date(a.data).getTime()
        );
      }
    });
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;

    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          const dataUrl = e.target.result;
          this.fotosPreview.push(dataUrl);
          this.novoEvento.fotos.push(dataUrl);
        };

        reader.readAsDataURL(file);
      });
    }
  }

  removerFoto(index: number): void {
    this.fotosPreview.splice(index, 1);
    this.novoEvento.fotos.splice(index, 1);
  }

  salvarEvento(): void {
    if (!this.novoEvento.titulo || !this.novoEvento.data) {
      this.mostrarMensagem('Por favor, preencha nome e data do evento', 'error');
      return;
    }

    this.eventoService.adicionarEvento(this.novoEvento).subscribe({
      next: () => {
        this.mostrarMensagem('Evento cadastrado com sucesso!', 'success');
        this.limparFormulario();
        this.carregarEventos();
      },
      error: () => {
        this.mostrarMensagem('Erro ao cadastrar evento', 'error');
      }
    });
  }

  excluirEvento(id: number): void {
    if (confirm('Tem certeza que deseja excluir este evento?')) {
      this.eventoService.excluirEvento(id).subscribe({
        next: () => {
          this.mostrarMensagem('Evento excluído com sucesso!', 'success');
          this.carregarEventos();
        },
        error: () => {
          this.mostrarMensagem('Erro ao excluir evento', 'error');
        }
      });
    }
  }

  limparFormulario(): void {
    this.novoEvento = {
      titulo: '',
      data: '',
      localizacao: '',
      fotos: []
    };
    this.fotosPreview = [];
  }

  private mostrarMensagem(texto: string, tipo: 'success' | 'error'): void {
    this.mensagem = texto;
    this.mensagemTipo = tipo;
    setTimeout(() => {
      this.mensagem = '';
    }, 3000);
  }
}


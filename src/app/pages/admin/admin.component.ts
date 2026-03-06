import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EventoService } from '../../services/evento.service';
import { AuthService } from '../../services/auth.service';
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
  userEmail = '';

  novoEvento = {
    titulo: '',
    data: '',
    localizacao: '',
    fotos: [] as string[]
  };

  fotosParaUpload: File[] = [];
  fotosPreview: string[] = [];
  mensagem = '';
  mensagemTipo: 'success' | 'error' = 'success';
  uploadingFotos = false;

  constructor(
    private eventoService: EventoService,
    private authService: AuthService,
    private router: Router
  ) {
    const user = this.authService.getCurrentUser();
    this.userEmail = user?.email || '';
  }

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
      this.fotosParaUpload = Array.from(files);
      this.fotosPreview = [];

      // Criar previews
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.fotosPreview.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removerFoto(index: number): void {
    this.fotosPreview.splice(index, 1);
    this.fotosParaUpload.splice(index, 1);
  }

  async salvarEvento(): Promise<void> {
    if (!this.novoEvento.titulo || !this.novoEvento.data) {
      this.mostrarMensagem('Por favor, preencha nome e data do evento', 'error');
      return;
    }

    try {
      // Primeiro, criar o evento
      this.eventoService.adicionarEvento(this.novoEvento).subscribe({
        next: async (eventoSalvo) => {
          // Se há fotos para upload, fazer o upload
          if (this.fotosParaUpload.length > 0) {
            this.uploadingFotos = true;
            const fotosUrls: string[] = [];

            try {
              for (const foto of this.fotosParaUpload) {
                const url = await this.eventoService.uploadFoto(foto, eventoSalvo.id);
                fotosUrls.push(url);
              }

              // Atualizar evento com as URLs das fotos
              eventoSalvo.fotos = fotosUrls;
              this.eventoService.atualizarEvento(eventoSalvo).subscribe({
                next: () => {
                  this.uploadingFotos = false;
                  this.mostrarMensagem('Evento cadastrado com sucesso!', 'success');
                  this.limparFormulario();
                  this.carregarEventos();
                },
                error: (error) => {
                  console.error('Erro ao atualizar evento com fotos:', error);
                  this.uploadingFotos = false;
                  this.mostrarMensagem('Evento salvo mas erro ao adicionar fotos', 'error');
                }
              });
            } catch (error) {
              console.error('Erro ao fazer upload das fotos:', error);
              this.uploadingFotos = false;
              this.mostrarMensagem('Evento salvo mas erro ao fazer upload das fotos', 'error');
            }
          } else {
            this.mostrarMensagem('Evento cadastrado com sucesso!', 'success');
            this.limparFormulario();
            this.carregarEventos();
          }
        },
        error: (error) => {
          console.error('Erro ao cadastrar evento:', error);
          this.mostrarMensagem('Erro ao cadastrar evento', 'error');
        }
      });
    } catch (error) {
      console.error('Erro:', error);
      this.mostrarMensagem('Erro ao cadastrar evento', 'error');
    }
  }

  excluirEvento(evento: Evento): void {
    if (confirm('Tem certeza que deseja excluir este evento?')) {
      // Deletar fotos primeiro
      if (evento.fotos && evento.fotos.length > 0) {
        evento.fotos.forEach(async (fotoUrl) => {
          try {
            await this.eventoService.deletarFoto(fotoUrl);
          } catch (error) {
            console.error('Erro ao deletar foto:', error);
          }
        });
      }

      // Depois deletar o evento
      this.eventoService.excluirEvento(evento.id).subscribe({
        next: () => {
          this.mostrarMensagem('Evento excluído com sucesso!', 'success');
          this.carregarEventos();
        },
        error: (error) => {
          console.error('Erro ao excluir evento:', error);
          this.mostrarMensagem('Erro ao excluir evento', 'error');
        }
      });
    }
  }

  async logout(): Promise<void> {
    await this.authService.signOut();
    this.router.navigate(['/login']);
  }

  limparFormulario(): void {
    this.novoEvento = {
      titulo: '',
      data: '',
      localizacao: '',
      fotos: []
    };
    this.fotosPreview = [];
    this.fotosParaUpload = [];
  }

  private mostrarMensagem(texto: string, tipo: 'success' | 'error'): void {
    this.mensagem = texto;
    this.mensagemTipo = tipo;
    setTimeout(() => {
      this.mensagem = '';
    }, 3000);
  }
}


import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Evento } from '../../models/evento.model';

@Component({
  selector: 'app-evento-card',
  imports: [CommonModule],
  templateUrl: './evento-card.component.html',
  styleUrl: './evento-card.component.scss'
})
export class EventoCardComponent implements OnDestroy {
  @Input() evento!: Evento;
  @Input() isPastEvent: boolean = false;

  currentPhotoIndex = 0;
  private autoplayInterval: any;

  ngOnInit(): void {
    if (this.evento && this.evento.fotos.length > 1) {
      this.startAutoplay();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  nextPhoto(): void {
    if (this.evento.fotos.length > 0) {
      this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.evento.fotos.length;
      this.resetAutoplay();
    }
  }

  previousPhoto(): void {
    if (this.evento.fotos.length > 0) {
      this.currentPhotoIndex = this.currentPhotoIndex === 0
        ? this.evento.fotos.length - 1
        : this.currentPhotoIndex - 1;
      this.resetAutoplay();
    }
  }

  goToPhoto(index: number): void {
    this.currentPhotoIndex = index;
    this.resetAutoplay();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  private startAutoplay(): void {
    this.autoplayInterval = setInterval(() => {
      this.nextPhoto();
    }, 4000);
  }

  private stopAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  private resetAutoplay(): void {
    this.stopAutoplay();
    if (this.evento.fotos.length > 1) {
      this.startAutoplay();
    }
  }
}

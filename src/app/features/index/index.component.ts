import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  imports: [CommonModule],
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  slides: string[] = [];
  currentYear = new Date().getFullYear();
  private autoplayInterval: any;
  private touchStartX = 0;
  private touchEndX = 0;

  constructor() {
    // Carrega todas as imagens da pasta eventos dinamicamente
    // Ajuste o número conforme a quantidade de imagens que você tem
    this.loadSlides();
  }

  private loadSlides(): void {
    // Detecta automaticamente imagens de 1.jpg até que não encontre mais
    // Você pode aumentar o limite se tiver mais imagens
    const maxImages = 50; // Limite de busca
    for (let i = 1; i <= maxImages; i++) {
      this.slides.push(`assets/imagens/eventos/${i}.jpg`);
    }
    // Por enquanto carregamos apenas as 6 imagens existentes
    this.slides = this.slides.slice(0, 6);
  }

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  nextSlide(): void {
    this.currentSlide = this.currentSlide === this.slides.length - 1 ? 0 : this.currentSlide + 1;
    this.resetAutoplay();
  }

  previousSlide(): void {
    this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
    this.resetAutoplay();
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  onMouseDown(event: MouseEvent): void {
    this.touchStartX = event.screenX;
  }

  onMouseUp(event: MouseEvent): void {
    this.touchEndX = event.screenX;
    this.handleSwipe();
  }

  private handleSwipe(): void {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe para esquerda - próximo slide
        this.nextSlide();
      } else {
        // Swipe para direita - slide anterior
        this.previousSlide();
      }
    }
  }

  private resetAutoplay(): void {
    this.stopAutoplay();
    this.startAutoplay();
  }

  private startAutoplay(): void {
    this.autoplayInterval = setInterval(() => {
      this.currentSlide = this.currentSlide === this.slides.length - 1 ? 0 : this.currentSlide + 1;
    }, 3000); // Troca a cada 3 segundos
  }

  private stopAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }
}

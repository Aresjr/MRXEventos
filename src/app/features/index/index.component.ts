import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-index',
  imports: [],
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit, OnDestroy {
  currentSlide = 1;
  private autoplayInterval: any;
  private touchStartX = 0;
  private touchEndX = 0;

  constructor() {}

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  nextSlide(): void {
    this.currentSlide = this.currentSlide === 3 ? 1 : this.currentSlide + 1;
    this.resetAutoplay();
  }

  previousSlide(): void {
    this.currentSlide = this.currentSlide === 1 ? 3 : this.currentSlide - 1;
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
      this.currentSlide = this.currentSlide === 3 ? 1 : this.currentSlide + 1;
    }, 3000); // Troca a cada 3 segundos
  }

  private stopAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }
}

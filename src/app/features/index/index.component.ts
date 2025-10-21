import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-index',
  imports: [],
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit, OnDestroy {
  private currentSlide = 1;
  private autoplayInterval: any;

  constructor() {}

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  private startAutoplay(): void {
    this.autoplayInterval = setInterval(() => {
      this.currentSlide = this.currentSlide === 3 ? 1 : this.currentSlide + 1;
      window.location.hash = `slide${this.currentSlide}`;
    }, 3000); // Troca a cada 3 segundos
  }

  private stopAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }
}

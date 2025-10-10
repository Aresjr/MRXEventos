import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-template1',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './template1.component.html',
  styleUrl: './template1.component.scss'
})
export class Template1Component implements OnInit, OnDestroy {
  contactForm: FormGroup;
  currentSlide = 0;
  private slideInterval: any;

  slides = [
    {
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&h=1080&fit=crop',
      title: 'Eventos Corporativos de Excelência',
      subtitle: 'Transformamos suas ideias em experiências memoráveis'
    },
    {
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&h=1080&fit=crop',
      title: 'Casamentos Inesquecíveis',
      subtitle: 'Cada detalhe planejado com perfeição'
    },
    {
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&h=1080&fit=crop',
      title: 'Eventos Sociais Personalizados',
      subtitle: 'Do planejamento à execução impecável'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      eventType: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    this.startSlider();
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  startSlider() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  previousSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Formulário enviado:', this.contactForm.value);
      alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      this.contactForm.reset();
    }
  }
}

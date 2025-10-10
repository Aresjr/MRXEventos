import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-template2',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './template2.component.html',
  styleUrl: './template2.component.scss'
})
export class Template2Component {
  contactForm: FormGroup;
  activeCategory = 'all';

  structures = [
    {
      category: 'palcos',
      title: 'Palcos Profissionais',
      image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop',
      description: 'Estruturas modulares para eventos de todos os portes',
      features: ['Diversos tamanhos', 'Montagem rápida', 'Alta resistência']
    },
    {
      category: 'coberturas',
      title: 'Coberturas e Tendas',
      image: 'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=800&h=600&fit=crop',
      description: 'Proteção e conforto para seu evento',
      features: ['Modulares', 'Resistente a intempéries', 'Diversos modelos']
    },
    {
      category: 'palcos',
      title: 'Box Truss',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop',
      description: 'Estrutura treliçada de alta qualidade',
      features: ['Q30 e Q50', 'Certificação', 'Instalação segura']
    },
    {
      category: 'arquibancadas',
      title: 'Arquibancadas',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop',
      description: 'Soluções para acomodação de público',
      features: ['Modulares', 'Seguras', 'Fácil montagem']
    },
    {
      category: 'fechamentos',
      title: 'Fechamentos Laterais',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop',
      description: 'Proteção lateral para eventos',
      features: ['Diversas cores', 'Resistente', 'Personalizado']
    },
    {
      category: 'outras',
      title: 'Grades e Barreiras',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop',
      description: 'Controle de acesso e segurança',
      features: ['Alta resistência', 'Diversos tamanhos', 'Fácil instalação']
    }
  ];

  projects = [
    { image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&h=400&fit=crop', title: 'Festival de Música' },
    { image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop', title: 'Evento Corporativo' },
    { image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&h=400&fit=crop', title: 'Show Nacional' },
    { image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop', title: 'Evento Esportivo' },
    { image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop', title: 'Feira de Negócios' },
    { image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop', title: 'Convenção' }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      structureType: ['', [Validators.required]],
      eventDate: [''],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  filterStructures(category: string) {
    this.activeCategory = category;
  }

  get filteredStructures() {
    if (this.activeCategory === 'all') {
      return this.structures;
    }
    return this.structures.filter(s => s.category === this.activeCategory);
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Orçamento solicitado:', this.contactForm.value);
      alert('Solicitação enviada! Entraremos em contato em breve.');
      this.contactForm.reset();
    }
  }
}

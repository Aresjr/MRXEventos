import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { HttpClient } from '@angular/common/http';

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  type: string;
}

@Component({
  selector: 'app-template1',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './template1.component.html',
  styleUrl: './template1.component.scss'
})
export class Template1Component implements OnInit, OnDestroy {
  contactForm: FormGroup;
  currentSlide = 0;
  activeSection = 'home';
  private slideInterval: any;

  upcomingEvents: Event[] = [];
  pastEvents: Event[] = [];

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

  constructor(private fb: FormBuilder, private http: HttpClient) {
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
    this.updateActiveSection();
    this.loadEvents();
  }

  loadEvents() {
    this.http.get<Event[]>('/data/events.json').subscribe({
      next: (events) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        this.upcomingEvents = events
          .filter(event => new Date(event.date) >= today)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        this.pastEvents = events
          .filter(event => new Date(event.date) < today)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      },
      error: (error) => {
        console.error('Erro ao carregar eventos:', error);
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateActiveSection();
  }

  updateActiveSection() {
    const sections = ['home', 'about', 'services', 'contact'];
    const scrollPosition = window.scrollY + 100;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          this.activeSection = section;
          break;
        }
      }
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
      const formData = this.contactForm.value;

      // Enviar email via FormSubmit
      const emailData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        eventType: formData.eventType,
        message: formData.message,
        _subject: `Novo contato do site - ${formData.name}`,
        _cc: 'aresnemeia@gmail.com'
      };

      this.http.post('https://formsubmit.co/aresnemeia@gmail.com', emailData)
        .subscribe({
          next: () => {
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            this.contactForm.reset();
          },
          error: (error) => {
            console.error('Erro ao enviar:', error);
            alert('Erro ao enviar mensagem. Por favor, tente novamente.');
          }
        });
    }
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-template3',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './template3.component.html',
  styleUrl: './template3.component.scss'
})
export class Template3Component {
  contactForm: FormGroup;

  features = [
    { icon: 'calendar-plus', title: 'Planejamento Completo', description: 'Do conceito à execução' },
    { icon: 'users', title: 'Equipe Dedicada', description: 'Profissionais experientes' },
    { icon: 'heart-handshake', title: 'Atendimento Personalizado', description: 'Foco nas suas necessidades' },
    { icon: 'calculator', title: 'Orçamento Transparente', description: 'Sem custos ocultos' }
  ];

  services = [
    { title: 'Eventos Corporativos', items: ['Convenções', 'Palestras', 'Workshops', 'Team Building'] },
    { title: 'Eventos Sociais', items: ['Casamentos', 'Aniversários', 'Formaturas', 'Confraternizações'] },
    { title: 'Eventos Culturais', items: ['Shows', 'Exposições', 'Festivais', 'Lançamentos'] }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      alert('Mensagem enviada com sucesso!');
      this.contactForm.reset();
    }
  }
}

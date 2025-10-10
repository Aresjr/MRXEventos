import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-template6',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './template6.component.html',
  styleUrl: './template6.component.scss'
})
export class Template6Component {
  contactForm: FormGroup;

  steps = [
    { icon: 'message-square', title: 'Consulta Inicial', description: 'Conversamos sobre suas necessidades e expectativas' },
    { icon: 'clipboard-list', title: 'Planejamento', description: 'Criamos um projeto detalhado do seu evento' },
    { icon: 'users', title: 'Execução', description: 'Nossa equipe cuida de cada detalhe' },
    { icon: 'calendar-check', title: 'Sucesso', description: 'Seu evento perfeito se torna realidade' }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      eventType: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      alert('Mensagem enviada!');
      this.contactForm.reset();
    }
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-template5',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './template5.component.html',
  styleUrl: './template5.component.scss'
})
export class Template5Component {
  contactForm: FormGroup;

  services = [
    { icon: 'calendar', title: 'Casamentos', description: 'Realize o dia dos seus sonhos' },
    { icon: 'briefcase-medical', title: 'Corporativos', description: 'Eventos profissionais impecáveis' },
    { icon: 'users', title: 'Formaturas', description: 'Celebre conquistas com estilo' },
    { icon: 'heart-handshake', title: 'Aniversários', description: 'Festas inesquecíveis' }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      alert('Mensagem enviada!');
      this.contactForm.reset();
    }
  }
}

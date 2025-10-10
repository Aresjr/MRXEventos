import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-template4',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './template4.component.html',
  styleUrl: './template4.component.scss'
})
export class Template4Component {
  contactForm: FormGroup;

  stats = [
    { value: '500+', label: 'Eventos Realizados' },
    { value: '15', label: 'Anos de Experiência' },
    { value: '98%', label: 'Clientes Satisfeitos' }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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

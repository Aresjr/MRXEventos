import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contato-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contato-form.component.html',
  styleUrl: './contato-form.component.scss'
})
export class ContatoFormComponent {
  contatoForm: FormGroup;
  submitting = false;
  submitSuccess = false;
  submitError = false;

  constructor(private fb: FormBuilder) {
    this.contatoForm = this.fb.group({
      nomeEmpresa: ['', Validators.required],
      dataEvento: ['', Validators.required],
      observacoes: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contatoForm.valid) {
      this.submitting = true;
      this.submitSuccess = false;
      this.submitError = false;

      const formData = this.contatoForm.value;
      const subject = `Orçamento - ${formData.nomeEmpresa}`;
      const body = `Nome da Empresa: ${formData.nomeEmpresa}%0D%0AData do Evento: ${formData.dataEvento}%0D%0AObservações: ${formData.observacoes}`;

      // Usar mailto para abrir o cliente de email
      const mailtoLink = `mailto:rafael@mrxeventos.com.br?subject=${encodeURIComponent(subject)}&body=${body}`;
      window.location.href = mailtoLink;

      // Mostrar mensagem de sucesso e resetar formulário
      setTimeout(() => {
        this.submitting = false;
        this.submitSuccess = true;
        this.contatoForm.reset();

        // Esconder mensagem após 5 segundos
        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
      }, 500);
    } else {
      // Marcar todos os campos como touched para mostrar erros
      Object.keys(this.contatoForm.controls).forEach(key => {
        this.contatoForm.get(key)?.markAsTouched();
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contatoForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
}

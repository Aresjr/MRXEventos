import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contato-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './contato-form.component.html',
  styleUrl: './contato-form.component.scss'
})
export class ContatoFormComponent {

  constructor(private http: HttpClient) {}

  formData: any = {
    _subject: 'Novo Orçamento - Site MRX Eventos',
    _captcha: 'false',
    _template: 'table',
    _honey: '',
    nomeEmpresa: '',
    dataEvento: '',
    observacoes: ''
  };

  isLoading = false;
  success = false;
  error = false;

  getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  onSubmit(form: any) {
    if (!form.valid) return;

    this.isLoading = true;
    this.success = false;
    this.error = false;

    const url = 'https://formsubmit.co/logistica@mrxeventos.com.br';

    const body = new FormData();
    Object.entries(this.formData).forEach(([key, value]) => {
      body.append(key, value as string);
    });

    this.http.post(url, body, { responseType: 'text' }).subscribe({
      next: (success) => {
        console.log('success', success);
        this.isLoading = false;
        this.success = true;
        form.resetForm();
      },
      error: (e) => {
        console.log('error', e);
        this.isLoading = false;
        this.error = true;
      },
    });
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cep' })
export class CepPipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) return '';
    return value
      .replace(/(\d{5})(\d{3})/, '$1-$2');
  }
}

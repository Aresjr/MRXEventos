import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sexo' })
export class SexoPipe implements PipeTransform {
  transform(value: string | null): string {
    switch (value) {
      case 'M':
        return 'Masculino';
      case 'F':
        return 'Feminino';
      case 'O':
        return 'Outro';
      default:
        return 'Desconhecido';
    }
  }
}

import { AbstractControl } from '@angular/forms';

export function toggleNumber(control: AbstractControl<any>, value: number) {
  let arr: any[] = control?.value || [];
  const index = arr.indexOf(value);
  if (index > -1) {
    control.setValue(arr.filter(n => n !== value));
  } else {
    control.setValue([...arr, value]);
  }
}

export function limitLength(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const maxLength = parseInt(inputElement.getAttribute('maxlength') || '0', 10);

  if (maxLength > 0 && inputElement.value.length > maxLength) {
    inputElement.value = inputElement.value.slice(0, maxLength);
  }
}

export function autoResize(event: any) {
  const textarea = event.target;
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}

export function formatHora(date: Date): string {
  return date.toLocaleTimeString('pt', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

export function isDataNoFuturo(data: string, hora: string): boolean {
  const [ano, mes, diaNum] = data.split('-').map(Number);
  const [h, m] = hora.split(':').map(Number);
  const agendamento = new Date(ano, mes - 1, diaNum, h, m, 0, 0);
  const agora = new Date();
  return agendamento.getTime() > agora.getTime();
}


export function abrirDatePicker(input: HTMLInputElement) {
  if (input.showPicker != undefined) {
    input.showPicker();
  }
  input.focus();
}

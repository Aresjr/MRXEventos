import { EmpresaPlano } from '../features/empresa/empresa.interface';

export class ColorUtils {
  private static textColorMap: Record<string, string> = {
    'green-100': 'text-green-800',
    'blue-100': 'text-blue-800',
    'blue-500': 'text-white',
    'blue-600': 'text-white',
    'blue-800': 'text-white',
    'gray-100': 'text-gray-800',
    'orange-100': 'text-orange-800',
    'yellow-100': 'text-yellow-800',
    'red-100': 'text-red-800',
    'border-error': 'text-red-800',
    'white': 'text-gray-800'
  };

  static getTextColorClass(bgClass: string): string {
    return this.textColorMap[bgClass] || 'text-gray-800';
  }

  static getColorClasses(plano: EmpresaPlano | null): string[] {
    if (plano == null) {
      return [];
    }
    return [ 'bg-' + plano.corFundo, this.getTextColorClass(plano.corFundo) ];
  }
}

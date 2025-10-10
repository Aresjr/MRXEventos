export enum Role {
  ADMIN = 'ADMIN',
  RECEPCIONISTA = 'RECEPCIONISTA',
  MEDICO = 'MEDICO',
  FATURAMENTO = 'FATURAMENTO'
}

export const ESTADOS = [
  { sigla: 'AC', nome: 'Acre' },
  { sigla: 'AL', nome: 'Alagoas' },
  { sigla: 'AP', nome: 'Amapá' },
  { sigla: 'AM', nome: 'Amazonas' },
  { sigla: 'BA', nome: 'Bahia' },
  { sigla: 'CE', nome: 'Ceará' },
  { sigla: 'DF', nome: 'Distrito Federal' },
  { sigla: 'ES', nome: 'Espírito Santo' },
  { sigla: 'GO', nome: 'Goiás' },
  { sigla: 'MA', nome: 'Maranhão' },
  { sigla: 'MT', nome: 'Mato Grosso' },
  { sigla: 'MS', nome: 'Mato Grosso do Sul' },
  { sigla: 'MG', nome: 'Minas Gerais' },
  { sigla: 'PA', nome: 'Pará' },
  { sigla: 'PB', nome: 'Paraíba' },
  { sigla: 'PR', nome: 'Paraná' },
  { sigla: 'PE', nome: 'Pernambuco' },
  { sigla: 'PI', nome: 'Piauí' },
  { sigla: 'RJ', nome: 'Rio de Janeiro' },
  { sigla: 'RN', nome: 'Rio Grande do Norte' },
  { sigla: 'RS', nome: 'Rio Grande do Sul' },
  { sigla: 'RO', nome: 'Rondônia' },
  { sigla: 'RR', nome: 'Roraima' },
  { sigla: 'SC', nome: 'Santa Catarina' },
  { sigla: 'SP', nome: 'São Paulo' },
  { sigla: 'SE', nome: 'Sergipe' },
  { sigla: 'TO', nome: 'Tocantins' }
];

export const SEXOS = [
  { sigla: 'M', descricao: 'Masculino' },
  { sigla: 'F', descricao: 'Feminino' },
  { sigla: 'O', descricao: 'Outro' }
];

export const FORMAS_PAGAMENTO = [
  { valor: 0, descricao: 'Dinheiro' },
  { valor: 1, descricao: 'Cartão de Crédito' },
  { valor: 2, descricao: 'Cartão de Débito' },
  { valor: 3, descricao: 'Pix' },
  { valor: 4, descricao: 'Boleto' },
];

export const StatusContaReceber: Record<number, { descricao: string; cor: string }> = {
  0: { descricao: 'Aberto', cor: '#60a5fa' },
  1: { descricao: 'Pago', cor: '#14B8A6' },
  2: { descricao: 'Atrasado', cor: '#EF4444' },
  3: { descricao: 'Parcial', cor: '#A78BFA' }
}

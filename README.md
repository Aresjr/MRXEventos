# MRX Eventos

Site institucional para http://mrxeventos.com.br

## Funcionalidades

- **Página Principal**: Apresentação da empresa, carrossel de imagens, calendário de eventos
- **Calendário de Eventos**: Visualização de eventos futuros e passados com filtros por ano e mês
- **Formulário de Contato**: Permite aos visitantes entrarem em contato
- **Página de Administração**: Gerenciamento dinâmico de eventos com persistência real

## Página de Administração

O site possui uma página de administração acessível em `/adm` que permite:
- Cadastrar novos eventos com nome, data, localização e fotos
- Visualizar todos os eventos cadastrados
- Excluir eventos
- Upload de múltiplas fotos por evento

### Sistema de Persistência

Os eventos são salvos em um **arquivo JSON permanente** (`db.json`) através de uma API REST:
- **Desenvolvimento**: JSON Server (porta 3000)
- **Produção**: Cloudflare Worker + KV Storage

📖 **Documentação completa**: 
- [PERSISTENCIA_README.md](PERSISTENCIA_README.md) - Guia de uso
- [DEPLOY_GUIDE.md](DEPLOY_GUIDE.md) - Deploy em produção
- [ADMIN_DOCUMENTATION.md](ADMIN_DOCUMENTATION.md) - Documentação técnica

## Desenvolvimento

### Instalar dependências
```bash
npm install
```

### Servidor de desenvolvimento (Recomendado)
```bash
npm run dev
```
Inicia simultaneamente:
- JSON Server (API) na porta 3000
- Angular (Frontend) na porta 8081

Acesse: `http://localhost:8081`  
Admin: `http://localhost:8081/adm`

### Comandos Alternativos
```bash
npm run api      # Apenas API (porta 3000)
npm start        # Apenas Frontend (porta 8081)
```

### Build para produção
```bash
npm run build
```

## Tecnologias

- Angular 19
- TypeScript
- Tailwind CSS
- DaisyUI
- JSON Server (API REST)
- RxJS

## Estrutura de Dados

Os eventos são armazenados em `db.json`:
```json
{
  "eventos": [
    {
      "id": 1,
      "titulo": "Nome do Evento",
      "data": "2026-03-01",
      "localizacao": "Local - Estado",
      "fotos": ["url1", "url2"]
    }
  ]
}
```

## Deploy

### Frontend (Cloudflare Pages)
Já configurado! Basta fazer push para o GitHub.

### Backend (Cloudflare Worker)
Veja o guia completo em [DEPLOY_GUIDE.md](DEPLOY_GUIDE.md)

## Documentação

- [PERSISTENCIA_README.md](PERSISTENCIA_README.md) - Guia rápido de persistência
- [DEPLOY_GUIDE.md](DEPLOY_GUIDE.md) - Guia de deploy completo
- [ADMIN_DOCUMENTATION.md](ADMIN_DOCUMENTATION.md) - Documentação técnica
- [GUIA_USUARIO.md](GUIA_USUARIO.md) - Manual para usuários
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Referência rápida


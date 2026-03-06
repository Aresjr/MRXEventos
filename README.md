# MRX Eventos

Site institucional para http://mrxeventos.com.br

## Funcionalidades

- **Página Principal**: Apresentação da empresa, carrossel de imagens, calendário de eventos
- **Calendário de Eventos**: Visualização de eventos futuros e passados com filtros por ano e mês
- **Formulário de Contato**: Permite aos visitantes entrarem em contato
- **Página de Administração**: Gerenciamento dinâmico de eventos com autenticação
- **Sistema de Login**: Autenticação segura com Supabase

## Página de Administração

O site possui uma página de administração protegida acessível em `/adm` que permite:
- **Autenticação** com email e senha (Supabase Auth)
- Cadastrar novos eventos com nome, data, localização e fotos
- Visualizar todos os eventos cadastrados
- Excluir eventos e suas fotos
- Upload real de múltiplas fotos por evento (Supabase Storage)

### Sistema de Persistência e Autenticação

**Supabase** - Plataforma completa Backend-as-a-Service:
- **Banco de Dados**: PostgreSQL com Row Level Security (RLS)
- **Storage**: Upload real de fotos com URLs públicas automáticas
- **Autenticação**: Login/Logout com sessão persistente
- **Segurança**: Apenas usuários autenticados podem criar/editar/deletar

📖 **Documentação completa**: 
- [SUPABASE_SETUP.md](SUPABASE_SETUP.md) - Guia passo a passo de configuração
- [ADMIN_DOCUMENTATION.md](ADMIN_DOCUMENTATION.md) - Documentação técnica

## Desenvolvimento

### Instalar dependências
```bash
npm install
```

### Configurar Supabase

1. Crie um projeto em https://supabase.com/
2. Copie as credenciais (URL + anon key)
3. Cole em `src/app/config/supabase.config.ts`
4. Siga o guia completo em [SUPABASE_SETUP.md](SUPABASE_SETUP.md)

### Servidor de desenvolvimento
```bash
npm start
```

Acesse:
- Site: `http://localhost:8081`
- Login: `http://localhost:8081/login`
- Admin: `http://localhost:8081/adm` (requer autenticação)

### Build para produção
```bash
npm run build
```

## Tecnologias

- Angular 19
- TypeScript
- Tailwind CSS
- DaisyUI
- **Supabase** (Backend-as-a-Service)
  - PostgreSQL Database
  - Storage (Fotos)
  - Authentication
- RxJS

## Estrutura de Dados

### Tabela: eventos (Supabase)
```sql
CREATE TABLE eventos (
  id BIGSERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  data DATE NOT NULL,
  localizacao TEXT,
  fotos TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Storage: eventos-fotos (Supabase)
Bucket público para armazenar fotos dos eventos com URLs automáticas.

## Autenticação

O sistema usa **Supabase Authentication**:
- Login com email/senha
- Sessão persistente
- Proteção de rotas com AuthGuard
- Logout funcional

## Deploy

### Frontend (Cloudflare Pages)
Já configurado! Basta fazer push para o GitHub.

### Backend (Supabase)
Não precisa configurar nada adicional! O Supabase funciona em qualquer plataforma.

### Configuração Necessária
1. Criar projeto no Supabase
2. Configurar credenciais em `supabase.config.ts`
3. Criar tabela e storage (SQL fornecido)
4. Criar usuário admin
5. Deploy automático no git push

## Documentação

- [SUPABASE_SETUP.md](SUPABASE_SETUP.md) - Configuração do Supabase (LEIA PRIMEIRO!)
- [ADMIN_DOCUMENTATION.md](ADMIN_DOCUMENTATION.md) - Documentação técnica
- [GUIA_USUARIO.md](GUIA_USUARIO.md) - Manual para usuários
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Referência rápida

## Segurança

- ✅ Row Level Security (RLS) no banco
- ✅ Apenas autenticados podem criar/editar/deletar
- ✅ Todos podem visualizar eventos (público)
- ✅ Storage com políticas específicas
- ✅ Credenciais não expostas (anon key é pública, segurança via RLS)

## Licença

Todos os direitos reservados - MRX Eventos


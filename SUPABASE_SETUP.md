# 🚀 Guia de Configuração do Supabase

## ✅ Dependência Instalada

A biblioteca `@supabase/supabase-js` foi instalada com sucesso!

---

## 📋 Estrutura Implementada

### Arquivos Criados

```
src/app/
├── config/
│   └── supabase.config.ts          ← Configure suas credenciais aqui
│
├── core/
│   └── supabase.client.ts          ← Cliente Supabase singleton
│
├── services/
│   ├── auth.service.ts             ← Serviço de autenticação
│   └── evento.service.ts           ← Atualizado para usar Supabase
│
├── guards/
│   └── auth.guard.ts               ← Proteção de rotas
│
└── pages/
    ├── login/                      ← Página de login
    │   ├── login.component.ts
    │   ├── login.component.html
    │   └── login.component.scss
    │
    └── admin/                      ← Atualizado com logout e upload real
        ├── admin.component.ts
        ├── admin.component.html
        └── admin.component.scss
```

---

## 🔧 Passo 1: Criar Projeto no Supabase

1. Acesse: https://supabase.com/
2. Clique em **"Start your project"**
3. Faça login ou crie uma conta
4. Clique em **"New Project"**
5. Preencha:
   - **Name**: MRX Eventos
   - **Database Password**: Crie uma senha forte
   - **Region**: South America (São Paulo) - mais próximo
6. Clique em **"Create new project"**
7. Aguarde ~2 minutos para o projeto ser criado

---

## 🔑 Passo 2: Obter Credenciais

1. No dashboard do projeto, vá em **Settings** (⚙️) → **API**
2. Copie as informações:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

3. **Cole no arquivo de configuração**:

Edite: `src/app/config/supabase.config.ts`

```typescript
export const supabaseConfig = {
  supabaseUrl: 'https://xxxxx.supabase.co',
  supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
};
```

---

## 🗃️ Passo 3: Criar Tabela de Eventos

1. No dashboard, vá em **Table Editor**
2. Clique em **"Create a new table"**
3. Configure:

**Nome da tabela**: `eventos`

**Colunas**:

| Nome | Tipo | Configuração |
|------|------|--------------|
| `id` | `int8` | Primary Key, Auto Increment |
| `titulo` | `text` | Not Null |
| `data` | `date` | Not Null |
| `localizacao` | `text` | Nullable |
| `fotos` | `text[]` | Array, Nullable |
| `created_at` | `timestamptz` | Default: now() |
| `updated_at` | `timestamptz` | Default: now() |

4. Clique em **"Save"**

### SQL Alternativo (Copie e Cole no SQL Editor)

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

-- Habilitar RLS (Row Level Security)
ALTER TABLE eventos ENABLE ROW LEVEL SECURITY;

-- Policy para leitura pública
CREATE POLICY "Eventos são visíveis publicamente"
  ON eventos FOR SELECT
  USING (true);

-- Policy para inserção (apenas autenticados)
CREATE POLICY "Usuários autenticados podem inserir eventos"
  ON eventos FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy para atualização (apenas autenticados)
CREATE POLICY "Usuários autenticados podem atualizar eventos"
  ON eventos FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Policy para exclusão (apenas autenticados)
CREATE POLICY "Usuários autenticados podem deletar eventos"
  ON eventos FOR DELETE
  USING (auth.role() = 'authenticated');
```

---

## 📸 Passo 4: Criar Storage para Fotos

1. No dashboard, vá em **Storage**
2. Clique em **"Create a new bucket"**
3. Configure:
   - **Name**: `eventos-fotos`
   - **Public bucket**: ✅ Marcado (para fotos públicas)
4. Clique em **"Create bucket"**

### Configurar Políticas de Storage

No bucket `eventos-fotos`, clique em **Policies** e adicione:

```sql
-- Policy para upload (apenas autenticados)
CREATE POLICY "Usuários autenticados podem fazer upload"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'eventos-fotos' AND
    auth.role() = 'authenticated'
  );

-- Policy para leitura pública
CREATE POLICY "Fotos são publicamente acessíveis"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'eventos-fotos');

-- Policy para deletar (apenas autenticados)
CREATE POLICY "Usuários autenticados podem deletar fotos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'eventos-fotos' AND
    auth.role() = 'authenticated'
  );
```

---

## 👤 Passo 5: Criar Usuário Admin

1. No dashboard, vá em **Authentication** → **Users**
2. Clique em **"Add user"** → **"Create new user"**
3. Preencha:
   - **Email**: seu@email.com
   - **Password**: SuaSenhaSegura123
   - **Auto Confirm User**: ✅ Marcado
4. Clique em **"Create user"**

---

## 🧪 Passo 6: Testar Localmente

### 1. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

### 2. Acessar a página de login

```
http://localhost:8081/login
```

### 3. Fazer login

- Email: O que você criou no passo 5
- Senha: A senha que você definiu

### 4. Testar cadastro de evento

1. Após login, você será redirecionado para `/adm`
2. Cadastre um evento de teste
3. Faça upload de uma foto
4. Verifique no Supabase:
   - **Table Editor** → `eventos` (deve ter o evento)
   - **Storage** → `eventos-fotos` (deve ter a foto)

---

## 📊 Verificar Dados no Supabase

### Ver Eventos Cadastrados

```sql
SELECT * FROM eventos ORDER BY data DESC;
```

### Ver Fotos Armazenadas

Vá em: **Storage** → **eventos-fotos**

---

## 🔒 Segurança (Row Level Security)

As policies RLS garantem que:
- ✅ Todos podem **ver** eventos e fotos
- ✅ Apenas **usuários autenticados** podem criar/editar/deletar
- ✅ Fotos são públicas mas apenas autenticados podem fazer upload

---

## 🌐 Deploy em Produção

### Ambiente de Produção

As mesmas credenciais funcionam em produção! O Supabase já está configurado para CORS.

Quando fizer deploy no Cloudflare Pages:
1. As credenciais do `supabase.config.ts` serão incluídas no build
2. Tudo funcionará automaticamente
3. Não precisa configurar nada adicional

### Segurança das Credenciais

A `anon key` é pública e pode ser exposta no frontend. A segurança é garantida pelas **RLS Policies** no banco.

---

## 🚀 Funcionalidades Implementadas

### Autenticação
- ✅ Login com email/senha
- ✅ Logout
- ✅ Proteção de rotas (apenas autenticados acessam /adm)
- ✅ Sessão persistente (não precisa logar toda vez)

### Eventos
- ✅ Listar todos os eventos
- ✅ Criar novo evento
- ✅ Excluir evento
- ✅ Atualização em tempo real (se outro admin editar, você vê instantaneamente)

### Fotos
- ✅ Upload real de arquivos (não mais Base64!)
- ✅ Storage no Supabase
- ✅ URLs públicas automáticas
- ✅ Deletar fotos ao excluir evento
- ✅ Múltiplas fotos por evento

---

## 📝 Exemplo de Uso Completo

### 1. Login
```
http://localhost:8081/login
Email: admin@mrxeventos.com.br
Senha: MinhaSenh@123
```

### 2. Cadastrar Evento
- Nome: "Festival de Verão 2026"
- Data: 2026-12-20
- Localização: "Balneário Camboriú - SC"
- Fotos: Selecione 3-4 fotos do evento

### 3. Verificar
- Evento aparece no calendário do site
- Fotos carregam automaticamente
- Dados persistem no Supabase

---

## 🐛 Troubleshooting

### Erro: "Invalid API key"
- Verifique se copiou corretamente a `anon key` no `supabase.config.ts`

### Erro: "Table eventos doesn't exist"
- Execute o SQL do Passo 3 para criar a tabela

### Erro: "new row violates row-level security policy"
- Certifique-se de que as policies RLS foram criadas
- Verifique se o usuário está autenticado

### Fotos não aparecem
- Verifique se o bucket `eventos-fotos` é público
- Confirme que as policies de storage foram criadas

### Login não funciona
- Verifique se o usuário foi criado em Authentication → Users
- Confirme que "Auto Confirm User" estava marcado

---

## 📚 Recursos Adicionais

- [Documentação Supabase](https://supabase.com/docs)
- [Supabase Storage](https://supabase.com/docs/guides/storage)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

## ✅ Checklist Final

Antes de usar:
- [ ] Projeto Supabase criado
- [ ] Credenciais copiadas para `supabase.config.ts`
- [ ] Tabela `eventos` criada
- [ ] Storage bucket `eventos-fotos` criado
- [ ] Policies RLS configuradas
- [ ] Usuário admin criado
- [ ] Testado localmente
- [ ] Eventos aparecem no site

---

## 🎉 Pronto!

Agora você tem:
- ✅ Autenticação completa
- ✅ Persistência real em nuvem
- ✅ Upload de fotos real
- ✅ Segurança com RLS
- ✅ Tempo real (real-time updates)
- ✅ Gratuito até 500MB de storage e 2GB de transfer

**Me envie as credenciais quando estiver pronto para configurar!**


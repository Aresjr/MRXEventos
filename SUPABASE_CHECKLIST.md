# ✅ Checklist de Configuração do Supabase

## 📋 Antes de Começar

- [ ] Ler o guia completo: `SUPABASE_SETUP.md`
- [ ] Ter uma conta no Supabase (gratuita)

---

## 🔧 Configuração do Supabase (15 minutos)

### 1. Criar Projeto
- [ ] Acessar https://supabase.com/
- [ ] Clicar em "New Project"
- [ ] Nome: MRX Eventos
- [ ] Criar senha forte para o banco
- [ ] Região: South America (São Paulo)
- [ ] Aguardar ~2 minutos

### 2. Obter Credenciais
- [ ] Ir em Settings → API
- [ ] Copiar "Project URL"
- [ ] Copiar "anon public key"

### 3. Configurar no Código
- [ ] Abrir: `src/app/config/supabase.config.ts`
- [ ] Colar a URL no lugar de `YOUR_SUPABASE_URL`
- [ ] Colar a Key no lugar de `YOUR_SUPABASE_ANON_KEY`
- [ ] Salvar o arquivo

### 4. Criar Tabela de Eventos
- [ ] No Supabase, ir em "SQL Editor"
- [ ] Copiar o SQL de `SUPABASE_SETUP.md` (Passo 3)
- [ ] Colar e executar (botão "Run")
- [ ] Verificar em "Table Editor" se a tabela `eventos` apareceu

### 5. Criar Storage para Fotos
- [ ] Ir em "Storage"
- [ ] Clicar em "Create a new bucket"
- [ ] Nome: `eventos-fotos`
- [ ] Marcar "Public bucket" ✅
- [ ] Criar

### 6. Configurar Policies de Storage
- [ ] No bucket `eventos-fotos`, ir em "Policies"
- [ ] Copiar as 3 policies do `SUPABASE_SETUP.md` (Passo 4)
- [ ] Executar cada uma no SQL Editor

### 7. Criar Usuário Admin
- [ ] Ir em "Authentication" → "Users"
- [ ] Clicar em "Add user"
- [ ] Email: Seu email
- [ ] Senha: Senha forte
- [ ] Marcar "Auto Confirm User" ✅
- [ ] Criar usuário

---

## 🧪 Testar Localmente

### 1. Iniciar Servidor
```bash
npm start
```
- [ ] Servidor iniciou sem erros
- [ ] Abriu em http://localhost:8081

### 2. Testar Login
- [ ] Acessar http://localhost:8081/login
- [ ] Fazer login com o email/senha criados
- [ ] Deve redirecionar para /adm

### 3. Testar Cadastro de Evento
- [ ] Preencher nome do evento
- [ ] Selecionar data
- [ ] Adicionar localização (opcional)
- [ ] Fazer upload de 1-2 fotos
- [ ] Clicar em "Cadastrar Evento"
- [ ] Mensagem de sucesso aparece

### 4. Verificar no Supabase
- [ ] No Supabase, ir em "Table Editor" → `eventos`
- [ ] O evento cadastrado está lá
- [ ] Ir em "Storage" → `eventos-fotos`
- [ ] As fotos estão lá

### 5. Verificar no Site
- [ ] Acessar http://localhost:8081 (página inicial)
- [ ] Rolar até o calendário
- [ ] O evento cadastrado aparece
- [ ] As fotos carregam corretamente

### 6. Testar Exclusão
- [ ] Voltar para /adm
- [ ] Clicar em "Excluir" no evento de teste
- [ ] Confirmar exclusão
- [ ] Evento sumiu da lista

### 7. Testar Logout
- [ ] Clicar no botão "Sair"
- [ ] Deve redirecionar para /login
- [ ] Tentar acessar /adm diretamente
- [ ] Deve redirecionar para /login (protegido)

---

## 🚀 Deploy em Produção

### 1. Build Local
```bash
npm run build
```
- [ ] Build concluído sem erros
- [ ] Pasta `dist/` criada

### 2. Deploy no GitHub
```bash
git add .
git commit -m "Configura Supabase para produção"
git push
```
- [ ] Push bem-sucedido

### 3. Cloudflare Pages
- [ ] Aguardar deploy automático
- [ ] Acessar a URL do Cloudflare Pages
- [ ] Testar login
- [ ] Cadastrar evento
- [ ] Verificar se funciona em produção

---

## 🔒 Segurança (Verificar)

### Row Level Security
- [ ] Policies RLS criadas na tabela `eventos`
- [ ] Todos podem VER eventos (público)
- [ ] Apenas autenticados podem CRIAR/EDITAR/DELETAR

### Storage Policies
- [ ] Policy de leitura pública criada
- [ ] Policy de upload apenas para autenticados
- [ ] Policy de delete apenas para autenticados

### Autenticação
- [ ] Login funciona
- [ ] Logout funciona
- [ ] Rota /adm protegida (redireciona para /login)
- [ ] Sessão persiste (não precisa logar toda vez)

---

## 📊 Verificações Finais

### Funcionalidades
- [ ] ✅ Login com email/senha
- [ ] ✅ Logout
- [ ] ✅ Cadastrar evento
- [ ] ✅ Upload de fotos
- [ ] ✅ Listar eventos
- [ ] ✅ Excluir evento (e suas fotos)
- [ ] ✅ Eventos aparecem no calendário do site
- [ ] ✅ Fotos carregam corretamente

### Performance
- [ ] Site carrega rápido
- [ ] Fotos carregam rapidamente (CDN do Supabase)
- [ ] Sem erros no console do navegador

### Experiência do Usuário
- [ ] Interface responsiva (mobile/desktop)
- [ ] Mensagens de feedback claras
- [ ] Indicador de upload de fotos
- [ ] Email do usuário exibido no admin

---

## 🐛 Troubleshooting

### Se algo não funcionar:

#### Login não funciona
- [ ] Verificar se o usuário foi criado no Supabase
- [ ] Confirmar que "Auto Confirm User" estava marcado
- [ ] Verificar credenciais em `supabase.config.ts`

#### Erro "Invalid API key"
- [ ] Verificar se copiou a key correta (anon public)
- [ ] Verificar se não tem espaços extras
- [ ] Recarregar a página

#### Erro ao criar evento
- [ ] Verificar se a tabela `eventos` existe
- [ ] Verificar se as policies RLS foram criadas
- [ ] Verificar se está logado

#### Upload de fotos não funciona
- [ ] Verificar se o bucket `eventos-fotos` existe
- [ ] Verificar se o bucket é público
- [ ] Verificar se as policies de storage foram criadas

#### Fotos não aparecem
- [ ] Verificar URL no console (F12)
- [ ] Verificar se o bucket é público
- [ ] Verificar policy de leitura

---

## 📞 Suporte

### Se precisar de ajuda:

1. **Consultar documentação**
   - `SUPABASE_SETUP.md` - Guia completo
   - Documentação oficial: https://supabase.com/docs

2. **Verificar erros**
   - Abrir Console do navegador (F12)
   - Tab "Console" - ver erros JavaScript
   - Tab "Network" - ver requisições falhando

3. **Supabase Dashboard**
   - Logs do projeto
   - Database → Logs
   - Storage → Logs

---

## ✅ Status Final

Marque quando tudo estiver funcionando:

- [ ] ✅ Supabase configurado
- [ ] ✅ Tabela criada
- [ ] ✅ Storage configurado
- [ ] ✅ Usuário admin criado
- [ ] ✅ Testado localmente
- [ ] ✅ Deploy em produção
- [ ] ✅ Tudo funcionando!

---

## 🎉 Parabéns!

Se marcou todos os checkboxes acima, seu sistema está **100% funcional** com:

- ✅ Autenticação segura
- ✅ Persistência em nuvem
- ✅ Upload real de fotos
- ✅ Segurança com RLS
- ✅ Pronto para produção
- ✅ Gratuito!

**Próximo**: Use o sistema! Cadastre seus eventos reais! 🚀


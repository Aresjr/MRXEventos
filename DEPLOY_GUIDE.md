# 🚀 Guia de Deploy com JSON Server e Cloudflare

## ✅ O Que Mudou

Agora os eventos são salvos **permanentemente** em um arquivo JSON real (`db.json`), e não mais no localStorage do navegador!

---

## 🏠 Desenvolvimento Local

### Instalação
Já está tudo instalado! Os pacotes foram adicionados:
- `json-server` - API REST falsa
- `concurrently` - Roda múltiplos servidores

### Como Rodar

#### Opção 1: Comando Único (Recomendado)
```bash
npm run dev
```
Isso inicia:
- JSON Server na porta 3000 (API)
- Angular na porta 8081 (Frontend)

#### Opção 2: Servidores Separados
Terminal 1:
```bash
npm run api
```

Terminal 2:
```bash
npm start
```

### Testar
1. Acesse: `http://localhost:8081/adm`
2. Cadastre um evento
3. Verifique o arquivo `db.json` - o evento estará lá!
4. Reinicie o servidor - o evento continua! 🎉

---

## ☁️ Deploy em Produção (Cloudflare)

Como o Cloudflare Pages é estático, precisamos de um Cloudflare Worker para a API.

### Passo 1: Deploy do Frontend (Cloudflare Pages)

Já está funcionando! Apenas faça o push para o GitHub:

```bash
git add .
git commit -m "Implementa sistema de persistência com JSON Server"
git push
```

O Cloudflare Pages detecta automaticamente e faz o deploy.

### Passo 2: Deploy da API (Cloudflare Worker)

#### 2.1 - Criar Worker no Cloudflare

1. Acesse: https://dash.cloudflare.com/
2. No menu lateral: **Workers & Pages**
3. Clique em **Create Application**
4. Selecione **Create Worker**
5. Dê um nome: `api-mrxeventos` (ou outro nome)
6. Clique em **Deploy**

#### 2.2 - Configurar o Worker

1. Na página do Worker, clique em **Quick Edit**
2. **Delete todo o código** existente
3. **Cole o código** do arquivo `cloudflare-worker.js`
4. Clique em **Save and Deploy**

#### 2.3 - Criar KV Namespace (Banco de Dados)

1. No dashboard do Cloudflare, vá em **Workers & Pages** → **KV**
2. Clique em **Create namespace**
3. Nome: `eventos-storage`
4. Clique em **Add**

#### 2.4 - Vincular KV ao Worker

1. Volte ao seu Worker: **Workers & Pages** → `api-mrxeventos`
2. Aba **Settings**
3. Seção **Variables and Secrets**
4. Em **KV Namespace Bindings**, clique em **Add binding**
   - Variable name: `EVENTOS_KV`
   - KV namespace: Selecione `eventos-storage`
5. Clique em **Save**

#### 2.5 - Inicializar Dados

Para adicionar os eventos iniciais ao KV:

1. No dashboard, vá em **KV** → `eventos-storage`
2. Clique em **Add entry**
3. Key: `eventos`
4. Value: Cole o conteúdo do arquivo `db.json` (array de eventos)
5. Clique em **Add**

#### 2.6 - Obter URL do Worker

A URL será algo como:
```
https://api-mrxeventos.seu-usuario.workers.dev
```

Copie essa URL!

### Passo 3: Configurar o Frontend

Atualize o arquivo `src/environments/environment.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api-mrxeventos.seu-usuario.workers.dev/eventos'
};
```

**Substitua** `seu-usuario` pela URL real do seu Worker!

### Passo 4: Fazer Deploy

```bash
git add .
git commit -m "Configura URL de produção da API"
git push
```

O Cloudflare Pages fará o deploy automaticamente.

---

## 🔧 Alternativa Mais Simples (GitHub como Banco)

Se achar muito complexo o Cloudflare Worker, há uma alternativa mais simples usando GitHub:

### Backend com GitHub API

Use o GitHub como "banco de dados" editando o `db.json` via API.

**Prós:**
- ✅ Gratuito
- ✅ Sem configuração complexa
- ✅ Versionamento automático (Git)

**Contras:**
- ❌ Rate limit (60 requisições/hora sem autenticação)
- ❌ Não é tempo real (precisa de refresh)
- ❌ Mais lento

### Outra Alternativa: Netlify (Tem Functions Grátis)

Se preferir, pode hospedar no Netlify que tem serverless functions gratuitas e é mais simples que Cloudflare Workers.

---

## 📊 Comparação de Soluções

| Solução | Custo | Complexidade | Limite | Recomendado |
|---------|-------|--------------|--------|-------------|
| **localStorage** | Grátis | Baixa | 5-10MB | ❌ Não persistente |
| **JSON Server Local** | Grátis | Baixa | Ilimitado | ✅ Desenvolvimento |
| **Cloudflare Worker + KV** | Grátis* | Média | 1GB | ✅ Produção |
| **Firebase** | Grátis* | Baixa | 1GB | ✅ Mais simples |
| **Backend próprio** | R$5-20/mês | Alta | Depende | Para escalar |

*Plano gratuito com limites generosos

---

## 🔥 Alternativa Mais Simples: Firebase

Se achar o Cloudflare Worker complexo, recomendo **Firebase** (Google):

### Vantagens do Firebase
- ✅ Configuração de 10 minutos
- ✅ 100% gratuito até 10GB de tráfego
- ✅ Banco de dados em tempo real
- ✅ Autenticação integrada
- ✅ Hospedagem grátis também

### Como Implementar Firebase

```bash
npm install firebase
```

Quer que eu implemente com Firebase ao invés do Cloudflare Worker? É muito mais simples!

---

## 📂 Estrutura de Arquivos

### Novos Arquivos Criados
```
db.json                           ← Banco de dados local
proxy.conf.json                   ← Proxy para desenvolvimento
cloudflare-worker.js              ← Código do Cloudflare Worker
src/environments/
  ├── environment.ts              ← Config de produção
  └── environment.development.ts  ← Config de desenvolvimento
```

### Arquivos Modificados
```
package.json                      ← Scripts npm atualizados
src/app/services/evento.service.ts ← Usa API REST agora
```

---

## 🧪 Testando

### Desenvolvimento
```bash
# Iniciar servidores
npm run dev

# Acessar admin
http://localhost:8081/adm

# Cadastrar evento
# Verificar db.json - deve ter o novo evento!

# Reiniciar servidor
Ctrl+C
npm run dev

# Evento continua lá! ✅
```

### Produção
```bash
# Build
npm run build

# Deploy
git push

# Aguardar deploy do Cloudflare

# Testar
https://mrxeventos.com.br/adm
```

---

## 🐛 Troubleshooting

### Erro: ECONNREFUSED localhost:3000
**Problema**: JSON Server não está rodando  
**Solução**: Execute `npm run api` ou `npm run dev`

### Erro: CORS
**Problema**: Requisições bloqueadas  
**Solução**: Certifique-se de que o proxy está configurado (desenvolvimento) ou CORS headers no Worker (produção)

### Dados não salvam
**Problema**: API não está respondendo  
**Solução**: 
1. Verifique se JSON Server está rodando
2. Abra http://localhost:3000/eventos no navegador
3. Deve mostrar o array de eventos

### Worker não funciona
**Problema**: KV não vinculado ou código errado  
**Solução**:
1. Verifique o binding `EVENTOS_KV`
2. Inicialize o KV com dados
3. Teste a URL do Worker diretamente

---

## 📝 Comandos Rápidos

```bash
# Desenvolvimento (recomendado)
npm run dev

# Apenas API
npm run api

# Apenas Frontend
npm start

# Build para produção
npm run build

# Ver eventos no terminal
curl http://localhost:3000/eventos
```

---

## 🎯 Próximos Passos

1. ✅ Testar localmente com `npm run dev`
2. ⏳ Decidir: Cloudflare Worker ou Firebase?
3. ⏳ Deploy em produção
4. ⏳ Adicionar autenticação

**Dica**: Recomendo Firebase se for primeira vez com serverless!

---

## 💡 Recomendação Final

Para **máxima simplicidade**, use:
- **Desenvolvimento**: JSON Server (já configurado)
- **Produção**: Firebase (gratuito e simples)

Quer que eu implemente com Firebase? É muito mais simples que Cloudflare Workers!


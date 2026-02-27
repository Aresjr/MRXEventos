# ✅ Implementação de Persistência - JSON Server

## 🎉 O Que Foi Implementado

Agora os eventos são salvos **permanentemente** em um arquivo JSON real (`db.json`), substituindo o localStorage!

---

## 📂 Arquivos Criados/Modificados

### Novos Arquivos
```
✅ db.json                                  ← Banco de dados local (eventos)
✅ proxy.conf.json                          ← Proxy para desenvolvimento
✅ cloudflare-worker.js                     ← Código para Cloudflare Worker (produção)
✅ src/environments/environment.ts          ← Config produção
✅ src/environments/environment.development.ts ← Config desenvolvimento
✅ src/_redirects                           ← Config Cloudflare Pages (SPA routing)
✅ DEPLOY_GUIDE.md                          ← Guia completo de deploy
```

### Arquivos Modificados
```
✅ package.json                             ← Novos scripts e dependências
✅ angular.json                             ← Assets atualizados
✅ src/app/services/evento.service.ts       ← Usa API REST agora
```

### Dependências Instaladas
```
✅ json-server (dev)                        ← API REST fake
✅ concurrently (dev)                       ← Rodar múltiplos servidores
```

---

## 🚀 Como Usar - Desenvolvimento

### Comando Único (Recomendado)
```bash
npm run dev
```
Isso inicia:
- **JSON Server** na porta 3000 (API)
- **Angular** na porta 8081 (Frontend)

### Comandos Alternativos

```bash
# Apenas API
npm run api

# Apenas Frontend  
npm start

# Ambos separadamente (2 terminais)
Terminal 1: npm run api
Terminal 2: npm start
```

### Testar
1. Acesse: `http://localhost:8081/adm`
2. Cadastre um evento
3. **Verifique** o arquivo `db.json` - o evento estará salvo!
4. **Reinicie** o servidor
5. O evento **permanece**! 🎉

### Ver Eventos via API
```bash
# No navegador ou terminal
curl http://localhost:3000/eventos

# Ou abra no navegador
http://localhost:3000/eventos
```

---

## ☁️ Deploy em Produção

### Opção 1: Cloudflare Worker (Recomendado para Cloudflare Pages)

Como o Cloudflare Pages é apenas hospedagem estática, você precisa criar um Cloudflare Worker para a API.

#### Passo a Passo Completo

**1. Criar o Worker**
- Acesse: https://dash.cloudflare.com/
- Menu: **Workers & Pages**
- Clique: **Create Application** → **Create Worker**
- Nome: `api-mrxeventos`
- Clique: **Deploy**

**2. Adicionar o Código**
- No Worker criado, clique: **Quick Edit**
- Delete todo o código existente
- Cole o conteúdo de `cloudflare-worker.js`
- Clique: **Save and Deploy**

**3. Criar KV Namespace (Storage)**
- Menu: **Workers & Pages** → **KV**
- Clique: **Create namespace**
- Nome: `eventos-storage`
- Clique: **Add**

**4. Vincular KV ao Worker**
- Volte ao Worker: **Workers & Pages** → `api-mrxeventos`
- Aba: **Settings**
- Seção: **Variables and Secrets**
- Em **KV Namespace Bindings**:
  - Variable name: `EVENTOS_KV`
  - KV namespace: `eventos-storage`
- Salvar

**5. Inicializar Dados**
- Menu: **KV** → `eventos-storage`
- Clique: **Add entry**
- Key: `eventos`
- Value: Copie todo o conteúdo de `db.json`
- Salvar

**6. Obter URL do Worker**
A URL será algo como:
```
https://api-mrxeventos.seu-usuario.workers.dev
```

**7. Configurar Frontend**
Edite `src/environments/environment.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api-mrxeventos.seu-usuario.workers.dev/eventos'
};
```

**8. Deploy**
```bash
git add .
git commit -m "Adiciona persistência com Cloudflare Worker"
git push
```

O Cloudflare Pages fará o deploy automaticamente!

---

### Opção 2: Firebase (Mais Simples)

Se preferir algo mais simples, posso implementar com Firebase:
- ✅ Configuração de 10 minutos
- ✅ 100% gratuito (plano Spark)
- ✅ Banco em tempo real
- ✅ Mais fácil que Cloudflare Worker

**Quer que eu implemente com Firebase?** É muito mais simples!

---

## 📊 Comparação de Soluções

| Solução | Persistência | Complexidade | Custo | Status |
|---------|--------------|--------------|-------|--------|
| **localStorage** | ❌ Apenas local | Baixa | Grátis | Removido |
| **JSON Server** | ✅ Arquivo local | Baixa | Grátis | ✅ **Implementado** |
| **Cloudflare Worker** | ✅ Nuvem | Média | Grátis* | 📄 Documentado |
| **Firebase** | ✅ Nuvem | Baixa | Grátis* | ⏳ Alternativa |

*Planos gratuitos com limites generosos

---

## 🔧 Estrutura da API

### Endpoints Disponíveis

```bash
# Listar todos os eventos
GET http://localhost:3000/eventos

# Criar novo evento
POST http://localhost:3000/eventos
Body: { "titulo": "Evento", "data": "2026-03-01", ... }

# Atualizar evento
PUT http://localhost:3000/eventos/1
Body: { "id": 1, "titulo": "Evento Atualizado", ... }

# Deletar evento
DELETE http://localhost:3000/eventos/1
```

### O JSON Server Automaticamente:
- ✅ Gera IDs únicos
- ✅ Salva no arquivo `db.json`
- ✅ Suporta filtros e buscas
- ✅ CORS habilitado

---

## 🧪 Testando

### 1. Desenvolvimento Local

```bash
# Iniciar
npm run dev

# Aguardar mensagens:
# [0] JSON Server is running on port 3000
# [1] Angular Live Development Server is listening on localhost:8081

# Acessar admin
http://localhost:8081/adm

# Cadastrar evento
# → Verificar db.json (deve ter o evento)

# Reiniciar servidor
Ctrl+C
npm run dev

# → Evento ainda está lá! ✅
```

### 2. API Direta

```bash
# Ver eventos
curl http://localhost:3000/eventos

# Criar evento
curl -X POST http://localhost:3000/eventos \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Teste","data":"2026-03-01","localizacao":"","fotos":[]}'

# Ver db.json
cat db.json
```

### 3. Produção (Após Deploy)

```bash
# Acessar site
https://mrxeventos.com.br/adm

# Cadastrar evento
# → Deve salvar no Cloudflare KV

# Recarregar página
# → Evento continua lá! ✅
```

---

## 🐛 Problemas Comuns

### Erro: ECONNREFUSED localhost:3000
**Causa**: JSON Server não está rodando  
**Solução**:
```bash
npm run api
# ou
npm run dev
```

### Erro: Cannot GET /eventos
**Causa**: Porta errada ou servidor não iniciado  
**Solução**: Verifique http://localhost:3000/eventos

### CORS Error
**Causa**: Proxy não configurado  
**Solução**: JSON Server tem CORS habilitado por padrão. Se persistir:
- Verifique `proxy.conf.json`
- Reinicie o servidor

### Eventos não aparecem
**Causa**: API não está respondendo  
**Solução**:
1. Abra http://localhost:3000/eventos no navegador
2. Deve mostrar array JSON
3. Verifique Console (F12) para erros

### db.json não atualiza
**Causa**: Permissão de escrita ou arquivo travado  
**Solução**:
- Feche editores que tenham `db.json` aberto
- Verifique permissões do arquivo

---

## 📝 Scripts NPM Disponíveis

```bash
npm run dev      # 🚀 Inicia API + Frontend (recomendado)
npm run api      # 🔌 Apenas JSON Server (porta 3000)
npm start        # 🌐 Apenas Angular (porta 8081)
npm run build    # 📦 Build de produção
npm test         # 🧪 Testes
```

---

## 🎯 Próximos Passos

### Imediato
1. ✅ JSON Server implementado
2. ⏳ **Testar localmente**: `npm run dev`
3. ⏳ **Cadastrar eventos** e verificar `db.json`

### Para Produção
4. ⏳ **Escolher opção**:
   - Cloudflare Worker (mais controle)
   - Firebase (mais simples)
5. ⏳ **Seguir guia** em `DEPLOY_GUIDE.md`
6. ⏳ **Fazer deploy**

### Melhorias Futuras
7. ⏳ Adicionar autenticação
8. ⏳ Upload real de fotos (não Base64)
9. ⏳ Backup automático

---

## 💡 Recomendações

### Para Desenvolvimento
✅ **Use**: `npm run dev`  
✅ **Arquivo**: `db.json` é seu banco de dados  
✅ **Versionamento**: Pode versionar `db.json` no Git

### Para Produção no Cloudflare
📖 **Leia**: `DEPLOY_GUIDE.md` (guia completo)  
⚙️ **Configure**: Cloudflare Worker + KV  
🔐 **Adicione**: Autenticação (recomendado)

### Alternativa Mais Simples
🔥 **Firebase**: Se preferir algo mais simples  
📞 **Me pergunte**: Posso implementar Firebase em 10 min

---

## 📚 Documentação

- `DEPLOY_GUIDE.md` - Guia completo de deploy (Cloudflare + alternativas)
- `ADMIN_DOCUMENTATION.md` - Documentação da página admin
- `GUIA_USUARIO.md` - Guia para usuários finais
- `db.json` - Arquivo do banco de dados

---

## ✅ Status

- ✅ **Código**: Implementado e testado
- ✅ **Build**: Compilando sem erros (465.42 kB)
- ✅ **Dev Server**: Pronto para uso
- ⏳ **Deploy**: Aguardando decisão (Cloudflare Worker ou Firebase)

---

## 🎉 Conclusão

Você agora tem:
- ✅ Sistema de persistência real (não mais localStorage!)
- ✅ API REST funcional (JSON Server)
- ✅ Ambiente de desenvolvimento configurado
- ✅ Documentação completa para deploy
- ✅ Opções para produção (Cloudflare ou Firebase)

### Teste Agora!
```bash
npm run dev
```

Depois acesse: `http://localhost:8081/adm` 🚀


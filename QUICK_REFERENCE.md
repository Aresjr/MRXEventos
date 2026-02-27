# 📋 Guia Rápido - JSON Server

## 🚀 Comandos Essenciais

```bash
# Iniciar tudo (API + Frontend)
npm run dev

# Apenas API
npm run api

# Apenas Frontend
npm start

# Build produção
npm run build
```

## 🌐 URLs

```
Admin:     http://localhost:8081/adm
Site:      http://localhost:8081
API:       http://localhost:3000/eventos
```

## 📂 Arquivos Importantes

```
db.json                          ← Banco de dados (eventos aqui!)
src/environments/environment.ts  ← Config produção
cloudflare-worker.js             ← Código para Cloudflare
```

## 📝 Testar Rápido

```bash
# 1. Iniciar
npm run dev

# 2. Acessar
http://localhost:8081/adm

# 3. Cadastrar evento

# 4. Ver no arquivo
cat db.json
```

## 🐛 Problemas Comuns

```bash
# Porta ocupada
lsof -i :3000
kill -9 <PID>

# Reinstalar
rm -rf node_modules
npm install

# Ver logs API
npm run api
```

## 📚 Documentação

- `PERSISTENCIA_README.md` - Guia completo
- `DEPLOY_GUIDE.md` - Deploy produção
- `GUIA_USUARIO.md` - Manual usuários

## ✅ Status

- ✅ JSON Server funcionando
- ✅ API REST completa
- ✅ Build sem erros
- ⏳ Aguardando teste local


# Documentação da Página de Administração

## Visão Geral

Foi implementada uma página de administração em `/adm` que permite cadastrar eventos dinamicamente através de um formulário web. Os eventos são armazenados no `localStorage` do navegador e aparecem automaticamente na página principal do site.

## Acesso à Página de Administração

### URL
- **Desenvolvimento**: `http://localhost:8081/adm`
- **Produção**: `https://seudominio.com.br/adm`

### Como Acessar
1. Na página inicial, role até o rodapé (footer)
2. Procure pelo link discreto "Admin" abaixo do copyright
3. Clique para acessar a página de administração

Ou acesse diretamente pela URL: `/adm`

## Funcionalidades

### 1. Cadastrar Novo Evento

O formulário permite cadastrar eventos com os seguintes campos:

- **Nome do Evento*** (obrigatório)
  - Campo de texto livre
  - Exemplo: "Festival de Música", "Casamento Coletivo"

- **Data do Evento*** (obrigatório)
  - Seletor de data
  - Formato: DD/MM/AAAA

- **Localização** (opcional)
  - Campo de texto descritivo
  - Exemplo: "Balneário Camboriú - SC", "Teatro Municipal"

- **Fotos do Evento** (opcional)
  - Upload de múltiplas fotos
  - Formatos aceitos: imagens (JPG, PNG, etc.)
  - As fotos são convertidas para Base64 e armazenadas

#### Preview de Fotos
- Ao selecionar fotos, elas aparecem em preview
- Cada foto tem um botão (X) para remover
- Hover sobre a foto para ver o botão de exclusão

### 2. Visualizar Eventos Cadastrados

Abaixo do formulário, todos os eventos cadastrados são listados mostrando:
- Nome do evento
- Data (formatada como DD/MM/AAAA)
- Localização (se informada)
- Número de fotos
- Preview das fotos (se houver)
- Botão para excluir o evento

### 3. Excluir Eventos

- Cada evento tem um botão "Excluir"
- Ao clicar, aparece uma confirmação
- Se confirmado, o evento é removido permanentemente

### 4. Navegação

- Botão "Voltar ao Site" no topo direito retorna à página inicial

## Armazenamento de Dados

### LocalStorage

Os eventos são armazenados no `localStorage` do navegador com a chave `mrx_eventos`.

**Importante:**
- Os dados persistem enquanto não forem limpos manualmente
- Cada navegador tem seu próprio storage (não é compartilhado)
- Se limpar o cache/dados do navegador, os eventos serão perdidos

### Inicialização

Na primeira vez que o site é acessado, os eventos do arquivo `assets/data/eventos.json` são carregados automaticamente no localStorage. A partir daí, o sistema usa apenas os dados do localStorage.

### Backup Manual

Para fazer backup dos eventos:
1. Abra o Console do navegador (F12)
2. Execute: `localStorage.getItem('mrx_eventos')`
3. Copie o conteúdo JSON
4. Salve em um arquivo de texto

Para restaurar:
1. Abra o Console do navegador
2. Execute: `localStorage.setItem('mrx_eventos', 'COLE_O_JSON_AQUI')`
3. Recarregue a página

## Arquitetura Técnica

### Arquivos Criados

1. **Serviço de Eventos** (`src/app/services/evento.service.ts`)
   - Gerencia CRUD de eventos
   - Sincroniza com localStorage
   - Fornece Observable para reatividade

2. **Componente Admin** (`src/app/pages/admin/`)
   - `admin.component.ts` - Lógica do componente
   - `admin.component.html` - Template do formulário
   - `admin.component.scss` - Estilos e animações

3. **Rota** (`src/app/app.routes.ts`)
   - Rota `/adm` configurada

### Integração

O componente `EventosCalendarioComponent` foi atualizado para usar o `EventoService` em vez de carregar diretamente do JSON estático. Isso garante que os eventos cadastrados via admin apareçam automaticamente na página principal.

## Upload de Fotos

### Como Funciona

1. As fotos são lidas usando `FileReader` API
2. Convertidas para Base64 (Data URL)
3. Armazenadas junto com os dados do evento
4. Exibidas diretamente via Data URL

### Limitações

- **Tamanho**: Recomenda-se fotos otimizadas (< 500KB cada)
- **LocalStorage**: Limite de ~5-10MB dependendo do navegador
- Para muitos eventos com fotos, considere implementar backend com storage real

### Boas Práticas

- Comprima as imagens antes do upload
- Use formatos modernos (WebP se possível)
- Limite razoável de fotos por evento (4-6 fotos)

## Melhorias Futuras Sugeridas

### 1. Backend Real
- Implementar API REST com Node.js/PHP/Python
- Banco de dados (PostgreSQL, MySQL, MongoDB)
- Upload real de arquivos
- Autenticação e autorização

### 2. Autenticação
- Login para acesso ao admin
- Senha ou autenticação OAuth
- Controle de permissões

### 3. Edição de Eventos
- Botão "Editar" além de "Excluir"
- Modal ou formulário para edição
- Histórico de alterações

### 4. Validações Avançadas
- Validação de datas (não permitir datas muito antigas)
- Limite de tamanho de fotos
- Validação de formatos de imagem

### 5. Export/Import
- Exportar eventos para JSON/CSV
- Importar eventos de arquivo
- Backup automático

### 6. Filtros e Busca
- Buscar eventos por nome
- Filtrar por período
- Ordenação customizada

## Solução de Problemas

### Eventos não aparecem na página principal
1. Verifique se o evento foi salvo (mensagem de sucesso)
2. Recarregue a página principal (F5)
3. Verifique o Console (F12) para erros

### Fotos muito grandes
1. Comprima as imagens antes do upload
2. Use ferramentas online como TinyPNG
3. Redimensione para máximo 1920x1080px

### Dados foram perdidos
1. Verifique se não limpou o cache do navegador
2. Restaure do backup se tiver
3. Os eventos originais do JSON ainda estarão disponíveis na primeira carga

### LocalStorage cheio
- Erro: "QuotaExceededError"
- Solução: Exclua eventos antigos ou fotos desnecessárias
- Considere implementar backend

## Suporte

Para questões técnicas ou problemas:
1. Verifique a documentação acima
2. Inspecione o Console do navegador (F12)
3. Verifique os logs de erro
4. Entre em contato com o desenvolvedor

---

**Versão**: 1.0.0  
**Data**: Fevereiro 2025  
**Framework**: Angular 19


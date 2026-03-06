      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
// Cloudflare Worker para API de Eventos
// Deploy em: https://dash.cloudflare.com/

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // GET /eventos - Listar todos os eventos
    if (path === '/eventos' && request.method === 'GET') {
      const eventos = await env.EVENTOS_KV.get('eventos', { type: 'json' }) || [];
      return new Response(JSON.stringify(eventos), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // POST /eventos - Criar novo evento
    if (path === '/eventos' && request.method === 'POST') {
      const evento = await request.json();
      const eventos = await env.EVENTOS_KV.get('eventos', { type: 'json' }) || [];

      // Gerar ID
      const maxId = eventos.length > 0 ? Math.max(...eventos.map(e => e.id)) : 0;
      evento.id = maxId + 1;

      eventos.push(evento);
      await env.EVENTOS_KV.put('eventos', JSON.stringify(eventos));

      return new Response(JSON.stringify(evento), {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // PUT /eventos/:id - Atualizar evento
    if (path.match(/^\/eventos\/\d+$/) && request.method === 'PUT') {
      const id = parseInt(path.split('/')[2]);
      const eventoAtualizado = await request.json();
      const eventos = await env.EVENTOS_KV.get('eventos', { type: 'json' }) || [];

      const index = eventos.findIndex(e => e.id === id);
      if (index !== -1) {
        eventos[index] = { ...eventoAtualizado, id };
        await env.EVENTOS_KV.put('eventos', JSON.stringify(eventos));

        return new Response(JSON.stringify(eventos[index]), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      return new Response('Evento não encontrado', { status: 404, headers: corsHeaders });
    }

    // DELETE /eventos/:id - Deletar evento
    if (path.match(/^\/eventos\/\d+$/) && request.method === 'DELETE') {
      const id = parseInt(path.split('/')[2]);
      const eventos = await env.EVENTOS_KV.get('eventos', { type: 'json' }) || [];

      const novosEventos = eventos.filter(e => e.id !== id);
      await env.EVENTOS_KV.put('eventos', JSON.stringify(novosEventos));

      return new Response(null, { status: 204, headers: corsHeaders });
    }

    return new Response('Not Found', { status: 404, headers: corsHeaders });
  }
};


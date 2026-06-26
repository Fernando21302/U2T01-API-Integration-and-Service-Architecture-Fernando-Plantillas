const API_KEY = 'AIzaSyCxjm926svsvJFwyETW6NxoGc0-9MkFGLg';
const MAX_RESULTS = 20;
 
async function buscarVideos(query) {
  const estado     = document.getElementById('estado');
  const contenedor = document.getElementById('contenedor');
 
  estado.textContent = 'Cargando...';
  contenedor.innerHTML = '';
 
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${MAX_RESULTS}&q=${encodeURIComponent(query)}&key=${API_KEY}`;
 
  try {
    const res  = await fetch(url);
    const data = await res.json();
 
    if (data.error) {
      estado.textContent = `Error: ${data.error.message}`;
      return;
    }
 
    const items = data.items;
    estado.textContent = `${items.length} videos encontrados para "${query}"`;
 
    items.forEach(item => {
      const videoId = item.id.videoId;
      const titulo  = item.snippet.title;
      const canal   = item.snippet.channelTitle;
      const fecha   = new Date(item.snippet.publishedAt).toLocaleDateString('es-MX');
      const thumb   = item.snippet.thumbnails.medium.url;
 
      const tarjeta = document.createElement('div');
      tarjeta.className = 'tarjeta';
      tarjeta.innerHTML = `
        <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
          <img src="${thumb}" alt="${titulo}" />
        </a>
        <div class="info">
          <h2><a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">${titulo}</a></h2>
          <p>📺 ${canal} · 📅 ${fecha}</p>
        </div>
      `;
      contenedor.appendChild(tarjeta);
    });
 
  } catch (err) {
    estado.textContent = 'Error al conectar con YouTube.';
    console.error(err);
  }
}
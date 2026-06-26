const SUBREDDIT_DEFAULT = 'BatmanArkham';
 
async function cargarPosts(subreddit) {
  const estado     = document.getElementById('estado');
  const contenedor = document.getElementById('contenedor');
 
  estado.textContent = 'Cargando...';
  contenedor.innerHTML = '';
 
  try {
    const res  = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=25`);
    const data = await res.json();
    const posts = data.data.children;
 
    if (posts.length === 0) {
      estado.textContent = 'No se encontraron posts.';
      return;
    }
 
    estado.textContent = `Top ${posts.length} posts de r/${subreddit}`;
 
    posts.forEach(({ data: post }) => {
      const tarjeta = document.createElement('div');
      tarjeta.className = 'tarjeta';
      tarjeta.innerHTML = `
        <h2><a href="https://reddit.com${post.permalink}" target="_blank">${post.title}</a></h2>
        <div class="meta">
          <span class="votos">▲ ${post.ups.toLocaleString()}</span>
          <span>💬 ${post.num_comments} comentarios</span>
          <span>👤 u/${post.author}</span>
        </div>
      `;
      contenedor.appendChild(tarjeta);
    });
 
  } catch (err) {
    estado.textContent = 'Error al conectar con Reddit.';
    console.error(err);
  }
}
 
document.getElementById('btnBuscar').addEventListener('click', () => {
  const sub = document.getElementById('subreddit').value.trim();
  if (sub) cargarPosts(sub);
});
 
document.getElementById('subreddit').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const sub = document.getElementById('subreddit').value.trim();
    if (sub) cargarPosts(sub);
  }
});
 
// Cargar r/BatmanArkham al inicio
document.getElementById('subreddit').value = SUBREDDIT_DEFAULT;
cargarPosts(SUBREDDIT_DEFAULT);
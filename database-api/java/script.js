const EONET_URL = 'https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=50';
 
const ICONOS = {
  'Wildfires':        '🔥',
  'Severe Storms':    '⛈️',
  'Volcanoes':        '🌋',
  'Floods':           '💧',
  'Earthquakes':      '🌀',
  'Sea and Lake Ice': '🧊',
  'Drought':          '☀️',
};
 
async function cargarEventos() {
  const estado     = document.getElementById('estado');
  const contenedor = document.getElementById('contenedor');
 
  try {
    const res    = await fetch(EONET_URL);
    const data   = await res.json();
    const eventos = data.events;
 
    estado.textContent = `${eventos.length} eventos activos encontrados`;
 
    eventos.forEach(evento => {
      const categoria = evento.categories[0]?.title || 'Otro';
      const emoji     = ICONOS[categoria] || '📍';
      const fecha     = new Date(evento.geometry[evento.geometry.length - 1].date);
      const fechaStr  = fecha.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
 
      const tarjeta = document.createElement('div');
      tarjeta.className = 'tarjeta';
      tarjeta.innerHTML = `
        <h2>${emoji} ${evento.title}</h2>
        <p>📅 ${fechaStr}</p>
        <p>🔗 <a href="${evento.link}" target="_blank">Ver en NASA</a></p>
        <span class="categoria">${categoria}</span>
      `;
      contenedor.appendChild(tarjeta);
    });
 
  } catch (err) {
    estado.textContent = 'Error al conectar con la API de NASA.';
    console.error(err);
  }
}
 
cargarEventos();
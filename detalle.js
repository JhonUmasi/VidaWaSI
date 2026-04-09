const miWhatsApp = "51999888777"; 
let inventarioGlobal = [];

const urlParams = new URLSearchParams(window.location.search);
const productoId = urlParams.get('id');

async function inicializarDetalle() {
    try {
        // Forzamos la carga de inventario.json
        const respuesta = await fetch('inventario.json');
        if (!respuesta.ok) throw new Error("No se pudo cargar el JSON");
        
        inventarioGlobal = await respuesta.json();
        
        // Buscamos el producto por ID
        const productoElegido = inventarioGlobal.find(p => p.id === productoId);
        
        if (productoElegido) {
            dibujarDetalle(productoElegido);
            mostrarRecomendaciones(productoElegido.categoria, productoElegido.id);
        } else {
            document.getElementById('vista-detalle').innerHTML = "<h2>Prenda no encontrada: " + productoId + "</h2>";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById('vista-detalle').innerHTML = "<h2>Error de conexión con el inventario</h2>";
    }
}

function dibujarDetalle(prenda) {
    const contenedor = document.getElementById('vista-detalle');
    
    let opcionesTallas = prenda.tallas.map(t => `<option value="${t}">${t}</option>`).join('');
    let opcionesColores = prenda.colores.map(c => `<option value="${c}">${c}</option>`).join('');

    contenedor.innerHTML = `
        <div class="grid-detalle">
            <div class="detalle-imagen">
                <img src="${prenda.foto}" alt="${prenda.nombre}" onerror="this.src='https://via.placeholder.com/600x800?text=Foto+Pendiente'">
            </div>
            <div class="detalle-info">
                <span class="categoria">${prenda.categoria}</span>
                <h2>${prenda.nombre}</h2>
                <p class="precio-detalle">S/ ${prenda.precio.toFixed(2)}</p>
                <div class="especificaciones">
                    <p><strong>Marca:</strong> ${prenda.marca}</p>
                    <p><strong>Estado:</strong> ${prenda.estado}</p>
                </div>
                <div class="selectores">
                    <div class="grupo-select">
                        <label>Talla:</label>
                        <select id="select-talla">${opcionesTallas}</select>
                    </div>
                    <div class="grupo-select">
                        <label>Color:</label>
                        <select id="select-color">${opcionesColores}</select>
                    </div>
                </div>
                <a href="#" id="btn-comprar-wa" target="_blank" class="btn-comprar btn-grande">Consultar por WhatsApp</a>
            </div>
        </div>
    `;

    const selectTalla = document.getElementById('select-talla');
    const selectColor = document.getElementById('select-color');
    const btnWa = document.getElementById('btn-comprar-wa');

    function actualizarEnlaceWa() {
        const mensaje = `Hola, estoy interesado por la ropa "${prenda.nombre}" talla ${selectTalla.value}, color ${selectColor.value} de S/ ${prenda.precio.toFixed(2)}.`;
        btnWa.href = `https://wa.me/${miWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    }

    actualizarEnlaceWa();
    selectTalla.addEventListener('change', actualizarEnlaceWa);
    selectColor.addEventListener('change', actualizarEnlaceWa);
}

function mostrarRecomendaciones(categoriaActual, idActual) {
    const contenedorRecomendaciones = document.getElementById('lista-recomendaciones');
    const recomendados = inventarioGlobal.filter(p => p.categoria === categoriaActual && p.id !== idActual && p.disponible !== false).slice(0, 4);

    recomendados.forEach(prenda => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-producto';
        tarjeta.innerHTML = `
            <a href="detalle.html?id=${prenda.id}" class="enlace-oculto">
                <div class="imagen-contenedor">
                    <img src="${prenda.foto}" alt="${prenda.nombre}" onerror="this.src='https://via.placeholder.com/300x400?text=Pendiente'">
                </div>
            </a>
            <div class="info-producto">
                <h3>${prenda.nombre}</h3>
                <p class="precio">S/ ${prenda.precio.toFixed(2)}</p>
                <a href="detalle.html?id=${prenda.id}" class="btn-comprar">Ver Detalles</a>
            </div>
        `;
        contenedorRecomendaciones.appendChild(tarjeta);
    });
}

inicializarDetalle();

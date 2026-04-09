// ATENCIÓN: Pon tu número de celular aquí sin el signo +
const miWhatsApp = "51999888777"; 

let inventarioCompleto = [];

// 1. Función para cargar los datos del JSON
async function cargarInventario() {
    try {
        const respuesta = await fetch('inventario.json');
        inventarioCompleto = await respuesta.json();
        mostrarPrendas(inventarioCompleto);
    } catch (error) {
        console.error("Error al cargar el Excel/JSON:", error);
        document.getElementById('lista-productos').innerHTML = 
            "<p>Error cargando los productos. Revisa la consola.</p>";
    }
}

// 2. Función para "dibujar" las tarjetas en la web
function mostrarPrendas(prendas) {
    const contenedor = document.getElementById('lista-productos');
    contenedor.innerHTML = ''; // Limpiar el mensaje de "Cargando..."

    prendas.forEach(prenda => {
        // Solo mostramos las que están disponibles
        if(prenda.disponible === false) return; 

        // Creamos el mensaje pre-llenado de WhatsApp
        const mensajeText = `Hola! Vengo de tu web. Me interesa la prenda: ${prenda.nombre} (Talla: ${prenda.talla}) a S/ ${prenda.precio.toFixed(2)}. ¿Sigue disponible?`;
        const linkWhatsApp = `https://wa.me/${miWhatsApp}?text=${encodeURIComponent(mensajeText)}`;

        // Creamos el cascarón de la tarjeta
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-producto';
        
        // Armamos el HTML interno de la tarjeta. 
        // Si no hay foto, usamos un onerror para mostrar un cuadro gris de relleno.
        tarjeta.innerHTML = `
            <div class="imagen-contenedor">
                <img src="${prenda.foto}" alt="${prenda.nombre}" onerror="this.src='https://via.placeholder.com/300x400?text=Foto+Pendiente'">
            </div>
            <div class="info-producto">
                <span class="categoria">${prenda.categoria}</span>
                <h3>${prenda.nombre}</h3>
                <p class="detalles">Talla: <strong>${prenda.talla}</strong> | Estado: <strong>${prenda.estado}</strong></p>
                <p class="precio">S/ ${prenda.precio.toFixed(2)}</p>
                <a href="${linkWhatsApp}" target="_blank" class="btn-comprar">Comprar por WhatsApp</a>
            </div>
        `;

        // Añadimos la tarjeta a la web
        contenedor.appendChild(tarjeta);
    });
}

// 3. Función para filtrar por botones
function filtrar(categoria) {
    if(categoria === 'Todo') {
        mostrarPrendas(inventarioCompleto);
    } else {
        const ropaFiltrada = inventarioCompleto.filter(prenda => prenda.categoria === categoria);
        mostrarPrendas(ropaFiltrada);
    }
}

// 4. Arrancar el programa
cargarInventario();

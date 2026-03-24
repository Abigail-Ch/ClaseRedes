// ==========================
// ACTUALIZAR DATOS DEL SENSOR
// ==========================

async function obtenerDatos() {
    try {
        const response = await fetch("/datos");
        const data = await response.json();

        // Verificar si hay error de sesión
        if (data.error) {
            document.getElementById("estado").innerText = "No autorizado";
            return;
        }

        // Actualizar valores en pantalla
        document.getElementById("humedad").innerText = data.humedad + " %";
        document.getElementById("rango").innerText = data.rango;
        document.getElementById("velocidad").innerText = data.velocidad;

        // Estado OK
        document.getElementById("estado").innerText = "Sensor activo";

        // 🔥 Colores dinámicos según rango
        cambiarColor(data.rango);

    } catch (error) {
        document.getElementById("estado").innerText = "Error de conexión";
    }
}


// ==========================
// CAMBIO DE COLOR SEGÚN RANGO
// ==========================

function cambiarColor(rango) {
    const cards = document.querySelectorAll(".card");

    let color = "#1e293b"; // default

    if (rango === "Baja") {
        color = "#22c55e"; // verde
    } else if (rango === "Media") {
        color = "#eab308"; // amarillo
    } else if (rango === "Alta") {
        color = "#ef4444"; // rojo
    }

    cards.forEach(card => {
        card.style.border = "2px solid " + color;
    });
}


// ==========================
// ACTUALIZACIÓN AUTOMÁTICA
// ==========================

setInterval(obtenerDatos, 2000);


// ==========================
// EJECUCIÓN INICIAL
// ==========================

window.onload = obtenerDatos;

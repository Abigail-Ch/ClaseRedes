const humedad = document.getElementById("humedad");
const rango = document.getElementById("rango");
const velocidad = document.getElementById("velocidad");
const pwm = document.getElementById("pwm");
const estado = document.getElementById("estado");
const barra = document.getElementById("barra");

function actualizarEstilo(rangoTexto, valor) {
    let porcentaje = Math.min(valor, 100);

    if (rangoTexto === "Baja") {
        barra.style.width = porcentaje + "%";
        barra.style.background = "#3b82f6";
    } 
    else if (rangoTexto === "Media") {
        barra.style.width = porcentaje + "%";
        barra.style.background = "#f59e0b";
    } 
    else if (rangoTexto === "Alta") {
        barra.style.width = porcentaje + "%";
        barra.style.background = "#ef4444";
    } 
    else {
        barra.style.width = "0%";
        barra.style.background = "#64748b";
    }
}

async function actualizarDatos() {
    try {
        const res = await fetch("/get_data");
        const data = await res.json();

        if (!data.ok) {
            estado.textContent = "Error";
            return;
        }

        humedad.textContent = data.humedad + " %";
        rango.textContent = data.rango;
        velocidad.textContent = data.velocidad;
        pwm.textContent = data.pwm;
        estado.textContent = data.estado;

        actualizarEstilo(data.rango, data.humedad);

    } catch {
        estado.textContent = "Sin conexión";
    }
}

setInterval(actualizarDatos, 2000);
actualizarDatos();

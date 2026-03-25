console.log("JS cargado");
 
async function actualizar() {
    try {
        const res = await fetch(`/datos?t=${Date.now()}`, {
            method: "GET",
            cache: "no-store"
        });
 
        if (!res.ok) {
            throw new Error("Respuesta no válida del servidor");
        }
 
        const data = await res.json();
        console.log("DATA:", data);
 
        document.getElementById("humedad").textContent =
            data.humedad !== "--" ? data.humedad + " %" : "--";
 
        document.getElementById("rango").textContent = data.rango;
        document.getElementById("velocidad").textContent =
            data.velocidad !== "--" ? data.velocidad : "--";
 
        document.getElementById("estado").textContent = "Conectado";
    }
    catch (err) {
        console.log("ERROR:", err);
        document.getElementById("humedad").textContent = "--";
        document.getElementById("rango").textContent = "Sin datos";
        document.getElementById("velocidad").textContent = "--";
        document.getElementById("estado").textContent = "Error de conexión";
    }
}
 
document.addEventListener("DOMContentLoaded", () => {
    actualizar();
    setInterval(actualizar, 2000);
});console.log("JS cargado");
 
async function actualizar() {
    try {
        const res = await fetch(`/datos?t=${Date.now()}`, {
            method: "GET",
            cache: "no-store"
        });
 
        if (!res.ok) {
            throw new Error("Respuesta no válida del servidor");
        }
 
        const data = await res.json();
        console.log("DATA:", data);
 
        document.getElementById("humedad").textContent =
            data.humedad !== "--" ? data.humedad + " %" : "--";
 
        document.getElementById("rango").textContent = data.rango;
        document.getElementById("velocidad").textContent =
            data.velocidad !== "--" ? data.velocidad : "--";
 
        document.getElementById("estado").textContent = "Conectado";
    }
    catch (err) {
        console.log("ERROR:", err);
        document.getElementById("humedad").textContent = "--";
        document.getElementById("rango").textContent = "Sin datos";
        document.getElementById("velocidad").textContent = "--";
        document.getElementById("estado").textContent = "Error de conexión";
    }
}
 
document.addEventListener("DOMContentLoaded", () => {
    actualizar();
    setInterval(actualizar, 2000);
});

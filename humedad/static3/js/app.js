async function actualizar() {
    try {
        const res = await fetch("/datos");

        if (!res.ok) throw new Error();

        const data = await res.json();

        document.getElementById("humedad").textContent = data.humedad + " %";
        document.getElementById("rango").textContent = data.rango;
        document.getElementById("velocidad").textContent = data.velocidad;

        document.getElementById("estado").textContent = "Conectado";
        document.getElementById("estado").style.color = "#22c55e";

    } catch {
        document.getElementById("estado").textContent = "Error";
        document.getElementById("estado").style.color = "#ef4444";
    }
}

setInterval(actualizar, 2000);
actualizar();

function actualizar() {

    fetch("/datos")
    .then(r => r.json())
    .then(d => {

        document.getElementById("humedad").textContent = d.humedad;
        document.getElementById("rango").textContent = d.rango;
        document.getElementById("velocidad").textContent = d.velocidad;

        let estado = document.getElementById("estado");

        estado.textContent = "Conectado";
        estado.style.color = "#22c55e"; // verde
    })
    .catch(() => {
        let estado = document.getElementById("estado");
        estado.textContent = "Sin conexión";
        estado.style.color = "#ef4444"; // rojo
    });
}

setInterval(actualizar, 2000);
actualizar();

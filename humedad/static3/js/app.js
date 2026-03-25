console.log("JS cargado"); // 🔥 para verificar

function actualizar() {

    fetch("/datos")
    .then(res => res.json())
    .then(data => {

        console.log("DATA:", data); // 🔥 VER ESTO

        document.getElementById("humedad").textContent = data.humedad;
        document.getElementById("rango").textContent = data.rango;
        document.getElementById("velocidad").textContent = data.velocidad;

        document.getElementById("estado").textContent = "Conectado";
    })
    .catch(err => {
        console.log("ERROR:", err);
        document.getElementById("estado").textContent = "Error";
    });
}

// cada 2 segundos
setInterval(actualizar, 2000);

// ejecutar al inicio
actualizar();

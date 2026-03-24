function actualizarDatos() {

    fetch("/datos")
        .then(response => response.json())
        .then(data => {

            document.getElementById("humedad").innerText = data.humedad + " %";
            document.getElementById("rango").innerText = data.rango;
            document.getElementById("velocidad").innerText = data.velocidad;

            document.getElementById("estado").innerText = "Conectado";
        })
        .catch(error => {
            console.log(error);
            document.getElementById("estado").innerText = "Error de conexión";
        });
}

// 🔥 cada 2 segundos
setInterval(actualizarDatos, 2000);

// 🔥 al cargar la página
window.onload = actualizarDatos;

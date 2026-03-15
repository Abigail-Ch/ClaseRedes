function actualizar(){

let humedad = document.getElementById("humedad").value;

document.getElementById("valorH").innerHTML = humedad;

let ledH = document.getElementById("ledH");

if(humedad <= 30){

ledH.src="img/led_rojo.png";

}else{

ledH.src="img/led_verde.png";

}

}


function actualizarProximidad(){

let distancia = document.getElementById("distancia").value;

document.getElementById("valorP").innerHTML = distancia;

let ledP = document.getElementById("ledP");

if(distancia <= 2){

ledP.src="img/led_verde.png";

}else{

ledP.src="img/led_rojo.png";

}

}

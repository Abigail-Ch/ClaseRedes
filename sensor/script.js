function actualizar(){

let humedad = document.getElementById("humedad").value;
let temp = document.getElementById("temp").value;

document.getElementById("valorH").innerHTML = humedad;
document.getElementById("valorT").innerHTML = temp;

let ledH = document.getElementById("ledH");
let ledT = document.getElementById("ledT");


if(humedad <= 30){

ledH.src="img/led_rojo.png";

}else{

ledH.src="img/led_verde.png";

}


if(temp <= 25){

ledT.src="img/led_azul.png";

}else{

ledT.src="img/led_naranja.png";

}

}

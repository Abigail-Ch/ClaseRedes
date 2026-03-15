function login(){

let user="admin";
let pass="1234";

let u=document.getElementById("usuario").value;
let p=document.getElementById("password").value;

if(u==user && p==pass){

document.getElementById("login").style.display="none";
document.getElementById("sistema").style.display="block";

}else{

document.getElementById("error").innerHTML="Usuario incorrecto";

}

}


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


/* SENSOR DE PROXIMIDAD */

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


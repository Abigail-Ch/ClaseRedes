function login(){

let user="Abigail";
let pass="sensores";

let u=document.getElementById("usuario").value;
let p=document.getElementById("password").value;

if(u==user && p==pass){

document.getElementById("login").style.display="none";
document.getElementById("sistema").style.display="block";

}else{

document.getElementById("error").innerHTML="Usuario incorrecto";

}

}



function actualizarH(){

let humedad=document.getElementById("humedad").value;

document.getElementById("valorH").innerHTML=humedad;

let led=document.getElementById("ledH");

if(humedad<=30){

led.src="img/led_rojo.png";

}else{

led.src="img/led_verde.png";

}

}



function actualizarProximidad(){

let distancia=document.getElementById("distancia").value;

document.getElementById("valorP").innerHTML=distancia;

let led=document.getElementById("ledP");

if(distancia<=2){

led.src="img/led_verde.png";

}else{

led.src="img/led_rojo.png";

}

}

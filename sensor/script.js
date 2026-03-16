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


/* HUMEDAD */

function actualizar(){

let humedad=document.getElementById("humedad").value;

document.getElementById("valorH").innerHTML=humedad+"%";

let ledH=document.getElementById("ledH");

if(humedad <= 30){

ledH.src="img/led_rojo.png";

}else{

ledH.src="img/led_verde.png";

}

actualizarResumen();

}


/* PROXIMIDAD */

function actualizarProximidad(){

let distancia=document.getElementById("distancia").value;

document.getElementById("valorP").innerHTML=distancia+" m";

let ledP=document.getElementById("ledP");

if(distancia <= 2){

ledP.src="img/led_rojo.png";

}else{

ledP.src="img/led_verde.png";

}

actualizarResumen();

}


/* RESUMEN DEL SISTEMA */

function actualizarResumen(){

let normales=0;
let advertencia=0;
let criticos=0;


/* HUMEDAD */

let humedad=document.getElementById("humedad").value;

if(humedad <=30){

criticos++;

}else if(humedad <=60){

advertencia++;

}else{

normales++;

}


/* PROXIMIDAD */

let distancia=document.getElementById("distancia").value;

if(distancia <=2){

criticos++;

}else if(distancia <=5){

advertencia++;

}else if(distancia>5){

normales++;

}


/* ACTUALIZAR PANEL */

document.getElementById("normales").innerHTML=normales;
document.getElementById("advertencia").innerHTML=advertencia;
document.getElementById("criticos").innerHTML=criticos;


/* ALERTA */

let alerta=document.getElementById("alertaCritica");

if(criticos>0){

alerta.style.display="flex";

}else{

alerta.style.display="none";

}

}

let ledsEncendidos = true;

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

if(!ledsEncendidos) return;

let humedad=document.getElementById("humedad").value;

document.getElementById("valorH").innerHTML=humedad+"%";

let ledH=document.getElementById("ledH");

if(humedad < 8){

ledH.className="led rojo";

}else if(humedad == 8){

ledH.className="led amarillo";

}else{

ledH.className="led verde";

}

actualizarResumen();

}


/* PROXIMIDAD */

function actualizarProximidad(){

if(!ledsEncendidos) return;

let distancia=document.getElementById("distancia").value;

document.getElementById("valorP").innerHTML=distancia+" m";

let ledP=document.getElementById("ledP");

if(distancia < 2){

ledP.className="led rojo";

}else if(distancia == 3){

ledP.className="led amarillo";

}else{

ledP.className="led verde";

}

actualizarResumen();

}


/* RESUMEN Y ALERTA */

function actualizarResumen(){

let normales=0;
let advertencia=0;
let criticos=0;

let humedad=document.getElementById("humedad").value;

if(humedad < 8){
criticos++;
}else if(humedad == 8){
advertencia++;
}else{
normales++;
}

let distancia=document.getElementById("distancia").value;

if(distancia < 2){
criticos++;
}else if(distancia == 3){
advertencia++;
}else{
normales++;
}

document.getElementById("normales").innerHTML=normales;
document.getElementById("advertencia").innerHTML=advertencia;
document.getElementById("criticos").innerHTML=criticos;


/* ALERTA AMARILLA */

let alerta=document.getElementById("alertaCritica");

if(advertencia > 0){

alerta.style.display="flex";
alerta.classList.add("alerta-activa");

}else{

alerta.style.display="none";
alerta.classList.remove("alerta-activa");

}

}


/* BOTON ENCENDER / APAGAR */

function toggleLeds(){

let ledH=document.getElementById("ledH");
let ledP=document.getElementById("ledP");

if(ledsEncendidos){

ledH.className="led";
ledP.className="led";
ledsEncendidos=false;

}else{

ledsEncendidos=true;
actualizar();
actualizarProximidad();

}

}


/* CERRAR ALERTA */

function cerrarAlerta(){

let alerta=document.getElementById("alertaCritica");

alerta.style.display="none";
alerta.classList.remove("alerta-activa");

}

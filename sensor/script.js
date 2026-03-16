let ledsEncendidos=true;

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

if(!ledsEncendidos)return;

let humedad=document.getElementById("humedad").value;

document.getElementById("valorH").innerHTML=humedad+"%";

let led=document.getElementById("ledH");

led.className="led";

if(humedad<8){
led.classList.add("rojo-led");
}
else if(humedad==8){
led.classList.add("amarillo-led");
}
else{
led.classList.add("verde-led");
}

actualizarResumen();

}


/* PROXIMIDAD */

function actualizarProximidad(){

if(!ledsEncendidos)return;

let distancia=document.getElementById("distancia").value;

document.getElementById("valorP").innerHTML=distancia+" m";

let led=document.getElementById("ledP");

led.className="led";

if(distancia<2){
led.classList.add("rojo-led");
}
else if(distancia==3){
led.classList.add("amarillo-led");
}
else{
led.classList.add("verde-led");
}

actualizarResumen();

}


/* BOTON POWER */

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


/* RESUMEN */

function actualizarResumen(){

let normales=0;
let advertencia=0;
let criticos=0;

let humedad=document.getElementById("humedad").value;

if(humedad<8){
criticos++;
}
else if(humedad==8){
advertencia++;
}
else{
normales++;
}

let distancia=document.getElementById("distancia").value;

if(distancia<2){
criticos++;
}
else if(distancia==3){
advertencia++;
}
else{
normales++;
}

document.getElementById("normales").innerHTML=normales;
document.getElementById("advertencia").innerHTML=advertencia;
document.getElementById("criticos").innerHTML=criticos;

let alerta=document.getElementById("alertaCritica");

if(advertencia>0){

alerta.style.display="flex";

}else{

alerta.style.display="none";

}

}


function cerrarAlerta(){

document.getElementById("alertaCritica").style.display="none";

}

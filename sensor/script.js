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

ledH.className="led rojo";

}else{

ledH.className="led verde";

}

actualizarResumen();

}


/* PROXIMIDAD */

function actualizarProximidad(){

let distancia=document.getElementById("distancia").value;

document.getElementById("valorP").innerHTML=distancia+" m";

let ledP=document.getElementById("ledP");

if(distancia <= 2){

ledP.className="led rojo";

}else{

ledP.className="led verde";

}

actualizarResumen();

}


/* RESUMEN */

function actualizarResumen(){

let normales=0;
let advertencia=0;
let criticos=0;

let humedad=document.getElementById("humedad").value;

if(humedad <=30){
criticos++;
}else{
normales++;
}

let distancia=document.getElementById("distancia").value;

if(distancia <=2){
criticos++;
}else{
normales++;
}

document.getElementById("normales").innerHTML=normales;
document.getElementById("advertencia").innerHTML=advertencia;
document.getElementById("criticos").innerHTML=criticos;

}

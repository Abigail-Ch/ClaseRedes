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

let humedad=document.getElementById("humedad").value;
let temp=document.getElementById("temp").value;

document.getElementById("valorH").innerHTML=humedad+"%";
document.getElementById("valorT").innerHTML=temp+"°C";


let ledH=document.getElementById("ledH");
let ledT=document.getElementById("ledT");



/* HUMEDAD */

if(humedad <= 30){

ledH.src="img/led_rojo.png";

}else{

ledH.src="img/led_verde.png";

}



/* TEMPERATURA */

if(temp <= 25){

ledT.src="img/led_azul.png";

}else{

ledT.src="img/led_naranja.png";

}

}

// LOGIN

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



// ACTUALIZAR SENSORES

function actualizar(){

let humedad=document.getElementById("humedad").value;
let temp=document.getElementById("temp").value;

document.getElementById("valorH").innerHTML=humedad+"%";
document.getElementById("valorT").innerHTML=temp+"°C";


let ledH=document.getElementById("ledH");
let ledT=document.getElementById("ledT");


// humedad

if(humedad<=30){

ledH.style.background="red";

}else{

ledH.style.background="green";

}


// temperatura

if(temp<=25){

ledT.style.background="blue";

}else{

ledT.style.background="orange";

}

}

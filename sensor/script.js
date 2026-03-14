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
let temp = document.getElementById("temp").value;

let ledH = document.getElementById("ledH");
let ledT = document.getElementById("ledT");

if(humedad <= 8){
    ledH.style.background = "red";
}else{
    ledH.style.background = "green";
}

if(temp <= 25){
    ledT.style.background = "blue";
}else{
    ledT.style.background = "orange";
}

}


// Función que se ejecuta cuando se presiona el botón LOGIN
function login(){

// Usuario y contraseña correctos
let user="admin";
let pass="1234";

// Se obtiene lo que escribió el usuario
let u=document.getElementById("usuario").value;
let p=document.getElementById("password").value;

// Se comparan los datos
if(u==user && p==pass){

// Si son correctos se oculta el login
document.getElementById("login").style.display="none";

// Se muestra el sistema
document.getElementById("sistema").style.display="block";

}else{

// Si son incorrectos se muestra un mensaje
document.getElementById("error").innerHTML="Usuario incorrecto";

}

}


// Función que actualiza los valores de sensores
function actualizar(){

// Se obtienen los valores de los sliders
let humedad = document.getElementById("humedad").value;
let temp = document.getElementById("temp").value;

// Se obtienen los LEDs
let ledH = document.getElementById("ledH");
let ledT = document.getElementById("ledT");

// Condición para el LED de humedad
if(humedad <= 8){
ledH.style.background = "red";
}else{
ledH.style.background = "green";
}

// Condición para el LED de temperatura
if(temp <= 25){
ledT.style.background = "blue";
}else{
ledT.style.background = "orange";
}

}

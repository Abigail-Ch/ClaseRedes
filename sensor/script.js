let sistemaActivo=true

function login(){

let u=document.getElementById("usuario").value
let p=document.getElementById("password").value

if(u==="admin" && p==="1234"){

document.getElementById("login").style.display="none"
document.getElementById("sistema").style.display="block"

}else{

document.getElementById("error").innerText="Datos incorrectos"

}

}

let humedad=document.getElementById("humedad")
let distancia=document.getElementById("distancia")

humedad.oninput=actualizar
distancia.oninput=actualizar

function actualizar(){

if(!sistemaActivo)return

let h=humedad.value
let d=distancia.value

document.getElementById("valorH").innerText=h
document.getElementById("valorD").innerText=d

let ledH=document.getElementById("ledHumedad")
let ledD=document.getElementById("ledDistancia")

/* HUMEDAD */

if(h<8){

ledH.className="led rojo-led"

}else if(h==8){

ledH.className="led amarillo-led"
mostrarAlerta()

}else{

ledH.className="led verde-led"

}

/* DISTANCIA */

if(d<2){

ledD.className="led rojo-led"

}else if(d==3){

ledD.className="led amarillo-led"
mostrarAlerta()

}else{

ledD.className="led verde-led"

}

}

function mostrarAlerta(){

document.getElementById("alerta").style.display="flex"

}

function cerrarAlerta(){

document.getElementById("alerta").style.display="none"

}

function toggleSistema(){

sistemaActivo=!sistemaActivo

if(!sistemaActivo){

document.getElementById("ledHumedad").className="led"
document.getElementById("ledDistancia").className="led"

humedad.disabled=true
distancia.disabled=true

}else{

humedad.disabled=false
distancia.disabled=false

}

}

/*!
* Start Bootstrap - Business Casual v7.0.0 (https://startbootstrap.com/theme/business-casual)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-business-casual/blob/master/LICENSE)
*/
// Highlights current date on contact page

//window.addEventListener('DOMContentLoaded', event => {
//     const listHoursArray = document.body.querySelectorAll('.list-hours li');
//     listHoursArray[new Date().getDay()].classList.add(('today'));
// })

function load_IBM_virtualAssistant()
{
    window.watsonAssistantChatOptions = {
        integrationID: "57943082-8b6e-4e88-b1fd-79355236b2c0", // The ID of this integration.
        region: "us-south", // The region your integration is hosted in.
        serviceInstanceID: "8436cacb-58ba-4a2e-81a6-f66709d649df", // The ID of your service instance.
        onLoad: function(instance) { instance.render(); }
      };
    setTimeout(function(){
      const t=document.createElement('script');
      t.src="https://web-chat.global.assistant.watson.appdomain.cloud/loadWatsonAssistantChat.js";
      document.head.appendChild(t);
    });
}
function require_name_webpage(url)
{
    var answer = require_flask_text_information(url);
    var answer2 = JSON.stringify(answer["name_webpage"])
    answer2 = answer2.replace(/^"(.*)"$/, '$1');
    return answer2
}
function require_flask_text_information(url)
{
    var http = new XMLHttpRequest();
    var answer
    http.open("POST",url,false);
    http.onload = function(e) {
        if (http.readyState == 4 && http.status == 200)
        {
            answer = JSON.stringify(JSON.parse(http.responseText));
        }
    };   
    http.send()
    return answer
}


//LOGIN
const handleLoginSubmit = (event) => {
    event.preventDefault();
    var http = new XMLHttpRequest();
    var url = "https://1132-190-237-88-76.ngrok.io/autenticacion/ingreso";
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    http.open("POST", url, false);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) { 
        //aqui obtienes la respuesta de tu peticion
            var respuesta = JSON.parse(http.responseText);
            if (respuesta["mensaje"] == "OK")
            {
                console.log(respuesta["mensaje"])
                window.location.href = "../user_pages/index.html"
            }
            else
            {
                alert(respuesta["mensaje"])
            }
        }
    }
    var elemento_a_enviar = JSON.stringify({password: password, username:username});
    http.send(elemento_a_enviar);
};
//REGISTRO
const handleFormRegisterSubmit = (event) => {
    event.preventDefault();
    var http = new XMLHttpRequest();
    var url = "https://1132-190-237-88-76.ngrok.io/autenticacion/registro";
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("e-mail").value;
    http.open("POST", url, false);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) { 
        //aqui obtienes la respuesta de tu peticion
            var respuesta = JSON.parse(http.responseText);
            if (respuesta["mensaje"] == "OK")
            {
                window.location.href = "login.html"
            }
            else
            {
                alert(respuesta["mensaje"])
            }
        }
    }
    var elemento_a_enviar = JSON.stringify({email:email, password: password, username:username});
    http.send(elemento_a_enviar);
};
//COMENTARIOS
function load_main_window_comment_table()
{
    //Loading data
    url = "https://1132-190-237-88-76.ngrok.io/comentarios"
    var http = new XMLHttpRequest();
    
    var answer
    http.open("POST",url,false);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.onload = function(e) {
        if (http.readyState == 4 && http.status == 200)
        {
            answer = JSON.parse(http.responseText);
        }
    };   
    http.send()
    //
    var ubication = document.getElementById("generate_here_table");

    var tabla = document.createElement("table");
    tabla.className = "table table-dark table-striped"
    // Creating heads
    var tblHead = document.createElement("thead");
    var tit = document.createElement("tr");
    tblHead.style.textAlign = 'center';
    var tit_hijo = document.createElement("th");
    //tit_hijo.style.textAlign = 'center';
    var texto_tit = document.createTextNode("Usuario");

    tit_hijo.appendChild(texto_tit);
    tit.appendChild(tit_hijo);
    var tit_hijo = document.createElement("th");
    //tit_hijo.style.textAlign = 'center';
    var texto_tit = document.createTextNode("Comentario");
    tit_hijo.appendChild(texto_tit);
    tit.appendChild(tit_hijo);
    tblHead.appendChild(tit);
    tabla.appendChild(tblHead);
    //
    var tblBody = document.createElement("tbody");
    //Creando las tablas
    var user;
    tblBody.style.textAlign = 'center';
    for(var i = 0; i<answer.length; i++)
    {
        user = {
            username: "Mhiaghi",
            comment: "Me gustan las patatas",
        };
        var hilera = document.createElement("tr");
        //hilera.style.textAlign = 'center';
        var celda_usuario = document.createElement("td");
        celda_usuario.innerHTML = answer[i][1];
        var celda_comentario = document.createElement("td");
        celda_comentario.innerHTML = answer[i][2];
        hilera.appendChild(celda_usuario);
        hilera.appendChild(celda_comentario)

        tblBody.appendChild(hilera);
    }
    tabla.appendChild(tblBody);
    ubication.appendChild(tabla);
    
}

//USUARIO
function load_user_information()
{
    url = "https://1132-190-237-88-76.ngrok.io/usuario/"
    var http = new XMLHttpRequest();
    
    var answer
    http.open("POST",url,false);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.onload = function(e) {
        if (http.readyState == 4 && http.status == 200)
        {
            answer = JSON.parse(http.responseText);
        }
    };   

    http.send()
    var img_perfil_ubicacion = document.getElementById('user-avatar-colocar-imagen')
    var img_perfil = new Image();
    if(answer["imagen"] == "NA")
    {
        img_perfil.src = "../img/fondo_beagle.jpg";
    }
    else
    {
        img_perfil.src = answer["imagen"];
    }
    img_perfil.className = "img-fluid rounded about-heading-img mb-3 mb-lg-0"
    img_perfil_ubicacion.appendChild(img_perfil);
    var Nombre_Completo_ubicacion = document.getElementById('Nombre_Completo')
    Nombre_Completo_ubicacion.innerText = answer['Nombre_Completo']
    var Correo_Electronico_ubicacion = document.getElementById('Correo_Electronico')
    Correo_Electronico_ubicacion.innerText = answer['Correo_Electronico']
    var Numero_Celular_ubicacion = document.getElementById('Numero_Celular')
    Numero_Celular_ubicacion.innerText = answer['Numero_Celular']
    var Descripcion_ubicacion = document.getElementById('Descripcion')
    Descripcion_ubicacion.innerText = answer['Descripcion']
    var Calle_ubicacion = document.getElementById('Calle')
    Calle_ubicacion.innerText = answer['Calle']
    var Ciudad_ubicacion = document.getElementById('Ciudad')
    Ciudad_ubicacion.innerText = answer['Ciudad']
    var Region_ubicacion = document.getElementById('Region')
    Region_ubicacion.innerText = answer['Region']
    var Codigo_postal_ubicacion = document.getElementById('Codigo_postal')
    Codigo_postal_ubicacion.innerText = answer['Codigo_postal']
}
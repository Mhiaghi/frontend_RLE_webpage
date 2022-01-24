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
    console.log(answer)
    return answer2
}
function require_flask_text_information(url)
{
    var xhr = new XMLHttpRequest();
    var answer
    xhr.open("POST",url,false);
    xhr.onload = function(e) {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            answer = JSON.parse(xhr.responseText);
        }
    };   
    xhr.send()
    return answer
}


const getFormJSON = (form) => {
    const data = new FormData(form);
    return Array.from(data.keys()).reduce((result, key) => {
        result[key] = data.get(key);
        return result;
    }, {});
};
const handleFormRegisterSubmit = (event) => {
    event.preventDefault();
    var http = new XMLHttpRequest();
    var url = "http://c6fa-190-237-88-76.ngrok.io/registro";
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    var email = document.getElementById("e-mail");
    http.open("POST", url, true);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) { 
        //aqui obtienes la respuesta de tu peticion
        alert(http.responseText);
        }
    }
    http.send(JSON.stringify({email:email, password: password, username:username}));
};

function load_main_window_comment_table()
{
    //Loading data
    url = "http://c6fa-190-237-88-76.ngrok.io/comentarios"
    var xhr = new XMLHttpRequest();
    var answer
    xhr.open("POST",url,false);
    xhr.onload = function(e) {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            answer = JSON.parse(xhr.responseText);
        }
    };   
    xhr.send()
    //
    console.log(answer)
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
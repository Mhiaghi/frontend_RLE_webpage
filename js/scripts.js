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


const url_backend = "http://127.0.0.1:5000/";
const secret_key = "l=j_.B4uEBq[y4ljD^4y+v?74}zji#Fr";
const num_productos = 0;

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

//LOGIN
const handleLoginSubmit = (event) => {
    event.preventDefault();
    var http = new XMLHttpRequest();
    var url = url_backend + "autenticacion/ingreso";
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
                username_cifrado = CryptoJS.AES.encrypt(username, secret_key)
                sessionStorage.setItem('usuario_actual', username_cifrado)
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
    var url = url_backend + "autenticacion/registro";
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
    url = url_backend + "comentarios"
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
    url = url_backend + "usuario/"
    var http = new XMLHttpRequest();
    var titulo_pagina = document.getElementById("titulo_pagina");
    var nombre_usuario_titulo = document.getElementById("Colocar_usuario");
    var usuario_desencriptado_antes_texto = CryptoJS.AES.decrypt(sessionStorage.getItem('usuario_actual'), secret_key)
    var usuario_desencriptado = usuario_desencriptado_antes_texto.toString(CryptoJS.enc.Utf8);
    nombre_usuario_titulo.innerHTML = "Usuario " + usuario_desencriptado;
    titulo_pagina.innerHTML = usuario_desencriptado;
    var answer
    http.open("POST",url,false);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.onload = function(e) {
        if (http.readyState == 4 && http.status == 200)
        {
            answer = JSON.parse(http.responseText);
            
        }
    };   
    var elemento_a_enviar = JSON.stringify({"mensaje": "Requerir_datos", "usuario": usuario_desencriptado});
    http.send(elemento_a_enviar)
    var img_perfil_ubicacion = document.getElementById('user-avatar-colocar-imagen')
    var img_perfil = new Image();
    if(answer["imagen"] == undefined)
    {
        img_perfil.src = "../img/fondo_beagle.jpg";
    }
    else
    {
        img_perfil.src = answer["imagen"];
    }
    img_perfil.className = "img-fluid rounded about-heading-img mb-3 mb-lg-0"
    img_perfil_ubicacion.appendChild(img_perfil);
    if (answer["Nombre_completo"] != undefined)
    {
        var Nombre_Completo_ubicacion = document.getElementById('Nombre_Completo')
        Nombre_Completo_ubicacion.value = answer['Nombre_completo']
    }
    if (answer["Correo_Electronico"] != undefined)
    {
        var Correo_Electronico_ubicacion = document.getElementById('Correo_Electronico')
        Correo_Electronico_ubicacion.value = answer['Correo_Electronico']
    }
    if (answer["Numero_celular"] != undefined)
    {
        var Numero_Celular_ubicacion = document.getElementById('Numero_Celular')
        Numero_Celular_ubicacion.value = answer['Numero_celular']
    }
    if (answer["Descripcion"] != undefined)
    {
        var Descripcion_ubicacion = document.getElementById('Descripcion')
        Descripcion_ubicacion.value = answer['Descripcion']
        var Desripcion_texto = document.getElementById('user-colocar-descripcion');
        Desripcion_texto.innerHTML = answer['Descripcion'];
    }
    else
    {
        var Desripcion_texto = document.getElementById('user-colocar-descripcion');
        Desripcion_texto.innerHTML = "No se encontró ninguna descripción";
    }
    if (answer["Calle_ubicacion"] != undefined)
    {
        var Calle_ubicacion = document.getElementById('Calle')
        Calle_ubicacion.value = answer['Calle_ubicacion']
    }
    if (answer["Ciudad"] != undefined)
    {
        var Ciudad_ubicacion = document.getElementById('Ciudad')
        Ciudad_ubicacion.value = answer['Ciudad']
    }
    if (answer["Region"] != undefined)
    {
        var Region_ubicacion = document.getElementById('Region')
        Region_ubicacion.value = answer['Region']
    } 
    if (answer["Codigo_postal"] != undefined)
    {
        var Codigo_postal_ubicacion = document.getElementById('Codigo_postal')
        Codigo_postal_ubicacion.value = answer['Codigo_postal']
    }
}
function cancelar_actualizacion_usuario()
{
    window.location.href = "index.html";
}
function enviar_datos_configuracion_usuario()
{
    event.preventDefault();
    var http = new XMLHttpRequest();
    var url = url_backend + "usuario/";
    var Nombre_completo = document.getElementById("Nombre_Completo").value;
    var Correo_Electronico = document.getElementById("Correo_Electronico").value;
    var Numero_Celular = document.getElementById("Numero_Celular").value;
    var Descripcion = document.getElementById("Descripcion").value;
    var Calle = document.getElementById("Calle").value;
    var Ciudad = document.getElementById("Ciudad").value;
    var Region = document.getElementById("Region").value;
    var Codigo_postal = document.getElementById("Codigo_postal").value;
    var usuario_desencriptado_antes_texto = CryptoJS.AES.decrypt(sessionStorage.getItem('usuario_actual'), secret_key)
    var usuario_desencriptado = usuario_desencriptado_antes_texto.toString(CryptoJS.enc.Utf8);
    http.open("POST", url, false);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) { 
        //aqui obtienes la respuesta de tu peticion
            var respuesta = JSON.parse(http.responseText);
            if (respuesta["mensaje"] == "OK")
            {
                window.location.href = "index.html"
            }
            else
            {
                alert(respuesta["mensaje"])
            }
        }
    }
    var elemento_a_enviar = JSON.stringify(
        {
            "mensaje": "Actualizar_datos",
            "Nombre_completo":Nombre_completo, 
            "Correo_Electronico": Correo_Electronico, 
            "Numero_Celular":Numero_Celular,
            "Descripcion" : Descripcion,
            "Calle" : Calle,
            "Ciudad" : Ciudad,
            "Region" : Region,
            "Codigo_postal" : Codigo_postal,
            "usuario" : usuario_desencriptado
        });
    http.send(elemento_a_enviar);
}
//DEJAR COMENTARIO
function LeavingAComment() {
    var http = new XMLHttpRequest();
    var url = url_backend + "usuario/comentario";
    var comentario = document.getElementById("Comentario").value;
    http.open("POST", url, false);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) { 
        //aqui obtienes la respuesta de tu peticion
            var respuesta = JSON.parse(http.responseText);
            if (respuesta["mensaje"] == "OK")
            {
                window.location.href = "comentario.html"
            }
            else
            {
                alert(respuesta["mensaje"])
            }
        }
    }
    var usuario_desencriptado_antes_texto = CryptoJS.AES.decrypt(sessionStorage.getItem('usuario_actual'), secret_key)
    var usuario_desencriptado = usuario_desencriptado_antes_texto.toString(CryptoJS.enc.Utf8);
    var elemento_a_enviar = JSON.stringify({usuario: usuario_desencriptado, comentario:comentario});
    http.send(elemento_a_enviar);
}

//TIENDA
function load_store_information() {
    url = url_backend + "usuario/tienda"
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
    var mensaje_a_enviar = JSON.stringify({"mensaje" : "Leer_Productos"})
    http.send(mensaje_a_enviar)

    productos = answer["productos"]

    var ubication = document.getElementById("tienda_perritos");
    var cantidad_enviar  = 0;
    numero_productos = productos.length;
    for (var i = 0; i< numero_productos;i++)
    {
        var primera_division = document.createElement("div");
        primera_division.className = "col-sm-4";
        var segunda_division = document.createElement("div");
        segunda_division.className = "card mb-3";
        var imagen_producto = document.createElement("img");
        imagen_producto.className = "img-thumbnail";
        imagen_producto.style = "height:300px; width:auto;";
        imagen_producto.src = productos[i][2];
        var tercera_division = document.createElement("div");
        tercera_division.className = "card-body";
        var titulo_producto = document.createElement("h5");
        titulo_producto.className = "card-title";
        titulo_producto.innerHTML = productos[i][1];
        var parrafo_precio = document.createElement("p");
        parrafo_precio.className == "card-text";
        parrafo_precio.innerHTML = "Precio : " + productos[i][3];
        var parrafo_stock = document.createElement("p");
        parrafo_stock.className = "card-text";
        parrafo_stock.innerHTML = "Stock : " + productos[i][4];
        var carta_footer = document.createElement("div");
        carta_footer.className = "card-footer";
        var formulario_ventas = document.createElement("form");
        formulario_ventas.className = "form-horizontal";
        formulario_ventas.method = "POST";
        formulario_ventas.setAttribute('id',"formulario_ventas_id_"+productos[i][0])

        var formulario_division_1 = document.createElement("div");
        formulario_division_1.className = "form-group";
        var formulario_division_1_1 = document.createElement("div");
        formulario_division_1_1.className = "col-sm-2";
        var input_producto_invisible = document.createElement("input");
        input_producto_invisible.type = "hidden";
        input_producto_invisible.name = "producto";
        input_producto_invisible.value = productos[i][0];
        var input_cantidad_formulario = document.createElement("input");
        input_cantidad_formulario.name = "cantidad";

        input_cantidad_formulario.setAttribute('id',"cantidad");
        input_cantidad_formulario.type = "text";
        input_cantidad_formulario.className = "form-control";
        input_cantidad_formulario.placeholder = 0;
        input_cantidad_formulario.autocomplete="off";
        input_cantidad_formulario.required = true;
        input_cantidad_formulario.value = 0;
        var formulario_division_1_2 = document.createElement("div");
        formulario_division_1_2.className = "col-sm-2";
        var input_submit_formulario = document.createElement("input");
        input_submit_formulario.type = "submit";
        input_submit_formulario.name = "save";
        input_submit_formulario.className = "btn btn-info pull-right";
        input_submit_formulario.value = "Añadir al carro";
        formulario_ventas.addEventListener('submit', function(event)
        {
            event.preventDefault();
            load_store_information2(this.id);
        })
        
        formulario_division_1_2.appendChild(input_submit_formulario);
        formulario_division_1_1.appendChild(input_cantidad_formulario);
        formulario_division_1.appendChild(formulario_division_1_1);
        formulario_division_1.appendChild(formulario_division_1_2);
        formulario_ventas.appendChild(formulario_division_1);
        carta_footer.appendChild(formulario_ventas);
        tercera_division.appendChild(titulo_producto);
        tercera_division.appendChild(parrafo_precio);
        tercera_division.appendChild(parrafo_stock);
        segunda_division.appendChild(imagen_producto);
        segunda_division.appendChild(tercera_division);
        segunda_division.appendChild(carta_footer);
        primera_division.appendChild(segunda_division);
        ubication.appendChild(primera_division);
    }
}
function load_store_information2(id_producto)
{
    url = url_backend + "usuario/tienda";
    var http = new XMLHttpRequest();
    var answer;
    http.open("POST",url,false);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.onload = function(e) {
        if (http.readyState == 4 && http.status == 200)
        {
            answer = JSON.parse(http.responseText);
            if (answer["mensaje"] == "No hay productos suficientes en el stock")
            {
                div_mensajes_flash = document.getElementById("mensajes_flash");
                div_alerta = document.createElement("div");
                div_alerta.className = "alert alert-danger alert-dismissible fade show";
                div_alerta.role = "alert";
                strong_mensaje = document.createElement("strong");
                strong_mensaje.innerHTML = "No hay productos suficientes en el stock";
                button_close = document.createElement("button");
                button_close.type = "button";
                button_close.className = "btn-close";
                //button_close.data-bs-dismiss = "alert";
                //button_close.aria-label = "Close";

                div_alerta.appendChild(strong_mensaje);
                div_alerta.appendChild(button_close);
                div_mensajes_flash.appendChild(div_alerta);

            }
            if (answer["mensaje"] == "OK")
            {
                location.reload();
            }
        }
    }
    const formulario_escogido = document.getElementById(id_producto);
    const num_productos = formulario_escogido['cantidad'];
    let N_productos = num_productos.value;
    var usuario_desencriptado_antes_texto = CryptoJS.AES.decrypt(sessionStorage.getItem('usuario_actual'), secret_key)
    var usuario_desencriptado = usuario_desencriptado_antes_texto.toString(CryptoJS.enc.Utf8);
    //console.log(id_producto.substr(21));
    id_producto = id_producto.substr(21);
    var mensaje_a_enviar = JSON.stringify(
        {
            "mensaje" : "Actualizar_Productos",
            "usuario" : usuario_desencriptado,
            "producto" : id_producto,
            "cantidad" : N_productos
        })
    if((N_productos) > 0 )
    {
        http.send(mensaje_a_enviar);
    }
    
}



//CARRITO

function load_carrito_information()
{
    var usuario_desencriptado_antes_texto = CryptoJS.AES.decrypt(sessionStorage.getItem('usuario_actual'), secret_key)
    var usuario_desencriptado = usuario_desencriptado_antes_texto.toString(CryptoJS.enc.Utf8);
    url = url_backend + "usuario/carrito"
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
    var mensaje_a_enviar = JSON.stringify({"mensaje" : "leer_datos_carrito", "usuario": usuario_desencriptado})
    http.send(mensaje_a_enviar)
    var ubication = document.getElementById("colocar_info_carrito");
    var ubicacion_precio_total = document.getElementById("colocar_precio_total");
    if (answer["mensaje"] == "OK")
    {
        var productos = answer["data"]
        var precio_total = answer["precio_total"]
        for (var i=0; i<productos.length;i++)
        {
            producto = productos[i];
            var tr_table = document.createElement("tr");
            var th_table_1 = document.createElement("th");
            th_table_1.innerHTML = producto[0];
            var th_table_2 = document.createElement("th");
            th_table_2.innerHTML = producto[1];
            var th_table_3 = document.createElement("th");
            th_table_3.innerHTML = producto[2];
            var th_table_4 = document.createElement("th");
            th_table_4.innerHTML = producto[3];
            var th_table_5 = document.createElement("th");
            th_table_5.textAlign = "center";
            var button_delete = document.createElement("button");
            button_delete.type = "button";
            button_delete.className = "btn btn-sm btn-danger btn-flat";
            button_delete.title = "close";
            button_delete.id = producto[4];
            //button_delete.onclick = eliminar_datos_carrito(producto[4]);
            button_delete.addEventListener('click', function(){
                eliminar_carrito(this.id);
            });
            var span_element = document.createElement("span");
            span_element.className = "glyphicon glyphicon-remove";
            span_element.innerHTML  = "X";
            button_delete.appendChild(span_element);
            th_table_5.appendChild(button_delete);
            tr_table.appendChild(th_table_1);
            tr_table.appendChild(th_table_2);
            tr_table.appendChild(th_table_3);
            tr_table.appendChild(th_table_4);
            tr_table.appendChild(th_table_5);
            ubication.appendChild(tr_table);
            
        }
        ubicacion_precio_total.innerHTML = "Precio Total: " + precio_total + " soles";
    }
    else
    {
        var tr_table = document.createElement("tr");
        var td_table_1 = document.createElement("td");
        var td_table_2 = document.createElement("td");
        var td_table_3 = document.createElement("td");
        var td_table_4 = document.createElement("td");
        var td_table_5 = document.createElement("td");
        td_table_1.innerHTML = "No hay productos en el carrito";
        tr_table.appendChild(td_table_1);
        tr_table.appendChild(td_table_2);
        tr_table.appendChild(td_table_3);
        tr_table.appendChild(td_table_4);
        tr_table.appendChild(td_table_5);
        ubication.appendChild(tr_table);
        ubicacion_precio_total.innerHTML = "Precio Total: 0 soles";       
    }
}

function eliminar_carrito(id_producto)
{
    var usuario_desencriptado_antes_texto = CryptoJS.AES.decrypt(sessionStorage.getItem('usuario_actual'), secret_key)
    var usuario_desencriptado = usuario_desencriptado_antes_texto.toString(CryptoJS.enc.Utf8);
    url = url_backend + "usuario/carrito";
    var http = new XMLHttpRequest();
    var answer;
    http.open("POST",url,false);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.onload = function(e) {
        if (http.readyState == 4 && http.status == 200)
        {
            answer = JSON.parse(http.responseText);
            location.reload();
        }
    }

    var mensaje_a_enviar = JSON.stringify(
        {
            "mensaje" : "eliminar_datos_carrito",
            "id_producto" : id_producto,
            "usuario" : usuario_desencriptado
        })

    http.send(mensaje_a_enviar);

}


function pagar_carrito()
{
    var usuario_desencriptado_antes_texto = CryptoJS.AES.decrypt(sessionStorage.getItem('usuario_actual'), secret_key)
    var usuario_desencriptado = usuario_desencriptado_antes_texto.toString(CryptoJS.enc.Utf8);
    url = url_backend + "usuario/carrito";
    var http = new XMLHttpRequest();
    var answer;
    http.open("POST",url,false);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.onload = function(e) {
        if (http.readyState == 4 && http.status == 200)
        {
            answer = JSON.parse(http.responseText);
            location.reload();
            if(answer["mensaje"] == "No hay stock suficiente para los productos que vas a comprar")
            {
                alert(answer["mensaje"]);
            }
        }
    }

    var mensaje_a_enviar = JSON.stringify(
        {
            "mensaje" : "pagar_carrito",
            "usuario" : usuario_desencriptado
        })

    http.send(mensaje_a_enviar);
}
function borrar_carrito()
{
    var usuario_desencriptado_antes_texto = CryptoJS.AES.decrypt(sessionStorage.getItem('usuario_actual'), secret_key)
    var usuario_desencriptado = usuario_desencriptado_antes_texto.toString(CryptoJS.enc.Utf8);
    url = url_backend + "usuario/carrito";
    var http = new XMLHttpRequest();
    var answer;
    http.open("POST",url,false);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.onload = function(e) {
        if (http.readyState == 4 && http.status == 200)
        {
            answer = JSON.parse(http.responseText);
            location.reload();
        }
    }

    var mensaje_a_enviar = JSON.stringify(
        {
            "mensaje" : "eliminar_carrito",
            "usuario" : usuario_desencriptado
        })

    http.send(mensaje_a_enviar);
}

//ADMIN
function load_admin_information()
{
    const var_activo = false;
    if (sessionStorage.getItem('usuario_actual') == null)
    {
        location.href = "login.html";
    }
    else
    {
        load_admin_2_info()
    }
}
function load_admin_2_info()
{
    url = url_backend + "administrador/"
    var http = new XMLHttpRequest();
    var titulo_pagina = document.getElementById("titulo_pagina");
    var nombre_usuario_titulo = document.getElementById("Colocar_admin");
    var usuario_desencriptado_antes_texto = CryptoJS.AES.decrypt(sessionStorage.getItem('usuario_actual'), secret_key)
    var usuario_desencriptado = usuario_desencriptado_antes_texto.toString(CryptoJS.enc.Utf8);
    nombre_usuario_titulo.innerHTML = "Usuario " + usuario_desencriptado;
    titulo_pagina.innerHTML = usuario_desencriptado;
    var answer
    http.open("POST",url,false);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.onload = function(e) {
        if (http.readyState == 4 && http.status == 200)
        {
            answer = JSON.parse(http.responseText);
            
        }
    };   
    var elemento_a_enviar = JSON.stringify({"mensaje": "Requerir_datos", "usuario": usuario_desencriptado})
    http.send(elemento_a_enviar)
    var img_perfil_ubicacion = document.getElementById('user-avatar-colocar-imagen')
    var img_perfil = new Image();
    if(answer["imagen"] == undefined)
    {
        img_perfil.src = "../img/fondo_beagle.jpg";
    }
    else
    {
        img_perfil.src = answer["imagen"];
    }
    img_perfil.className = "img-fluid rounded about-heading-img mb-3 mb-lg-0"
    img_perfil_ubicacion.appendChild(img_perfil);
    if (answer["Nombre_completo"] != undefined)
    {
        var Nombre_Completo_ubicacion = document.getElementById('Nombre_Completo')
        Nombre_Completo_ubicacion.value = answer['Nombre_completo']
    }
    if (answer["Correo_Electronico"] != undefined)
    {
        var Correo_Electronico_ubicacion = document.getElementById('Correo_Electronico')
        Correo_Electronico_ubicacion.value = answer['Correo_Electronico']
    }
    if (answer["Numero_celular"] != undefined)
    {
        var Numero_Celular_ubicacion = document.getElementById('Numero_Celular')
        Numero_Celular_ubicacion.value = answer['Numero_celular']
    }
    if (answer["Descripcion"] != undefined)
    {
        var Descripcion_ubicacion = document.getElementById('Descripcion')
        Descripcion_ubicacion.value = answer['Descripcion']
        var Desripcion_texto = document.getElementById('user-colocar-descripcion');
        Desripcion_texto.innerHTML = answer['Descripcion'];
    }
    else
    {
        var Desripcion_texto = document.getElementById('user-colocar-descripcion');
        Desripcion_texto.innerHTML = "No se encontró ninguna descripción";
    }
    if (answer["Calle_ubicacion"] != undefined)
    {
        var Calle_ubicacion = document.getElementById('Calle')
        Calle_ubicacion.value = answer['Calle_ubicacion']
    }
    if (answer["Ciudad"] != undefined)
    {
        var Ciudad_ubicacion = document.getElementById('Ciudad')
        Ciudad_ubicacion.value = answer['Ciudad']
    }
    if (answer["Region"] != undefined)
    {
        var Region_ubicacion = document.getElementById('Region')
        Region_ubicacion.value = answer['Region']
    } 
    if (answer["Codigo_postal"] != undefined)
    {
        var Codigo_postal_ubicacion = document.getElementById('Codigo_postal')
        Codigo_postal_ubicacion.value = answer['Codigo_postal']
    }
}
//ADMIN LOGIN
const handleLoginSubmitAdmin = (event) => {
    event.preventDefault();
    var http = new XMLHttpRequest();
    var url = url_backend + "administrador/ingreso";
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
                username_cifrado = CryptoJS.AES.encrypt(username, secret_key)
                sessionStorage.setItem('usuario_actual', username_cifrado)
                window.location.href = "./index.html"
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

//ADMIN USUARIOS MANAGMENT

function load_info_usuarios_by_admin()
{
    var ubicacion = document.getElementById("colocar_info_usuarios_by_admin");
    var http = new XMLHttpRequest();
    var url = url_backend + "administrador/manejar_usuarios";
    var answer;
    http.open("POST",url,false);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.onload = function(e) {
        if (http.readyState == 4 && http.status == 200)
        {
            answer = JSON.parse(http.responseText);
        }
    };   
    var mensaje_a_enviar = JSON.stringify({"mensaje" : "leer_usuarios"})
    http.send(mensaje_a_enviar)
    if(answer["mensaje"] == "OK")
    {
        let datos = answer["data"]
        if (datos.length > 0)
        {
            for(let i = 0; i< datos.length;i++)
            {
                tr_table = document.createElement("tr");
                
                td_table_1 = document.createElement("th");
                td_table_2 = document.createElement("th");
                td_table_3 = document.createElement("th");
                td_table_1.innerHTML = datos[i][0];
                td_table_2.innerHTML = datos[i][2];
                


                update_button = document.createElement("button");
                update_button.type = "button";
                update_button.className = "btn btn-sm btn-warning btn-flat";
                update_button.title = "Update";
                update_button.id = datos[i][0];
                span_element = document.createElement("span");
                span_element.className = "glyphicon glyphicon-pencil";
                span_element.innerHTML = "Actualizar";
                delete_button = document.createElement("button");
                delete_button.type = "button";
                delete_button.className = "btn btn-sm btn-warning btn-flat";
                delete_button.title = "Delete";
                delete_button.id = datos[i][0];
                span_element_2 = document.createElement("span");
                span_element_2.className = "glyphicon glyphicon-remove";
                span_element_2.innerHTML = "Eliminar";
                delete_button.appendChild(span_element_2);
                update_button.appendChild(span_element);

                delete_button.addEventListener('click', function(){
                    eliminar_usuario(this.id);
                });
                update_button.addEventListener('click', function(){
                    actualizar_usuario(this.id);
                });
                
                td_table_3.appendChild(update_button);
                td_table_3.appendChild(delete_button);
                td_table_1.textAlign = "center";
                td_table_2.textAlign = "center";
                td_table_3.textAlign = "center";
                tr_table.appendChild(td_table_1);
                tr_table.appendChild(td_table_2);
                tr_table.appendChild(td_table_3);
                ubicacion.appendChild(tr_table);
            }
        }
        else
        {
            tr_table = document.createElement("tr");
            td_table_1 = document.createElement("td");
            td_table_2 = document.createElement("td");
            td_table_3 = document.createElement("td");
            td_table_1.innerHTML = "Sin datos";
            tr_table.appendChild(td_table_1);
            tr_table.appendChild(td_table_2);
            tr_table.appendChild(td_table_3);
            ubicacion.appendChild(tr_table);
        }
    }
}


// ADMIN COMMENT MANAGE

function load_info_comentarios_by_admin()
{
    var ubicacion = document.getElementById("colocar_info_comentarios_by_admin");
    var http = new XMLHttpRequest();
    var url = url_backend + "administrador/manejar_comentarios";
    var answer;
    http.open("POST",url,false);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.onload = function(e) {
        if (http.readyState == 4 && http.status == 200)
        {
            answer = JSON.parse(http.responseText);
        }
    };   
    var mensaje_a_enviar = JSON.stringify({"mensaje" : "leer_comentarios"})
    http.send(mensaje_a_enviar)
    if(answer["mensaje"] == "OK")
    {
        let datos = answer["data"]
        if (datos.length > 0)
        {
            for(let i = 0; i< datos.length;i++)
            {
                tr_table = document.createElement("tr");
                
                td_table_1 = document.createElement("th");
                td_table_2 = document.createElement("th");
                td_table_3 = document.createElement("th");
                td_table_1.innerHTML = datos[i][1];
                td_table_2.innerHTML = datos[i][2];
                

                delete_button = document.createElement("button");
                delete_button.type = "button";
                delete_button.className = "btn btn-sm btn-warning btn-flat";
                delete_button.title = "Delete";
                delete_button.id = datos[i][0];
                span_element_2 = document.createElement("span");
                span_element_2.className = "glyphicon glyphicon-remove";
                span_element_2.innerHTML = "Eliminar";
                delete_button.appendChild(span_element_2);

                delete_button.addEventListener('click', function(){
                    eliminar_comentario(this.id);
                });

                
                td_table_3.appendChild(delete_button);
                td_table_1.textAlign = "center";
                td_table_2.textAlign = "center";
                td_table_3.textAlign = "center";
                tr_table.appendChild(td_table_1);
                tr_table.appendChild(td_table_2);
                tr_table.appendChild(td_table_3);
                ubicacion.appendChild(tr_table);
            }
        }
        else
        {
            tr_table = document.createElement("tr");
            td_table_1 = document.createElement("td");
            td_table_2 = document.createElement("td");
            td_table_3 = document.createElement("td");
            td_table_1.innerHTML = "Sin datos";
            tr_table.appendChild(td_table_1);
            tr_table.appendChild(td_table_2);
            tr_table.appendChild(td_table_3);
            ubicacion.appendChild(tr_table);
        }
    }
}

// ADMIN PRODUCT MANAGE

function load_info_productos_by_admin()
{
    var ubicacion = document.getElementById("colocar_info_productos_by_admin");
    var http = new XMLHttpRequest();
    var url = url_backend + "administrador/manejar_productos";
    var answer;
    http.open("POST",url,false);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.onload = function(e) {
        if (http.readyState == 4 && http.status == 200)
        {
            answer = JSON.parse(http.responseText);
        }
    };   
    var mensaje_a_enviar = JSON.stringify({"mensaje" : "leer_productos"})
    http.send(mensaje_a_enviar)
    if(answer["mensaje"] == "OK")
    {
        let datos = answer["data"]
        if (datos.length > 0)
        {
            for(let i = 0; i< datos.length;i++)
            {
                tr_table = document.createElement("tr");
                
                td_table_1 = document.createElement("th");
                td_table_2 = document.createElement("th");
                td_table_3 = document.createElement("th");
                td_table_4 = document.createElement("th");
                td_table_5 = document.createElement("th");
                td_table_6 = document.createElement("th");
                td_table_1.innerHTML = datos[i][1];
                td_table_2.innerHTML = datos[i][2];
                td_table_3.innerHTML = datos[i][3];
                td_table_4.innerHTML = datos[i][4];
                td_table_5.innerHTML = datos[i][5];
                
                update_button = document.createElement("button");
                update_button.type = "button";
                update_button.className = "btn btn-sm btn-warning btn-flat";
                update_button.title = "Update";
                update_button.id = datos[i][0];
                span_element = document.createElement("span");
                span_element.className = "glyphicon glyphicon-pencil";
                span_element.innerHTML = "Actualizar";

                delete_button = document.createElement("button");
                delete_button.type = "button";
                delete_button.className = "btn btn-sm btn-warning btn-flat";
                delete_button.title = "Delete";
                delete_button.id = datos[i][0];
                span_element_2 = document.createElement("span");
                span_element_2.className = "glyphicon glyphicon-remove";
                span_element_2.innerHTML = "Eliminar";
                delete_button.appendChild(span_element_2);

                delete_button.addEventListener('click', function(){
                    eliminar_producto(this.id);
                });
                update_button.addEventListener('click', function(){
                    actualizar_producto(this.id);
                });

                update_button.appendChild(span_element);

                td_table_6.appendChild(delete_button);
                td_table_6.appendChild(update_button);
                td_table_1.textAlign = "center";
                td_table_2.textAlign = "center";
                td_table_3.textAlign = "center";
                td_table_4.textAlign = "center";
                td_table_5.textAlign = "center";
                td_table_6.textAlign = "center";
                tr_table.appendChild(td_table_1);
                tr_table.appendChild(td_table_2);
                tr_table.appendChild(td_table_3);
                tr_table.appendChild(td_table_4);
                tr_table.appendChild(td_table_5);
                tr_table.appendChild(td_table_6);
                ubicacion.appendChild(tr_table);
            }
        }
        else
        {
            tr_table = document.createElement("tr");
            td_table_1 = document.createElement("td");
            td_table_2 = document.createElement("td");
            td_table_3 = document.createElement("td");
            td_table_4 = document.createElement("td");
            td_table_5 = document.createElement("td");
            td_table_6 = document.createElement("td");
            td_table_1.innerHTML = "Sin datos";
            tr_table.appendChild(td_table_1);
            tr_table.appendChild(td_table_2);
            tr_table.appendChild(td_table_3);
            tr_table.appendChild(td_table_4);
            tr_table.appendChild(td_table_5);
            tr_table.appendChild(td_table_6);
            ubicacion.appendChild(tr_table);
        }
    }
}


function eliminar_usuario(id)
{
    var http = new XMLHttpRequest();
    var url = url_backend + "administrador/manejar_usuarios";
    var answer;
    http.open("POST",url,false);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.onload = function(e) {
        if (http.readyState == 4 && http.status == 200)
        {
            answer = JSON.parse(http.responseText);
            if (answer["mensaje"] == "OK")
            {
                alert("Se elimino el usuario " + id);
                location.reload()
            }

        }
    };   
    var mensaje_a_enviar = JSON.stringify({"mensaje" : "eliminar_usuarios", "usuario" : id})
    http.send(mensaje_a_enviar);
}
function actualizar_usuario(id)
{
    event.preventDefault();
    var http = new XMLHttpRequest();
    var url = url_backend + "administrador/manejar_usuarios";
    http.open("POST", url, false);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) { 
        //aqui obtienes la respuesta de tu peticion
            var respuesta = JSON.parse(http.responseText);
            if (respuesta["mensaje"] == "OK")
            {
                sessionStorage.setItem('user_update', id)
                sessionStorage.setItem('email_update', respuesta["email"])
                window.location.href = "./admin_account_update.html";
                
            }
            else
            {
                alert(respuesta["mensaje"])
            }
        }
    }
    var elemento_a_enviar = JSON.stringify({mensaje: "actualizar_usuarios_request", usuario : id});
    http.send(elemento_a_enviar);
}
function eliminar_comentario(id)
{
    var http = new XMLHttpRequest();
    var url = url_backend + "administrador/manejar_comentarios";
    var answer;
    http.open("POST",url,false);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.onload = function(e) {
        if (http.readyState == 4 && http.status == 200)
        {
            answer = JSON.parse(http.responseText);
            if (answer["mensaje"] == "OK")
            {
                alert("Se elimino el comentario ");
                location.reload()
            }

        }
    };   
    var mensaje_a_enviar = JSON.stringify({"mensaje" : "eliminar_comentarios", "comentario" : id})
    http.send(mensaje_a_enviar);
}
function eliminar_producto(id)
{
    var http = new XMLHttpRequest();
    var url = url_backend + "administrador/manejar_productos";
    var answer;
    http.open("POST",url,false);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.onload = function(e) {
        if (http.readyState == 4 && http.status == 200)
        {
            answer = JSON.parse(http.responseText);
            if (answer["mensaje"] == "OK")
            {
                alert("Se elimino el producto ");
                location.reload()
            }

        }
    };   
    var mensaje_a_enviar = JSON.stringify({"mensaje" : "eliminar_productos", "producto" : id})
    http.send(mensaje_a_enviar);
}
function actualizar_producto(id)
{
    event.preventDefault();
    var http = new XMLHttpRequest();
    var url = url_backend + "administrador/manejar_productos";
    http.open("POST", url, false);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) { 
        //aqui obtienes la respuesta de tu peticion
            var respuesta = JSON.parse(http.responseText);
            if (respuesta["mensaje"] == "OK")
            {
                sessionStorage.setItem('id_update', id);
                sessionStorage.setItem('nombre_update', respuesta["nombre"]);
                sessionStorage.setItem('imagen_update', respuesta["imagen"]);
                sessionStorage.setItem('precio_update', respuesta["precio"]);
                sessionStorage.setItem('stock_update', respuesta["stock"]);
                sessionStorage.setItem('disponible_update', respuesta["disponible"]);
                window.location.href = "./productos_update.html";
                
            }
            else
            {
                alert(respuesta["mensaje"])
            }
        }
    }
    var elemento_a_enviar = JSON.stringify({mensaje: "actualizar_productos_request", producto : id});
    http.send(elemento_a_enviar);
}


//REGISTRO
const crearUsuarioByAdmin = (event) => {
    event.preventDefault();
    var http = new XMLHttpRequest();
    var url = url_backend + "autenticacion/registro";
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
                window.location.href = "./manejo_usuarios.html"
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

//PRODUCTO
const crearProductoByAdmin = (event) => {
    event.preventDefault();
    var http = new XMLHttpRequest();
    var url = url_backend + "administrador/manejar_productos";
    var nombre = document.getElementById("nombre").value;
    var imagen = document.getElementById("imagen").value;
    var precio = document.getElementById("precio").value;
    var stock = document.getElementById("stock").value;
    var disponible = document.getElementById("disponible").value;
    http.open("POST", url, false);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) { 
        //aqui obtienes la respuesta de tu peticion
            var respuesta = JSON.parse(http.responseText);
            if (respuesta["mensaje"] == "OK")
            {
                window.location.href = "./manejo_productos.html"
            }
            else
            {
                alert(respuesta["mensaje"])
            }
        }
    }
    var elemento_a_enviar = JSON.stringify({mensaje: "nuevo_producto", nombre: nombre, imagen: imagen, precio: precio, stock: stock, disponible: disponible});
    http.send(elemento_a_enviar);
};

//ACTUALIZAR USUARIO
function cargar_ventana_actualizacion()
{
    var usuario = sessionStorage.getItem("user_update");
    var correo = sessionStorage.getItem("email_update");
    //sessionStorage.removeItem("user_update");
    sessionStorage.removeItem("email_update");
    console.log(sessionStorage.getItem("user_update"));
    console.log(sessionStorage.getItem("email_update"));
    var username = document.getElementById("username");
    var email = document.getElementById("email");
    username.value = usuario;
    
    email.value = correo;
    
}

const actualizarUsuarioByAdmin = (event) => {
    event.preventDefault();
    var http = new XMLHttpRequest();
    var url = url_backend + "administrador/manejar_usuarios";
    var nuevo_usuario = document.getElementById("username").value;
    var correo = document.getElementById("email").value;
    http.open("POST", url, false);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) { 
        //aqui obtienes la respuesta de tu peticion
            var respuesta = JSON.parse(http.responseText);
            if (respuesta["mensaje"] == "OK")
            {
                window.location.href = "./manejo_usuarios.html"
                alert("Se actualizo el usuario")
            }
            else
            {
                alert(respuesta["mensaje"])
            }
        }
    }
    var usuario = sessionStorage.getItem("user_update");
    sessionStorage.removeItem("user_update")
    var elemento_a_enviar = JSON.stringify({mensaje: "actualizar_usuarios", nuevo_usuario: nuevo_usuario,usuario: usuario, correo: correo});
    http.send(elemento_a_enviar);
};

function cargar_ventana_actualizacion_producto()
{
    // sessionStorage.setItem('id_update', id);
    // sessionStorage.setItem('nombre_update', respuesta["nombre"]);
    // sessionStorage.setItem('imagen_update', respuesta["imagen"]);
    // sessionStorage.setItem('precio_update', respuesta["precio"]);
    // sessionStorage.setItem('stock_update', respuesta["stock"]);
    // sessionStorage.setItem('disponible_update', respuesta["disponible"]);
    //var id_producto = sessionStorage.getItem("id_update");
    var nombre_producto = sessionStorage.getItem("nombre_update");
    var imagen_producto = sessionStorage.getItem("imagen_update");
    var precio_producto = sessionStorage.getItem("precio_update");
    var stock_producto = sessionStorage.getItem("stock_update");
    var disponible_producto = sessionStorage.getItem("disponible_update");
    //sessionStorage.removeItem("user_update");
    //sessionStorage.removeItem("id_update");
    sessionStorage.removeItem("nombre_update");
    sessionStorage.removeItem("imagen_update");
    sessionStorage.removeItem("precio_update");
    sessionStorage.removeItem("stock_update");
    sessionStorage.removeItem("disponible_update");

    var doc_nombre = document.getElementById("nombre");
    var doc_imagen = document.getElementById("imagen");
    var doc_precio = document.getElementById("precio");
    var doc_stock = document.getElementById("stock");
    var doc_disp = document.getElementById("disponible");
    doc_nombre.value = nombre_producto;
    doc_imagen.value = imagen_producto;
    doc_precio.value = precio_producto;
    doc_stock.value = stock_producto;
    doc_disp.value = disponible_producto;
    
}

const actualizarProductoByAdmin = (event) => {
    event.preventDefault();
    var http = new XMLHttpRequest();
    var url = url_backend + "administrador/manejar_productos";
    var nombre = document.getElementById("nombre").value;
    var imagen = document.getElementById("imagen").value;
    var precio = document.getElementById("precio").value;;
    var stock  = document.getElementById("stock").value;
    var disponible =  document.getElementById("disponible").value;
    var id_producto = sessionStorage.getItem("id_update");
    sessionStorage.removeItem("id_update");
    http.open("POST", url, false);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) { 
        //aqui obtienes la respuesta de tu peticion
            var respuesta = JSON.parse(http.responseText);
            if (respuesta["mensaje"] == "OK")
            {
                window.location.href = "./manejo_productos.html"
                alert("Se actualizo el producto")
            }
            else
            {
                alert(respuesta["mensaje"])
            }
        }
    }
    var elemento_a_enviar = JSON.stringify({mensaje: "actualizar_productos", nombre: nombre,imagen: imagen, precio: precio, stock:stock,disponible:disponible, id_producto:id_producto});
    http.send(elemento_a_enviar);
};

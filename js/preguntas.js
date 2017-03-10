var formElement = null;
var respuestaInput = null;
var respuestaInput2 = null;
var respuestaSelect = null;
var respuestaSelect2 = null;
var respuestasCheckbox = [];
var respuestasCheckbox2 = [];
var respuestaRadio = null;
var respuestaRadio2 = null;
var respuestasMultiple = [];
var respuestasMultiple2 = [];

var nota = 0;

var nota = 0; //nota de la prueba sobre 3 puntos (hay 3 preguntas)

//****************************************************************************************************
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.



window.onload = function() {
    //CORREGIR al apretar el botón
    formElement = document.getElementById('myform');
    formElement.onsubmit = function() {
        inicializar();
        //if (comprobar()){
        tituloCorreccion();
        corregirText();
        corregirSelect();
        corregirCheckbox();
        corregirRadio();
        corregirMultiple();
        corregirText2();
        corregirSelect2();
        corregirCheckbox2();
        corregirRadio2();
        corregirMultiple2();
        presentarNota();
        //}

    }

    window.onmousedown = function(e) {
        var el = e.target;
        if (el.tagName.toLowerCase() == 'option' && el.parentNode.hasAttribute('multiple')) {
            e.preventDefault();

            // toggle selection
            if (el.hasAttribute('selected')) el.removeAttribute('selected');
            else el.setAttribute('selected', '');

            // hack to correct buggy behavior
            var select = el.parentNode.cloneNode(true);
            el.parentNode.parentNode.replaceChild(select, el.parentNode);
        }
    }

    //LEER XML de xml/preguntas.xml
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            gestionarXml(this);
            tiempo();
        }
    };
    xhttp.open("GET", "xml/preguntas.xml", true);
    xhttp.send();

    document.getElementById("respuestas").onclick = function() {
        document.getElementById("resultadoTotal").style.display = "none";
        document.getElementById("resultadosDiv").style.display = "block";
    }
}

//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/preguntas.xml
// xmlDOC es el documento leido XML.
function gestionarXml(dadesXml) {
    var xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc

    //--------------------INPUT---------------------------
    //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
    var tituloInput = xmlDoc.getElementsByTagName("title")[0].innerHTML;
    ponerDatosInputHtml(tituloInput);
    texto = parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);

    //--------------------INPUT 2---------------------------
    //Recuperamos el título y la respuesta correcta de Input
    var tituloInput2 = xmlDoc.getElementsByTagName("title")[1].innerHTML;
    ponerDatosInputHtml2(tituloInput);
    texto = parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);


    //----------------------SELECT---------------------------------
    //Recuperamos el título y las opciones, guardamos la respuesta correcta
    var tituloSelect = xmlDoc.getElementsByTagName("title")[1].innerHTML;
    var opcionesSelect = [];
    var nopt = xmlDoc.getElementById("jams002").getElementsByTagName('option').length;
    for (i = 0; i < nopt; i++) {
        opcionesSelect[i] = xmlDoc.getElementById("jams002").getElementsByTagName('option')[i].innerHTML;
    }
    ponerDatosSelectHtml(tituloSelect, opcionesSelect);
    respuestaSelect = parseInt(xmlDoc.getElementsByTagName("answer")[1].innerHTML);

    //----------------------SELECT 2---------------------------------
    //Recuperamos el título y las opciones, guardamos la respuesta correcta
    var tituloSelect = xmlDoc.getElementsByTagName("title")[7].innerHTML;
    var opcionesSelect = [];
    var nopt = xmlDoc.getElementById("jams008").getElementsByTagName('option').length;
    for (i = 0; i < nopt; i++) {
        opcionesSelect[i] = xmlDoc.getElementById("jams008").getElementsByTagName('option')[i].innerHTML;
    }
    ponerDatosSelectHtml2(tituloSelect, opcionesSelect);
    respuestaSelect2 = parseInt(xmlDoc.getElementsByTagName("answer")[1].innerHTML);


    //----------------------MULTIPLE---------------------------------
    //Recuperamos el título y las opciones, guardamos la respuesta correcta
    var tituloSelMul = xmlDoc.getElementsByTagName("title")[2].innerHTML;
    var opcionesSelMul = [];
    var nopt = xmlDoc.getElementById("jams003").getElementsByTagName('option').length;
    for (i = 0; i < nopt; i++) {
        opcionesSelMul[i] = xmlDoc.getElementById("jams003").getElementsByTagName('option')[i].innerHTML;
    }
    ponerDatosMultipleHtml(tituloSelMul, opcionesSelMul);
    respuestaSelect = parseInt(xmlDoc.getElementsByTagName("answer")[0, 2, 3].innerHTML);

    //----------------------MULTIPLE 2---------------------------------
    //Recuperamos el título y las opciones, guardamos la respuesta correcta
    var tituloSelMul = xmlDoc.getElementsByTagName("title")[8].innerHTML;
    var opcionesSelMul = [];
    var nopt = xmlDoc.getElementById("jams009").getElementsByTagName('option').length;
    for (i = 0; i < nopt; i++) {
        opcionesSelMul[i] = xmlDoc.getElementById("jams009").getElementsByTagName('option')[i].innerHTML;
    }
    ponerDatosMultipleHtml2(tituloSelMul, opcionesSelMul);
    respuestaSelect2 = parseInt(xmlDoc.getElementsByTagName("answer")[0, 1, 3, 4].innerHTML);


    //--------------------------CHECKBOX------------------------------------
    //Recuperamos el título y las opciones, guardamos las respuestas correctas
    var tituloCheckbox = xmlDoc.getElementsByTagName("title")[3].innerHTML;
    var opcionesCheckbox = [];
    var nopt = xmlDoc.getElementById("jams004").getElementsByTagName('option').length;
    for (i = 0; i < nopt; i++) {
        opcionesCheckbox[i] = xmlDoc.getElementById("jams004").getElementsByTagName('option')[i].innerHTML;
    }
    ponerDatosCheckboxHtml(tituloCheckbox, opcionesCheckbox);
    var nres = xmlDoc.getElementById("jams004").getElementsByTagName('answer').length;
    for (i = 0; i < nres; i++) {
        respuestasCheckbox[i] = xmlDoc.getElementById("jams004").getElementsByTagName("answer")[i].innerHTML;
    }

    //--------------------------CHECKBOX 2------------------------------------
    //Recuperamos el título y las opciones, guardamos las respuestas correctas
    var tituloCheckbox = xmlDoc.getElementsByTagName("title")[5].innerHTML;
    var opcionesCheckbox = [];
    var nopt = xmlDoc.getElementById("jams006").getElementsByTagName('option').length;
    for (i = 0; i < nopt; i++) {
        opcionesCheckbox[i] = xmlDoc.getElementById("jams006").getElementsByTagName('option')[i].innerHTML;
    }
    ponerDatosCheckboxHtml2(tituloCheckbox, opcionesCheckbox);
    var nres = xmlDoc.getElementById("jams006").getElementsByTagName('answer').length;
    for (i = 0; i < nres; i++) {
        respuestasCheckbox2[i] = xmlDoc.getElementById("jams006").getElementsByTagName("answer")[i].innerHTML;
    }



    //----------------------------RADIO--------------------------------------
    //Recuperamos el título y las opciones, guardamos las respuestas correctas
    var tituloRadio = xmlDoc.getElementsByTagName("title")[4].innerHTML;
    var opcionesRadio = [];
    var nopt = xmlDoc.getElementById("jams005").getElementsByTagName('option').length;
    for (i = 0; i < nopt; i++) {
        opcionesRadio[i] = xmlDoc.getElementById("jams005").getElementsByTagName('option')[i].innerHTML;
    }
    ponerDatosRadioHtml(tituloRadio, opcionesRadio);
    var nres = xmlDoc.getElementById("jams005").getElementsByTagName('answer').length;
    for (i = 0; i < nres; i++) {
        respuestaRadio[i] = xmlDoc.getElementById("jams005").getElementsByTagName("answer")[i].innerHTML;
    }
}

//----------------------------RADIO 2--------------------------------------
//Recuperamos el título y las opciones, guardamos las respuestas correctas
var tituloRadio2 = xmlDoc.getElementsByTagName("title")[9].innerHTML;
var opcionesRadio2 = [];
var nopt = xmlDoc.getElementById("quest010").getElementsByTagName('option').length;
for (i = 0; i < nopt; i++) {
    opcionesRadio2[i] = xmlDoc.getElementById("quest010").getElementsByTagName('option')[i].innerHTML;
}
ponerDatosRadioHtml2(tituloRadio2, opcionesRadio2);
respuestaRadio2 = xmlDoc.getElementById("quest010").getElementsByTagName("answer")[1].innerHTML;



//-----------------------------------DATOS AL HTML------------------------------------------------------------------
function ponerDatosInputHtml(t) {
    document.getElementById("tituloInput").innerHTML = t;
}

function ponerDatosInputHtml2(t) {
    document.getElementById("tituloInput2").innerHTML = t;
}

function ponerDatosSelectHtml(t, opt) {
    document.getElementById("tituloSelect").innerHTML = t;
    var select = document.getElementsByTagName("select")[0];
    for (i = 0; i < opt.length; i++) {
        var option = document.createElement("option");
        option.text = opt[i];
        option.value = i + 1;
        select.options.add(option);
    }
}

function ponerDatosSelectHtml2(t, opt) {
    document.getElementById("tituloSelect2").innerHTML = t;
    var select = document.getElementsByTagName("select")[2];
    for (i = 0; i < opt.length; i++) {
        var option = document.createElement("option");
        option.text = opt[i];
        option.value = i + 1;
        select.options.add(option);
    }
}


function ponerDatosMultipleHtml(t, opt) {
    document.getElementById("tituloSelMul").innerHTML = t;
    var select = document.getElementsByTagName("select")[1];
    for (i = 0; i < opt.length; i++) {
        var option = document.createElement("option");
        option.text = opt[i];
        option.value = i + 1;
        selMul.options.add(option);
    }
}

function ponerDatosMultipleHtml2(t, opt) {
    document.getElementById("tituloSelMul2").innerHTML = t;
    var select = document.getElementsByTagName("select")[3];
    for (i = 0; i < opt.length; i++) {
        var option = document.createElement("option");
        option.text = opt[i];
        option.value = i + 1;
        selMul2.options.add(option);
    }
}

function ponerDatosCheckboxHtml(t, opt) {
    var checkboxContainer = document.getElementById('checkboxDiv');
    document.getElementById('tituloCheckbox').innerHTML = t;
    for (i = 0; i < opt.length; i++) {
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML = opt[i];
        label.setAttribute("for", "color_" + i);
        input.type = "checkbox";
        input.name = "color";
        input.id = "color_" + i;;
        checkboxContainer.appendChild(input);
        checkboxContainer.appendChild(label);
        checkboxContainer.appendChild(document.createElement("br"));
    }
}

function ponerDatosCheckboxHtml2(t, opt) {
    var checkboxContainer = document.getElementById('checkboxDiv2');
    document.getElementById('tituloCheckbox2').innerHTML = t;
    for (i = 0; i < opt.length; i++) {
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML = opt[i];
        label.setAttribute("for", "color_" + i);
        input.type = "checkbox";
        input.name = "color";
        input.id = "color_" + i;;
        checkboxContainer.appendChild(input);
        checkboxContainer.appendChild(label);
        checkboxContainer.appendChild(document.createElement("br"));
    }
}

function ponerDatosRadioHtml(t, opt) {
    var radioContainer = document.getElementById('radioDiv');
    document.getElementById('tituloRadio').innerHTML = t;
    for (i = 0; i < opt.length; i++) {
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML = opt[i];
        label.setAttribute("for", "color_" + i);
        input.type = "radio";
        input.name = "color";
        input.id = "color_" + i;
        radioContainer.appendChild(input);
        radioContainer.appendChild(label);
        radioContainer.appendChild(document.createElement("br"));
    }
}

function ponerDatosRadioHtml2(t, opt) {
    var radioContainer = document.getElementById('radioDiv2');
    document.getElementById('tituloRadio2').innerHTML = t;
    for (i = 0; i < opt.length; i++) {
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML = opt[i];
        label.setAttribute("for", "rd2_" + i);
        input.type = "radio";
        input.name = "rd2";
        input.id = "rd2_" + i;;
        radioContainer.appendChild(input);
        radioContainer.appendChild(label);
        radioContainer.appendChild(document.createElement("br"));
    }
}

//****************************************************************************************************
//implementación de la corrección

//**********	CORECCION INPUT	**********

function corregirText() {
    //Vosotros debéis comparar el texto escrito con el texto que hay en el xml
    //en este ejemplo hace una comparación de números enteros
    var s = formElement.elements[0].value;
    if (s.toLowerCase() == respuestaInput) {
        darRespuestaHtml("1ª pregunta: 1 punto");
        nota += 1;
    } else {
        darRespuestaHtml("1ª pregunta: 0 puntos");
    }
}

function corregirText2() {
    //Vosotros debéis comparar el texto escrito con el texto que hay en el xml
    //en este ejemplo hace	 una comparación de números enteros
    var s = document.getElementById("text2").value;
    if (s.toLowerCase() == respuestaInput2) {
        darRespuestaHtml("6ª pregunta: 1 punto");
        nota += 1;
    } else {
        darRespuestaHtml("6ª pregunta: 0 puntos");
    }
}


//**********	CORECCION SELECT	**********

function corregirSelect() {
    var sel = document.getElementById("sel");
    if (sel.selectedIndex - 1 == respuestaSelect) { //-1 porque hemos puesto una opción por defecto en el select que ocupa la posición 0
        darRespuestaHtml("2ª pregunta: 1 punto");
        nota += 1;
    } else darRespuestaHtml("2ª pregunta: 0 puntos");
}

function corregirSelect2() {
    var sel = document.getElementById("sel2");
    if (sel.selectedIndex - 1 == respuestaSelect2) { //-1 porque hemos puesto una opción por defecto en el select que ocupa la posición 0
        darRespuestaHtml("7ª pregunta: 1 punto");
        nota += 1;
    } else darRespuestaHtml("7ª pregunta: 0 puntos");
}


//**********	CORECCION CHECKBOX	**********

function corregirCheckbox() {
    var notaCheckbox = 0;
    var f = formElement;
    var escorrecta = [];
    for (i = 0; i < f.chckbx.length; i++) { //"chckbx" es el nombre asignado a todos los checkbox
        if (f.chckbx[i].checked) {
            escorrecta[i] = false;
            for (j = 0; j < respuestasCheckbox.length; j++) {
                if (i == respuestasCheckbox[j]) escorrecta[i] = true;
            }
            //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
            if (escorrecta[i]) {
                nota += 1.0 / respuestasCheckbox.length; //dividido por el número de respuestas posibles
                notaCheckbox += 1.0 / respuestasCheckbox.length;
            } else {
                nota -= 1.0 / respuestasCheckbox.length; //dividido por el número de respuestas posibles
            }
        }
    }
    if (notaCheckbox != 1) {
        darRespuestaHtml("3ª pregunta: " + notaCheckbox + " puntos")
    } else darRespuestaHtml("3ª pregunta: " + notaCheckbox + " punto")

}

function corregirCheckbox2() {
    var notaCheckbox = 0;
    var f = formElement;
    var escorrecta = [];
    for (i = 0; i < f.chckbx2.length; i++) { //"chckbx" es el nombre asignado a todos los checkbox
        if (f.chckbx2[i].checked) {
            escorrecta[i] = false;
            for (j = 0; j < respuestasCheckbox2.length; j++) {
                if (i == respuestasCheckbox2[j]) escorrecta[i] = true;
            }
            //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
            if (escorrecta[i]) {
                nota += 1.0 / respuestasCheckbox2.length; //dividido por el número de respuestas posibles
                notaCheckbox += 1.0 / respuestasCheckbox2.length;
            } else {
                nota -= 1.0 / respuestasCheckbox2.length; //dividido por el número de respuestas posibles
            }
        }
    }
    if (notaCheckbox != 1) {
        darRespuestaHtml("8ª pregunta: " + notaCheckbox + " puntos")
    } else darRespuestaHtml("8ª pregunta: " + notaCheckbox + " punto")
}


//**********	CORECCION RADIO	**********

function corregirRadio() {
    var notaRadio = 0;
    var f = formElement;
    var escorrecta = null;
    for (i = 0; i < f.rd.length; i++) { //"rd" es el nombre asignado a todos los radio.
        if (f.rd[i].checked) {
            escorrecta = false;
            if (i == respuestaRadio) escorrecta = true;
            //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
            if (escorrecta) {
                notaRadio += 1.0; //dividido por el número de respuestas posibles
                nota += 1.0;
            }
        }
    }
    if (notaRadio != 1) {
        darRespuestaHtml("4ª pregunta: " + notaRadio + " puntos")
    } else darRespuestaHtml("4ª pregunta: " + notaRadio + " punto")
}

function corregirRadio2() {
    var notaRadio = 0;
    var f = formElement;
    var escorrecta = null;
    for (i = 0; i < f.rd2.length; i++) { //"rd" es el nombre asignado a todos los radio.
        if (f.rd2[i].checked) {
            escorrecta = false;
            if (i == respuestaRadio2) escorrecta = true;
            //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
            if (escorrecta) {
                notaRadio += 1.0; //dividido por el número de respuestas posibles
                nota += 1.0;
            }
        }
    }
    if (notaRadio != 1) {
        darRespuestaHtml("9ª pregunta: " + notaRadio + " puntos")
    } else darRespuestaHtml("9ª pregunta: " + notaRadio + " punto")
}


//**********	CORECCION MULTIPLE	**********

function corregirMultiple() {
    var f = formElement;
    var escorrecta = [];
    var multiple = document.getElementById("selMul");
    var puntuacion = 0;
    for (var i = 0; i < multiple.options.length; i++) {
        if (multiple.options[i].selected) {
            for (var j = 0; j < respuestasMultiple.length; j++) {
                if (multiple.options[i].value == respuestasMultiple[j]) {
                    escorrecta.push(multiple.options[i].value);
                }
            }
        }
    }
    if (escorrecta.length > 0) {
        puntuacion = escorrecta.length / respuestasMultiple.length;
        nota += puntuacion;
    }
    if (puntuacion != 1 & puntuacion != 0) {
        darRespuestaHtml("5ª pregunta: " + puntuacion.toFixed(1) + " puntos")
    } else if (puntuacion == 0) {
        darRespuestaHtml("5ª pregunta: 0 puntos");
    } else darRespuestaHtml("5ª pregunta: 1 punto")
}

function corregirMultiple2() {
    var f = formElement;
    var escorrecta = [];
    var multiple = document.getElementById("selMul2");
    var puntuacion = 0;
    for (var i = 0; i < multiple.options.length; i++) {
        if (multiple.options[i].selected) {
            for (var j = 0; j < respuestasMultiple2.length; j++) {
                if (multiple.options[i].value == respuestasMultiple2[j]) {
                    escorrecta.push(multiple.options[i].value);
                }
            }
        }
    }
    if (escorrecta.length > 0) {
        puntuacion = escorrecta.length / respuestasMultiple2.length;
        nota += puntuacion;
    }
    if (puntuacion != 1 & puntuacion != 0) {
        darRespuestaHtml("10ª pregunta: " + puntuacion.toFixed(1) + " puntos")
    } else if (puntuacion == 0) {
        darRespuestaHtml("10ª pregunta: 0 puntos");
    } else darRespuestaHtml("10ª pregunta: 1 punto")
}


//****************************************************************************************************
//Gestionar la presentación de las respuestas
function darRespuestaHtml(r) {
    // document.getElementById('content').style.display = "none";
    // document.getElementById('resultadosDiv').style.display = "block";
    var p = document.createElement("p");
    var node = document.createTextNode(r);
    p.appendChild(node);
    document.getElementById('resultadosDiv').appendChild(p);
}

function tituloCorreccion() {
    darRespuestaHtml("Puntuaci\u00F3n obtenida por pregunta:");
}

function presentarNota() {
    darRespuestaTotal("Puntuación total: " + nota.toFixed(2));
}
//	inicializar la corrección
function inicializar() {
    document.getElementById('resultadosDiv').innerHTML = "";
    nota = 0.0;
}

//Comprobar que se han introducido datos en el formulario
function comprobar() {
    var f = formElement;
    var checked = false;
    var checked2 = false;
    var radioSelected = false;
    var radioSelected2 = false;
    for (i = 0; i < f.chckbx.length; i++) { //"chckbx" es el nombre asignado a todos los checkbox
        if (f.chckbx[i].checked) checked = true;
    }
    for (i = 0; i < f.chckbx2.length; i++) { //"chckbx" es el nombre asignado a todos los checkbox
        if (f.chckbx2[i].checked) checked2 = true;
    }
    for (i = 0; i < f.rd.length; i++) {
        if (f.rd[i].checked) radioSelected = true;
    }
    for (i = 0; i < f.rd2.length; i++) {
        if (f.rd2[i].checked) radioSelected2 = true;
    }
    if (document.getElementById("text").value == "") {
        document.getElementById("text").focus();
        alert("La 1ª pregunta es obligatoria");
        return false;
    } else if (f.elements[1].selectedIndex == 0) {
        document.getElementById("text").focus();
        alert("Selecciona una de las opciones en la 2ª pregunta");
        return false;
    }
    if (!checked) {
        document.getElementById("tituloCheckbox").focus();
        alert("Debes elegir una opción en la 3ª pregunta");
        return false;
    } else if (!radioSelected) {
        document.getElementById("tituloRadio").focus();
        alert("Selecciona una opción en la 4ª pregunta");
        return false;
    } else if (document.getElementById("selectMultiple").selectedIndex == -1) {
        alert("Responde la 5ª pregunta");
        document.getElementById("selectMultiple").focus;
        return false;
    } else if (document.getElementById("text2").value == "") {
        document.getElementById("text2").focus();
        alert("La 6ª pregunta es obligatoria");
        return false;
    } else if (document.getElementById("sel2").selectedIndex == 0) {
        document.getElementById("sel2").focus();
        alert("Selecciona una de las opciones en la 7ª pregunta");
        return false;
    } else if (!checked2) {
        document.getElementById("tituloCheckbox2").focus();
        alert("Debes elegir una opción en la 8ª pregunta");
        return false;
    } else if (!radioSelected2) {
        document.getElementById("tituloRadio2").focus();
        alert("Selecciona una opción en la 9ª pregunta");
        return false;
    } else if (document.getElementById("selectMultiple2").selectedIndex == -1) {
        alert("Responde la 10ª pregunta");
        document.getElementById("selectMultiple2").focus;
        return false;
    } else return true;
}

function mostrar() {
    document.getElementById('inicio').style.display = "none";
    document.getElementById('content').style.display = "block";
}
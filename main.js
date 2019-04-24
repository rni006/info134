var befolkning = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var sysselsatte = "http://wildboy.uib.no/~tpe056/folk/100145.json";
var utdanning ="http://wildboy.uib.no/~tpe056/folk/85432.json";

function startProgram() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", befolkning);
    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
     console.log("Type", xhr.getResponseHeader
     ("Content-Type"));
     console.log("Text", JSON.parse(xhr.responseText)); // JSON.parse before the xhr if u want
    }
    };
    xhr.send();
}

function presentData(outputElt, data){
    var outputElt = document.createElement("ul");
    for (var x in data.elements){
        var komunneNavn = document.getElementById("kommune-navn");
        var liElt = document.createElement("li");
	    liElt.appendChild(document.createTextNode(komunneNavn.kommunenummer));
        olElt.appendChild(liElt);
    }
}


window.onload = startProgram;



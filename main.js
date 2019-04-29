var befolkning = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var sysselsatte = "http://wildboy.uib.no/~tpe056/folk/100145.json";
var utdanning ="http://wildboy.uib.no/~tpe056/folk/85432.json";

function Database(url, callback){
  this.url=url;
  //  Get Name by using getNames sub_function
  this.getNames="";
  this.load = function(){startProgram(this.url, this, this.onload)}
  this.onload = null || callback
}

var befolkning_d = new Database(befolkning, function(){sysselsatte.load()})
var sysselsatte_d = new Database(sysselsatte)

/*
function main2(){
  var obj=new Database(befolkning);
  var list=obj.getNames();
  //var list= setTimeout(obj.getNames(),1000);
  console.log(list);
}

*/

function getData(url, obj){
  var xhttp = new XMLHttpRequest();
  //var txt=new Array();
  //var a="";
  xhttp.onreadystatechange = function() {
    //console.log(xhttp.readyState, this.status);
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      obj.data= JSON.parse(this.responseText);
      console.log("test");

  };
  xhttp.open("GET",url);
  xhttp.send();
  //return txt;
  //setTimeout(function(){console.log(txt);},1000);
}
}

function startProgram(url, obj, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onreadystatechange = function() {
	if (xhr.readyState === 4 && xhr.status === 200) {
	   obj.data = JSON.parse(xhr.responseText)

     if (callback) {
       callback()
     }
	}
    };
    xhr.send();
}

/*for (j in json_txt.elementer){
  txt.push(j+);;

};
console.log(txt);
}*/

//window.onload=main2;

var befolkning = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var sysselsatte = "http://wildboy.uib.no/~tpe056/folk/100145.json";
var utdanning ="http://wildboy.uib.no/~tpe056/folk/85432.json";

function startProgram() {
    var xhr = new XMLHttpRequest();
    // if (adress="befolkning")
    xhr.open("GET", befolkning);
    xhr.onreadystatechange = function() {
      // find out all datalist in this area
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log("Type", xhr.getResponseHeader("Content-Type"));
        // step 1 find out all list from befolkining adress
        var list=obj.get(this);
        var list_name=list[0];//getName
        var list_number=list[1];//getNumber
        var list_men=list[2];// population of men
        var list_women=list[3];// population of woman
        var n =list_name.length;
        // oversikt
        var txt="";
        for (var i =0; i<n; i++){
          var total= list_men[i][2018]+list_women[i][2018];
          var txt = txt +"<tr><td>"+list_number[i]+"</td><td>"+list_name[i]+"</td> <td>"+ total +"</td> </tr>";
          document.getElementById("oversikt").innerHTML=txt;
        };
    };
  }
    xhr.send();
}

function myfunction(){
  document.getElementById("demo").innerHTML="a";
}

var obj={
  get : function(xml){
    var txt=JSON.parse(xml.responseText);
    var name_list=new Array();
    var number_list=new Array();
    var men_list=new Array();
    var women_list= new Array()
    var integral_list=new Array();
    for (var j in txt.elementer){
      name_list.push(j);
      number_list.push(txt.elementer[j].kommunenummer);
      men_list.push(txt.elementer[j].Menn);
      women_list.push(txt.elementer[j].Kvinner);
    }
    console.log(women_list);
    integral_list.push(name_list,number_list,men_list,women_list);
    return integral_list;
  }

}

window.onload = startProgram();

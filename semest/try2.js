var befolkning = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var sysselsatte = "http://wildboy.uib.no/~tpe056/folk/100145.json";
var utdanning ="http://wildboy.uib.no/~tpe056/folk/85432.json";

function Database(url, callback){
  this.url=url;
  //  Get Name by using getNames sub_function
  this.getNames=function(){
    let array = []
    for (var variable in this.data.elementer) {
      array.push(variable)
    }
    //console.log(array);
    return array
    };
  this.getIds=function(){
      let array_id = [];
      for (var variable in this.elementer) {
        array_id.push(this.data.elementer[variable].kommunenummer);
      };
      //console.log(array);
      return array_id;
    }
  this.getInfo=function(){
    let dic = {};
    for (var variable in this.elementer) {
      var sub_dic={}
      var name=variable;
      var id=this.data.elementer[variable].kommunenummer;
      var men=this.data.elementer[variable].Menn;
      sub_dic["name"]=name;
      sub_dic["men"]=men;
      sub_dic["women"]=this.data.elementer[variable].Kvinner;
      dic[id]=sub_dic;
    };
    // console.log(dic);
    return dic;
  }
  this.employment=function(){
    let dic = {};
    for (var variable in this.elementer) {
      var sub_dic={}
      var name=variable;
      var id=this.data.elementer[variable].kommunenummer;
      var men=this.data.elementer[variable].Menn;
      sub_dic["name"]=name;
      sub_dic["men"]=men;
      sub_dic["women"]=this.data.elementer[variable].Kvinner;
      sub_dic["both"]=this.data.elementer[variable]["Begge kjønn"];
      dic[id]=sub_dic;
    };
    //console.log(dic);
    return dic;
  }
  this.education=function(){
    let dic={};
    for (var variable in this.elementer){
      var sub_dic={};
      var s
      var name=variable
      var id=this.data.elementer[variable].kommunenummer;
      sub_dic["name"]=name;
      sub_dic["01"]=this.data.elementer[variable]["01"];
      sub_dic["02a"]=this.data.elementer[variable]["02a"];
      sub_dic["11"]=this.data.elementer[variable]["11"];
      sub_dic["03a"]=this.data.elementer[variable]["03a"];
      sub_dic["04a"]=this.data.elementer[variable]["04a"];
      sub_dic["09a"]=this.data.elementer[variable]["09a"];
      dic[id]=sub_dic;
    }
    return dic;
  }
  this.load = function(){startProgram(this.url, this, this.onload)}
  this.onload = null || callback
}
/***var name_list=new Database(befolkning, function(){
  var a = name_list.getNames();
  return a ;
})
var b = name_list.onload()
console.log(b)***/
var befolkning_d = new Database(befolkning,function (){
  var info_dic = befolkning_d.getInfo();
  var id =befolkning_d.getIds();
  var name=befolkning_d.getNames();
  var txt="";
  for(var i =0; i<id.length; i++ ){
    var variable=id[i];
    var total= info_dic[variable]["men"]["2018"]+info_dic[variable]["women"]["2018"];
    txt = txt+"<tr><td>"+id[i] + "</td><td>"
    +name[i]+"</td><td>"+total+"</td></tr>";
  }
  //console(info_dic["0101"][men]["2018"])
  document.getElementById("oversikt").innerHTML=txt;
})
befolkning_d.load()

befolkning_d.load()
var sysselsatte_d = new Database(sysselsatte,function(){
  var dic=sysselsatte_d.employment();
})
sysselsatte_d.load()
var utdanning_d=new Database(utdanning,function(){
  var list=utdanning_d.education();

})
utdanning_d.load()


/****var befolk=new Database(befolkning, function(){
  var info=befolk.getInfo();
  var from=2007;
  var to=2018;
  var n= to-from;
  var number="0101";
  var txt=" <tr><th>item</th>";
  for(var i=0; i<n+1; i++){
    var year = from+i;
    txt=txt+"<th>"+ year+"</th>"
  }
  txt=txt+"<tr><td>men</td>"
  for (var i=0; i<n+1; i++){
    var year=from+i;
    txt=txt+"<td>"+info[number]["men"][year]+"</td>";
  }
  txt=txt+"</tr><tr><td>women</td>";
  for (var i=0; i<n+1; i++){
    txt=txt+"<td>"+info[number]["women"][from+i]+"</td>";
  }
  txt=txt+"</tr>";
  document.getElementById("befolkning").innerHTML=txt;
});
befolk.load()****/

function detailFunction(){
  var komnum = befolkning_d.getIds();
  var komumID = document.getElementById("kom_numID").value;
  var workInfo=sysselsatte_d.employment();
  var befolkInfo = befolkning_d.getInfo();
  var eduInfo= utdanning_d.education();
  var befolk=befolkInfo[komumID]["men"]["2017"]+befolkInfo["0101"]["women"]["2017"];
  komumID = komumID.padStart(4, '0');

  if(komnum.includes(komumID)){
    //alert('code is valid');
    // go thorugh all the information of the array, compare the kommune nummer to the actual kommune
    // and print out the information in a form of a table
    document.getElementById("d_overview").innerHTML=befolk;

    }

  else {
    alert('Kommunenummer eksisterer ikke, vennligst - prøv igjen')
  }

}

function compareFunction(){
  var komNum = befolkning_d.getIds()
  var komNumId = document.getElementById("com_number").value;
  var komNumId2 = document.getElementById("com_number2").value;
  var popuInfo = befolkning_d.getInfo();
  var tabell = "";

  if(komNum.includes(komNumId) && komNum.includes(komNumId2)){
    alert('ya boi')

    // how many people in each of the entered regions (both woman and man together)
    var population=popuInfo[komNumId]["men"]["2017"]+popuInfo[komNumId]["women"]["2017"];
    var population2=popuInfo[komNumId2]["men"]["2017"]+popuInfo[komNumId2]["women"]["2017"];

    console.log(population)
    console.log(population2)
  }
  else {
    alert('Kommunenummer var ikke fylt inn eller eksisterer ikke, vennligst - prøv igjen')
  }

}


function startProgram(url, obj, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onreadystatechange = function() {
	if (xhr.readyState === 4 && xhr.status === 200) {
	   obj.data = JSON.parse(xhr.responseText)
     obj.elementer=obj.data.elementer;

     if (callback) {
       callback()
     }
	}
    };
    xhr.send();
}

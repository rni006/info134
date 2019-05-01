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
  for(var i in info_dic){
    var total= info_dic[i]["men"]["2018"]+info_dic[i]["women"]["2018"];
    txt = txt+"<tr><td>"+id[i] + "</td><td>"
    +name[i]+"</td><td>"+total+"</td></tr>";
  }
  document.getElementById("oversikt").innerHTML=txt;
})
//befolkning_d.load()
var sysselsatte_d = new Database(sysselsatte,function(){
  var dic=sysselsatte_d.employment();
})
sysselsatte_d.load()
//var utdanning_d = new Database(utdanning_d)






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

//window.onload=main2;

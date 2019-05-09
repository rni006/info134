var befolkning = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var sysselsatte = "http://wildboy.uib.no/~tpe056/folk/100145.json";
var utdanning = "http://wildboy.uib.no/~tpe056/folk/85432.json";

function Database(url, callback) {
  this.url = url;
  //  Get Name by using getNames sub_function
  this.getNames = function () {
    let array = []
    for (var variable in this.data.elementer) {
      array.push(variable)
    }
    return array
  };
  this.getIds = function () {
    let array_id = [];
    for (var variable in this.elementer) {
      array_id.push(this.data.elementer[variable].kommunenummer);
    };
    return array_id;
  }
  this.getInfo = function () {
    let dic = {};
    for (var variable in this.elementer) {
      var sub_dic = {}
      var name = variable;
      var id = this.data.elementer[variable].kommunenummer;
      var men = this.data.elementer[variable].Menn;
      sub_dic["name"] = name;
      sub_dic["men"] = men;
      sub_dic["women"] = this.data.elementer[variable].Kvinner;
      dic[id] = sub_dic;
    };

    return dic;
  }
  this.employment = function () {
    let dic = {};
    for (var variable in this.elementer) {
      var sub_dic = {}
      var name = variable;
      var id = this.data.elementer[variable].kommunenummer;
      var men = this.data.elementer[variable].Menn;
      sub_dic["name"] = name;
      sub_dic["men"] = men;
      sub_dic["women"] = this.data.elementer[variable].Kvinner;
      sub_dic["both"] = this.data.elementer[variable]["Begge kjønn"];
      dic[id] = sub_dic;
    };
    return dic;
  }

  this.education = function () {
    let dic = {};
    for (var variable in this.elementer) {
      var sub_dic = {};
      var s
      var name = variable
      var id = this.data.elementer[variable].kommunenummer;
      sub_dic["name"] = name;
      sub_dic["01"] = this.data.elementer[variable]["01"];
      sub_dic["02a"] = this.data.elementer[variable]["02a"];
      sub_dic["11"] = this.data.elementer[variable]["11"];
      sub_dic["03a"] = this.data.elementer[variable]["03a"];
      sub_dic["04a"] = this.data.elementer[variable]["04a"];
      sub_dic["09a"] = this.data.elementer[variable]["09a"];
      dic[id] = sub_dic;
    }
    return dic;
  }
  this.load = function () {
    startProgram(this.url, this, this.onload)
  }
  this.onload = null || callback
}

var befolkning_d = new Database(befolkning, function () {
  var info_dic = befolkning_d.getInfo();
  var id = befolkning_d.getIds();
  var name = befolkning_d.getNames();
  var txt = "";
  for (var i = 0; i < id.length; i++) {
    var variable = id[i];
    var total = info_dic[variable]["men"]["2018"] + info_dic[variable]["women"]["2018"];
    txt = txt + "<tr><td>" + id[i] + "</td><td>" +
      name[i] + "</td><td>" + total + "</td></tr>";
  }
  document.getElementById("oversikt").innerHTML = txt;
})

// Laster inn befolkning JSON
befolkning_d.load()

var sysselsatte_d = new Database(sysselsatte, function () {
  var dic = sysselsatte_d.employment();
})

// Laster inn sysselsetting JSON
sysselsatte_d.load()

var utdanning_d = new Database(utdanning, function () {
  var list = utdanning_d.education();
})

// Laster inn utdanning JSON
utdanning_d.load()

// Funksjonen som viser siste målte infromasjon om en bestemt kommune 

function detailFunction() {
  document.getElementById("develop").style.display = "none";
  document.getElementById("display").style.display = "none";
  var komnum = befolkning_d.getIds();
  var komumID = document.getElementById("kom_numID").value;
  var workInfo = sysselsatte_d.employment();
  var befolkInfo = befolkning_d.getInfo();
  var eduInfo = utdanning_d.education();
  komumID = komumID.padStart(4, '0');


  if (komnum.includes(komumID)) {
    var befolk_both_siste = Number(befolkInfo[komumID]["men"]["2018"]) + Number(befolkInfo[komumID]["women"]["2018"]);
    var befolk_both = Number(befolkInfo[komumID]["men"]["2017"]) + Number(befolkInfo[komumID]["women"]["2017"]);
    var edu_prosent = eduInfo[komumID]["03a"]["Menn"]["2017"] + eduInfo[komumID]["03a"]["Kvinner"]["2017"] + eduInfo[komumID]["04a"]["Menn"]["2017"] + eduInfo[komumID]["04a"]["Kvinner"]["2017"];
    var edu_befolk = (befolk_both * edu_prosent) / 100;
    var edu_work = workInfo[komumID]["men"]["2018"] + workInfo[komumID]["women"]["2018"];
    edu_befolk = edu_befolk.toFixed(2);
    edu_prosent = edu_prosent.toFixed(2);
    var overview_th = "<tr><th>ID:</th><th>Name:</th><th>Befolk(2018):</th><th>Sysselsetting(2018):</th><th>Prosent for høyere utdaning(2017):</th><th>Antall for høyere utdanning(2017):</th></tr>";
    var overview_tb = "<tr><td>" + komumID + "</td><td>" + befolkInfo[komumID]["name"] + "</td><td>" + befolk_both_siste + "</td><td>" + edu_work + "</td><td>" + edu_prosent + "</td><td>" + edu_befolk + "</td></tr>";
    document.getElementById("table_overview").innerHTML = overview_th + overview_tb;
    document.getElementById("display").style.display = "block";
  } else {
    document.getElementById("display").style.display = "none";
    alert("Feil kommunenummer, vennligst prøv igjen");
  }
}

// Funksjonen som viser historisk data på skjermen til brukeren, når den har valgt et kommune å se mer detaljer om

function history() {
  document.getElementById("develop").style.display = "block";
  var komumID = document.getElementById("kom_numID").value;
  var komnum = befolkning_d.getIds();
  var komumID = document.getElementById("kom_numID").value;
  var workInfo = sysselsatte_d.employment();
  var befolkInfo = befolkning_d.getInfo();
  var eduInfo = utdanning_d.education();

  /**** tabell over befolkning, både mann, kvinne og begge ****/
  var pop_head = "<tr><th></th>";
  var pop_men = "<tr><td>Menn</td>";
  var pop_women = "<tr><td>Kvinner</td>";
  for (var i in befolkInfo[komumID]["men"]) {
    pop_head = pop_head + "<th>" + i + "</th>";
    pop_men = pop_men + "<td>" + befolkInfo[komumID]["men"][i] + "</td>";
    pop_women = pop_women + "<td>" + befolkInfo[komumID]["women"][i] + "</td>";
  }
  var pop_txt = pop_head + "</tr>" + pop_men + "</tr>" + pop_women + "</tr>"
  document.getElementById("his_popu").innerHTML = pop_txt;

  /**** tabell for sysselsetting ****/
  var work_head = "<tr><th></th>";
  var work_men = "<tr><td>Menn</td>";
  var work_women = "<tr><td>Kvinner</td>";
  var work_both = "<tr><td>Begge</td>"
  for (var i in workInfo[komumID]["men"]) {
    work_head = work_head + "<th>" + i + "</th>";
    work_men = work_men + "<td>" + workInfo[komumID]["men"][i] + "</td>";
    work_women = work_women + "<td>" + workInfo[komumID]["women"][i] + "</td>";
    work_both = work_both + "<td>" + workInfo[komumID]["both"][i] + "</td>";
  }
  var work_txt = work_head + "</tr>" + work_men + "</tr>" + work_women + "</tr>" + work_both + "</tr>";
  document.getElementById("his_work").innerHTML = work_txt;

  /************ tabell for utdanning - mann ***********/
  var item_list = ["01", "02a", "11", "03a", "04a", "09a"];
  var year_list = [];
  var tb_men = [];
  var tb_women = []
  for (var i in eduInfo[komumID]["01"]["Menn"]) {
    var obj = "<tr><td>" + i + "</td>"
    year_list.push(i);
    tb_women.push(obj);
    tb_men.push(obj);
  }
  var th_men = "<tr><th></th>";
  for (var head in item_list) {
    var th_men = th_men + "<th>" + item_list[head] + "</th>";
    for (var j = 0; j < year_list.length; j++) {
      tb_men[j] = tb_men[j] + "<td>" + eduInfo[komumID][item_list[head]]["Menn"][year_list[j]] + "</td>";
    }
  }
  var txt_men = "";
  for (var i in tb_men) {
    txt_men += tb_men[i];
  }
  document.getElementById("his_edu_men").innerHTML = th_men + "</tr>" + txt_men + "</tr>";

  /************ tabell for utdanning - kvinner  **************/
  var th_women = "<tr><th></th>";
  for (var head in item_list) {
    var th_women = th_women + "<th>" + item_list[head] + "</th>";
    for (var j = 0; j < year_list.length; j++) {
      tb_women[j] = tb_women[j] + "<td>" + eduInfo[komumID][item_list[head]]["Kvinner"][year_list[j]] + "</td>";
    }
  }
  var txt_women = "";
  for (var i in tb_women) {
    txt_women += tb_women[i];
  }
  document.getElementById("his_edu_women").innerHTML = th_women + "</tr>" + txt_women + "</tr>";

}

// Funksjonen for å sammenligne 2 forskjellige funksjoner

function compareFunction() {

  var komNum = sysselsatte_d.getIds();
  var komNumId = document.getElementById("com_number").value;
  var komNumId2 = document.getElementById("com_number2").value;
  var popuInfo = sysselsatte_d.getInfo();

  if (komNum.includes(komNumId) && komNum.includes(komNumId2)) {

    let kom1 = popuInfo[komNumId];
    let kom2 = popuInfo[komNumId2];

    var kom1Man = {}
    var kom1Woman = {}
    var kom2Man = {}
    var kom2Woman = {}

    Object.entries(kom1.men).forEach(
      ([key, value]) => kom1Man[key] = value
    );

    Object.entries(kom1.women).forEach(
      ([key, value]) => kom1Woman[key] = value
    );

    Object.entries(kom2.men).forEach(
      ([key, value]) => kom2Man[key] = value
    );

    Object.entries(kom2.women).forEach(
      ([key, value]) => kom2Woman[key] = value
    );

    var table = document.getElementById("result");
    table.innerHTML = "dank memes"

    var content = "<table><tr><th>Årstall</th><th>" + kom1.name + " sysselsetting for men </th><th>" + kom2.name + " sysselsetting for men</th></tr>";

    Object.entries(kom1Man).forEach(
      ([key, value]) => {
        let kom1value = "<td>" + value + "%</td>";
        let kom2value = "<td>" + kom2Man[key] + "%</td>";

        if (value > kom2Man[key]) {
          kom1value = "<td class='red'>" + value + "%</td>";
        } else {
          kom2value = "<td class='red'>" + kom2Man[key] + "%</td>";
        }

        content += "<tr><td>" + key + "</td>" + kom1value + kom2value + "</tr>"
      }
    );

    content += "</table>";

    var table2 = document.getElementById("result2");
    table2.innerHTML = "dank meme"

    var content2 = "<table><tr><th>Årstall</th><th>" + kom1.name + " sysselsetting for kvinner </th><th>" + kom2.name + " sysselsetting for kvinner</th></tr>";

    Object.entries(kom1Woman).forEach(
      ([key, value]) => {
        let kom1valueWo = "<td>" + value + "%</td>";
        let kom2valueWo = "<td>" + kom2Woman[key] + "%</td>";


        if (value > kom2Woman[key]) {
          kom1valueWo = "<td class='red'>" + value + "%</td>";
        } else {
          kom2valueWo = "<td class='red'>" + kom2Woman[key] + "%</td>";
        }
        content2 += "<tr><td>" + key + "</td>" + kom1valueWo + kom2valueWo + "</tr>"
      }
    );

    content2 += "</table>";

    table.innerHTML = content
    table2.innerHTML = content2

  } else {
    alert('Kommunenummer var ikke fylt inn eller eksisterer ikke, vennligst - prøv igjen')
  }

}


function startProgram(url, obj, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      obj.data = JSON.parse(xhr.responseText)
      obj.elementer = obj.data.elementer;

      if (callback) {
        callback()
      }
    }
  };
  xhr.send();
}
function NewGame(){
    document.getElementById("page2").style.display="none";
    document.getElementById("p1").value="";
    document.getElementById("p2").value="";
    document.getElementById("p1").placeholder="Enter name";
    document.getElementById("p2").placeholder="Enter name";
    document.getElementById("page1").style.display="block";
}


function begin(){
  var playname1=nim.player1=document.getElementById("p1").value;
  var playname2=nim.player2=document.getElementById("p2").value;
  var condition1= playname1==playname2;
  var condition2= playname1=="";
  var condition3= playname2=="";
  var condition4 = condition2&&condition1;
  if (condition4){
    alert("please eneter name for both two players ");
  }
  else if (condition2){
    alert("Please enter name of player1. ");
  }
  else if (condition3){
    alert("Please enter name of player2. ");
  }
  else if(condition1 && condition2==false && condition3==false){
    alert("Please enter different name. ");
  }
  else {
    document.getElementById("page1").style.display="none";
    document.getElementById("page2").style.display="block";
    document.getElementById("player").innerHTML=document.getElementById("p1").value;
    nim.player1=document.getElementById("p1").value;
    nim.player2=document.getElementById("p2").value;
    document.getElementById('move').innerHTML="takes";
    document.getElementById("number").innerHTML=nim.total;
    document.getElementById("diff").innerHTML=1;
  }

}

function player1(x){
    var door1=document.getElementById("diff").innerHTML==1;
    if (door1 == true) {
      var number=document.getElementById("number").innerHTML-x;
      if (number>0){
        document.getElementById("number").innerHTML=number;
        document.getElementById("player").innerHTML=nim.player2;
        document.getElementById("diff").innerHTML=2;
      }
      else if (number==0) {
        document.getElementById("number").innerHTML=number;
        document.getElementById("move").innerHTML=nim.victory;
        document.getElementById("new").style.visability="visable";
      }
    }
    else{  alert("this is the turn to "+ nim.player2+"." ); }
}
function player2(x){
    var door2= document.getElementById("diff").innerHTML==2;
    if (door2 == true) {
      var number=document.getElementById("number").innerHTML-x;
      if (number>0){
        document.getElementById("number").innerHTML=number;
        document.getElementById("player").innerHTML=nim.player1;
        document.getElementById("diff").innerHTML=1
      }
      else if (number==0) {
        document.getElementById("number").innerHTML=number;
        document.getElementById("move").innerHTML=nim.victory;
        document.getElementById("new").style.visability="visable";
      }
    }
    else{alert("This is the turn to "+nim.player1+".") ; }
}

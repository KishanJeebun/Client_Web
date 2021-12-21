var maintab=document.getElementById("main");
var listtab=document.getElementById('listtab');
var pietab=document.getElementById('pietab');
var remainingBalance = 0;
var totalExpenseAmount = 0;

openHomeTab();
loadFromLocal();
currentBalance();

//document.getElementById('currentBalance').innerHTML = "$" + remainingBalance;

function loadFromLocal(){
totalBalance =JSON.parse(localStorage.getItem("totalBalance"));
if(totalBalance === null){
    totalBalance = 0;

}
 document.getElementById("totalBalanceInput").value = totalBalance;
localArray = JSON.parse(localStorage.getItem("savedData"));
if(localArray === null){
    localArray = [];
}else{

console.log('loadFromLocal func called');
for( var i in localArray){
     
        for(var name in localArray[i]){
        rederLi(name,localArray[i][name]);
      }
    }
}
pieFunc();

}

function remove(ev){

    var name = ev.target.parentElement.innerText ;
    console.log(name);
    name = name.slice(0, name.indexOf('$')-1);
      console.log(name);

    for (var i =0; i<localArray.length;i++){
        for(var lname in localArray[i]){

        console.log(localArray[i]);
           if(lname == name){
            var index = localArray.indexOf(localArray[i]);
             if(index >-1){
             localArray.splice(index,1);
             }
        }
                localStorage.setItem("savedData",JSON.stringify(localArray));

    }
}
pieFunc();
}
function openListTab(ev){
    maintab.style.display = "none";
    pietab.style.display = "none";
    listtab.style.display = "block";

}
function openPieTab(ev){
    pieFunc();
    maintab.style.display = "none";
    listtab.style.display = "none";
    pietab.style.display = "block";

}
function openHomeTab(ev){
    maintab.style.display = "block";
    listtab.style.display = "none";
    pietab.style.display = "none";
}


function TotalBalance(){
   totalBalance = document.getElementById("totalBalanceInput").value;
   localStorage.setItem("totalBalance", JSON.stringify(totalBalance));
currentBalance();   pieFunc();
}

function addExpense(){
     var x = document.getElementById("expenseName").value;
     var y = document.getElementById("expenseCost").value;
    if((x || y) === "")  {
         console.log("return" + x + y);
         return;
      
      }

    rederLi(x,y);

     var expense = {};
     expense[x] = y;
     localArray.push(expense);
     localStorage.setItem("savedData", JSON.stringify(localArray));


     document.getElementById("expenseName").value ="" ;
     document.getElementById("expenseCost").value = "";

        pieFunc();
       currentBalance();

}

function pieFunc(){
    var label = [];
var cost = [];
            var d = 0;

    console.log("PIEfUNC called")
    for( var i in localArray){
     
        for(var name in localArray[i]){
            label[i] = name;
            cost[i] = localArray[i][name];
        }
    }
    for(var i in cost){
        d += parseInt(cost[i]);
    }
 
        totalExpenseAmount = d;
        currentBalance();



  
var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
  type: 'pie',
  options: {
                 maintainAspectRatio: false,
             },
  data: {

    labels: label,
    datasets: [{
      backgroundColor: [
        "#2ecc71",
        "#3498db",
        "#95a5a6",
        "#9b59b6",
        "#f1c40f",
        "#e74c3c",
        "#34495e",
        "#FF80AB",
        "#CDDC39",
        "#18FFFF",
        "#4DB6AC"
      ],
      data: cost
    }]
  }
});
}
function currentBalance(){

        remainingBalance = totalBalance - totalExpenseAmount;
        console.log('currentbal calld');
        document.getElementById('currentBalance').innerHTML = "$" + remainingBalance;
}
function rederLi(a,b){
    console.log("rederLi fun calld");
   var LI = document.createElement("li");
        var t = document.createTextNode(a);
        LI.appendChild(t);
        LI.className += "w3-card ";
        LI.className += "w3-panel ";
       
                    var spn = document.createElement("span");
                    var spnTxt = document.createTextNode("X");
                    spn.className += "w3-button ";
                    spn.className += "w3-tiny ";
                    spn.className += "w3-right ";
                    spn.appendChild(spnTxt);
                    spn.onclick =function(){
                    this.parentElement.style.display ="none";
                    remove(event);

                }
       
        var costspan = document.createElement("span");
        var u = document.createTextNode("$" + b);
        costspan.appendChild(u);
        costspan.className += "w3-right ";
        costspan.className += "costspan "
        LI.appendChild(spn); 
        LI.appendChild(costspan);
        document.getElementById("myUL").appendChild(LI);
}

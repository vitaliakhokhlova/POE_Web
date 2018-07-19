function manageForm(){
    var title = document.forms["myform"].elements["title"].value;
    var price = document.forms["myform"].elements["price"].value;
    var nbpages = document.forms["myform"].elements["nbpages"].value;
    var authors = document.forms["myform"].elements["authors"].value;
    var publisher = document.forms["myform"].elements["publisher"].value;
    document.write('Vous avez entré:<br/>' + 'Title: ' + title +'<br/>'+'Price: ' +price+'<br/>'+'Nombre de pages: ' + nbpages+'<br/>'+'Author: ' + authors+'<br/>'+'Publisher: '+publisher+'<br/>');
}
function checkElement(elementName){
    var value = document.forms["myform"].elements[elementName].value;
    if(value.length == 0) document.getElementById(elementName).style.visibility = "visible";
    else document.getElementById(elementName).style.visibility = "hidden";
}


var changeElementsByTag = function(tag, couleur, fontsize){
    list = document.getElementsByTagName(tag);            
    for(var i= 0; i < list.length; i++){               
        list[i].style.color = couleur;
        list[i].style.fontSize = fontsize;
    }
}


var toggleVisibleClass = function(classname){
   var elementOfClass = document.getElementsByClassName(classname)[0];
   if(elementOfClass.style.visibility === "hidden") {
    elementOfClass.style.visibility = "visible";       
   }
   else  {
    elementOfClass.style.visibility = "hidden";
                  }
}

function myBlurFunctionForm() {
    for(var i = 0; i <  this.elements.length; i++){
        var v = this.elements.item(i);
            if(v.value.length == 0) document.getElementById('error' + v.id).style.visibility = "visible";
            else document.getElementById('error' + v.id).style.visibility = "hidden";
 }}

 this.myBlurFunction = function(condition){
    if(condition) document.getElementById('error' + this.id).style.visibility = "visible";
    else document.getElementById('error' + this.id).style.visibility = "hidden";
 }
 title.addEventListener("blur",this.myBlurFunction.bind(this, this.value.length ===0),true);

 //myform.addEventListener("blur", myBlurFunctionForm, true);
changeDiv.addEventListener("click", changeElementsByTag.bind(this,'div','blue','30pt'),false);
toggle.addEventListener("click",toggleVisibleClass.bind(this,'hello'),false);
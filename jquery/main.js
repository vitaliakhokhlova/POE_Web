var listKey = ['A','Z','E','R','T','Y','U','I','O','P'];

var Clavier = {
    'listKey' : [],
    
  	create : function(listKey, id){
  	this.listKey = listKey;
    
      for(var i = 0; i < listKey.length; i++){
          $(id).append('<li id="' + this.listKey[i] + '">' + this.listKey[i] + '</li>');
          $('#' + this.listKey[i]).on('click', function(){
          $('input').val($('input').val()+$(this).text());
})}
 }}


var clavier = Object.create(Clavier);
clavier.create(listKey,'#clavier');
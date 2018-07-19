$.ajax({
    url : 'data.json',
    dataType : 'json',
    success : function(r, s){
        var listEleves = r;

        for(var i = 0; i < listEleves.length; i++){
            var m = moyenne(listEleves[i].notes).toFixed(2);
            $('body').append('<div>' + listEleves[i].prenom + ' ' + listEleves[i].nom + 'a une moyenne: '+ m +'</div>');
        }
    }
})

function moyenne(tab){
    var somme = 0;
    for(var i = 0; i < tab.length; i++){
        somme += tab[i];
    }
    return somme/tab.length;
}
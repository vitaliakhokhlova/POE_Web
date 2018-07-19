$('body').unbind('submit').on('submit','form', function(){
    if(this.id =='formLogin') {Chat.connect();}
    else if(this.id == 'formMessage') {
        Chat.addmessage();
    }
    return false;
});


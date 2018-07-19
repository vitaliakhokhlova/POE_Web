var Chat = {
    username : '',

    connect : function () {
        var self = this;
        this.username = $('form input[type="text"]').val();
        $('#loginBox').remove();

        $.ajax({
            url : 'index.html',
            dataType: 'html',
            success: function (r,s) {
                $('body').html(r);
                $('#colonneUsers ul').append('<li>' + self.username + '</li>');
            }
        })
    },

    addmessage : function(){
        var message = $('form input[type="text"]').val();
        $('#listMessages ul').append('<p>' + message + '</p>');
        $('form input[type="text"]').val('');
    }
};
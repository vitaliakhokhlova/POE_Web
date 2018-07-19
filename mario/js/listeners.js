var jumpDuration = 1;
var jumpPosition = '300px';
var speedPiece = 3000;
var speedCarapace = 4000;
var score = 0;
var skyScrollSpeed = 20;
var roadScrollSpeed = 1;

$(document).on('keyup', function(e){
    if(e.keyCode == 32) {
        Player.jump(jumpDuration,jumpPosition);
    }
})

var Player = {
    jump : function(time, position){
        /*$('#player').css('transition','bottom ' + time + 's');
        $('#player').css('bottom',position);
        var wait = setTimeout(function () {
            $('#player').css('bottom','15px');
        },time*1000);*/
        $('#player').animate({
            bottom: position
        }, function(){
            $('#player').animate({
                bottom: '15px'})
        })
    },

    collisionPiece : function(){
        var bool = false;
        var player ={
            x:  parseInt($('#player').css('left'),10),
            y: parseInt($('#player').css('bottom'),10),
            width: parseInt($('#player').css('width'),10),
            height: parseInt($('#player').css('height'),10)
        }

        var piece ={
            x:  parseInt($('#piece').css('left'),10),
            y: parseInt($('#piece').css('bottom'),10),
            width: parseInt($('#piece').css('width'),10),
            height: parseInt($('#piece').css('height'),10)
        }
        if (player.x < piece.x + piece.width &&
            player.x + player.width > piece.x &&
            player.y < piece.y + piece.height &&
            player.height + player.y > piece.y) {
            bool = true;
        }
        return bool;
    },

    collisionCarapace : function(){
        var bool = false;
        var player ={
            x:  parseInt($('#player').css('left'),10),
            y: parseInt($('#player').css('bottom'),10),
            width: parseInt($('#player').css('width'),10),
            height: parseInt($('#player').css('height'),10)
        }

        var carapace ={
            x:  parseInt($('#carapace').css('left'),10),
            y: parseInt($('#carapace').css('bottom'),10),
            width: parseInt($('#carapace').css('width'),10),
            height: parseInt($('#carapace').css('height'),10)
        }
        if (player.x < carapace.x + carapace.width &&
            player.x + player.width > carapace.x &&
            player.y < carapace.y + carapace.height &&
            player.height + player.y > carapace.y) {
            bool = true;
        }
        return bool;
    }
}

var Piece = {
    run : function ()
    {
        var self = this;
        $('#piece').animate(
            {
                left: '-10%'
            }, speedPiece, function(){
                $('#piece').css('left','110%');
                self.run();
            }
        )
    }
}

Piece.run();

var Carapace = {
    run : function ()
    {
        var self = this;
        $('#carapace').animate(
            {
                left: '-10%'
            }, speedCarapace, function(){
                $('#carapace').css('left','110%');
                self.run();
            }
        )
    }
}

Carapace.run();

var checkCollission =function () {
    if(Player.collisionPiece()){
        $('#piece').stop();
        $('#piece').css('left','110%');
        $('#score').text(score+=1);
        Piece.run();
    }
    if(Player.collisionCarapace()) {
        $('#carapace').stop();
        $('#carapace').css('left','110%');
        $('#score').text(score-=1);
        Carapace.run();
    }
}



var current = 0;
function skyScroll(){
    $('#sky').css("backgroundPosition", (current--)+"px 0");
}

var i = 0;
function roadScroll(){
    $('#road').css("backgroundPosition",(i--) + "px 0");
}

setInterval(checkCollission,1);
setInterval(skyScroll, skyScrollSpeed);
setInterval(roadScroll,roadScrollSpeed);


//TABLEAU ITEM INITIALISE A VIDE
var items = [];

var Game = {
    score : 0,
    checkCollisions : function(player, items){
        player.xTemp = parseInt($('#' + player.id).css('left'));
        player.yTemp = parseInt($('#' + player.id).css('bottom'));

        //ON PARCOURT LE TABLEAU CONTENANT TOUS LES ITEMS
        for(var i = 0; i<items.length;i++)
        {
            //ON RECUPERE LA POSITION COURANTE DE L'ITEM PARCOURU
            items[i].xTemp = parseInt($('#' + items[i].id).css('left'));
            items[i].yTemp = parseInt($('#' + items[i].id).css('bottom'));

            //CONDITION DE VERIFICATION
            if (player.xTemp < items[i].xTemp + items[i].width &&
                player.xTemp + player.width > items[i].xTemp &&
                player.yTemp < items[i].yTemp + items[i].height &&
                player.height + player.yTemp > items[i].yTemp) {
                //SI ITEM NON TOUCHE DURANT SON ANIMATION, ON INCREMENTE LA COLLISION
                    if(items[i].touch == 0)
                    {
                        //ITEM TOUCHE
                        items[i].touch = 1;

                        //SCORE EN FONCTION DU TYPE D'ITEM
                        if(items[i].type == 1)
                            Game.scoring('win')
                        if(items[i].type == 0)
                            Game.scoring('loose')

                        //ON FAIT DISPARAITRE L'ITEM
                        $('#' + items[i].id).css('width', 0);
                    }
            }
        }
    },
    scoring: function(type){
        if(type == 'win'){
            this.score += 1;
        }
        else
        {
            this.score -= 1;
            if(this.score < 0)
                this.score = 0;
        }
        //AFFICHAGE DU SCORE MIS A JOUR
        $('#score').text(this.score);
    },
    scrolling: function(){
        var self = this;

        //ON CHANGE LA POSITION DU BACKGROUND TOUTES LES X SECONDES, COMME PAR DEFAUT IL SE REPETE, CELA DONNERA CETTE IMPRESSION DE DEFILEMENT
        $('#sky').animate({
            'background-position': '-=70'
        }, 1000, 'linear', function(){ self.scrolling() });

        $('#road').animate({
            'background-position': '-=400'
        }, 1000, 'linear', function(){ self.scrolling() });
    }
}

var Player = {
    id : '',
    x : 0,
    y : 0,
    skin : '',
    highJump : 0,
    timeJump : 0,
    width: 0,
    height: 0,
    init : function(id, x, y, skin, highJump, timeJump){
        var self = this;
        self.id = id;
        self.x = x;
        self.y = y;
        self.skin = 'img/player/' + skin + '.png';
        self.highJump = highJump;
        self.timeJump = timeJump;

        //CREATION DU JOUEUR EN HTML
        $('#game').append('<div id="' + self.id + '" class="player"></div>');
        $('#' + self.id).append('<img src="' + self.skin + '" />');
        $('#' + self.id).css('bottom', self.y).css('left', self.x);

        //RECUPERATION DE SES DIMENSIONS
        self.width = parseInt($('#' + self.id).css('width'));
        self.height = parseInt($('#' + self.id).css('height'));
    },
    jump : function(){
        var self = this;
        $('#' + self.id).animate({
            'bottom' : self.y + self.highJump
        }, self.timeJump, function(){
            $('#' + self.id).animate({
                'bottom' : self.x
            })
        })
    }
}

var Item = {
    id : '',
    x : 0,
    y : 0,
    skin : '',
    speed : 0,
    width: 0,
    height: 0,
    type : 0,
    touch : 0,
    init : function(id, x, y, skin, speed, type){
        var self = this;
        self.id = id;
        self.x = x;
        self.y = y;
        self.skin = 'img/items/' + skin + '.png';
        self.speed = speed;
        self.type = type;

        $('#game').append('<div id="' + self.id + '" class="items"></div>');
        $('#' + self.id).append('<img src="' + self.skin + '" />');
        $('#' + self.id).css('bottom', self.y).css('left', self.x);

        self.width = parseInt($('#' + self.id).css('width'));
        self.height = parseInt($('#' + self.id).css('height'));

        //AJOUT DE L'ITEM A LA LISTE DES ITEMS
        items.push(self);
        self.run();
    },
    run : function(){
        var self = this;

        //SI L'ITEM A ETE TOUCHE, ON LE FAIT REAPPARAITRE AU DEBUT DE L'ANIMATION (VOIR LIGNE 34, Game.checkCollision)
        if(self.touch == 1)
        {
            $('#' + self.id).css('width', '');
            self.touch = 0;
        }

        $('#' + self.id).animate({
            'left' : '-' + self.width + 'px'
        }, self.speed, function(){
            $('#' + self.id).css('left', '110%');
            self.run();
        })
    }
}

//DEMARRAGE DU SCROLLING DU DECOR
Game.scrolling();

//CREATION DU JOUEUR
Player.init('player', 15, 15, 'player', 150, 0500);

//CREATION DES ITEMS
var Piece = Object.create(Item);
Piece.init('piece', '90%', 5, 'piece', 2000, 1);

var Carapace = Object.create(Item);
Carapace.init('carapace', '90%', 5, 'carapace', 1500, 0);

setInterval(function(){Game.checkCollisions(Player, items)}, 0100);
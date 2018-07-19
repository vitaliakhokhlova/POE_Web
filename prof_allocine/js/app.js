//ON AJOUTE LE DOCUMENT.READY POUR ETRE SUR QUE TOUTE LA PAGE EST CHARGEE AVANT DE LANCER LES SCRIPTS. CELA PERMET DE CONSERVER LES SCRIPTS DANS LE BODY. ON NOTE QUE SLIDER EST DEFINI AVANT PUIS COMPLETE AFIN DE RESPECTER LA PORTEE DES VARIABLES
var Slider = undefined;
$(document).ready(function() { Slider = {
    id : undefined,
    width: 0,
    height: 0,
    slides: [],
    nbSlides: 0,
    currentSlide: 1,
    speed: 0,
    init: function(id, width, height, slides, parent, speed)
    {
        this.id = id;
        this.width = width;
        this.height = height;
        this.slides = slides;
        this.nbSlides = this.slides.length;
        this.currentSlide = 1;
        this.speed = speed;
        
        //CREATION DU SLIDE DANS LA DIV PARENTE
        $(parent).append('<div id="'+this.id+'" class="containerSlider"></div>');
        $('#' + this.id).css('width', this.width + 'px').css('height', this.height + 'px');
        
        //CREATION DE LA DIV ABSOLUE CONTENANT LES SLIDES ET CALCUL DE SA TAILLE EN FONCTION DE LEUR NOMBRE
        $('#' + this.id).append('<div id="'+this.id+'Slides" class="containerSlides"></div>');
        $('#' + this.id + 'Slides').css('width', '300%');
        
        //ON PARCOURT LA LISTE DES ARTICLES/SLIDES
        var self = this;
        self.createDivSlides();
        self.fillDivSlides(1);
        
        //CREATION DU COMPTEUR ET DES FLECHE PREV + NEXT
        $('#' + this.id).append('<div id="'+this.id+'Compteur" class="sliderCompteur">'+(this.currentSlide) +'/'+this.nbSlides+'</div>')
        $('#' + this.id).append('<div id="'+this.id+'ArrowPrev" class="sliderArrowPrev"><i class="fas fa-angle-left"></i></div>');
        $('#' + this.id).append('<div id="'+this.id+'ArrowNext" class="sliderArrowNext"><i class="fas fa-angle-right"></i></div>');
        
        //STOCKAGE DE L'OBJET PROTOTYPE PAR SLIDER DANS UNE VARIABLE AFIN DE CONTOURNER LE PB DU THIS DANS L'APPEL D'UNE FONCTION DANS UN ECOUTEUR (THIS SE REFERANT ALORS A L'OBJET DU DOM SUR LEQUEL ON A CLIQUE ET PLUS A L'OBJET AUQUEL APPARTIENT LA METHODE)

        
        //ECOUTEURS
        $('#' + this.id).on('click', '#'+this.id+'ArrowPrev', function (){
            self.changeSlide(-1)
        });
        $('#' + this.id).on('click', '#'+this.id+'ArrowNext', function (){
            self.changeSlide(1)
        });
        
        //DEFILEMENT AUTOMATIQUE
        var autoSlide = setInterval(function() {
            self.changeSlide(1)
        }, self.speed);
        
        //ARRET DEFILEMENT AUTO
        $(parent).on('mouseover', '#'+this.id, function (){
            clearInterval(autoSlide);
        });
        
        //REPRISE DEFILEMENT AUTO
        $(parent).on('mouseout', '#'+this.id, function (){
            autoSlide = setInterval(function() {
                self.changeSlide(1)}, self.speed);});
    },

    createDivSlides : function(){

        for(var i = 0;i<3;i++)
        {
            //CREATION DE L'ARTICLE/SLIDE
            $('#' + this.id + 'Slides').append('<article id="slide'+i+this.id+'" class="slide"></article');
            $('#slide' + i + this.id).css('width', this.width + 'px').css('height', this.height + 'px').css('background-size', 'cover');
        }

    },

    fillDivSlides : function(start){
        var indexes =[
            (start - 2+this.nbSlides) % this.nbSlides,
            (start - 1+this.nbSlides) % this.nbSlides,
            (start +this.nbSlides) % this.nbSlides
        ];


        for(var i = 0;i<3;i++)
        {
            //CREATION DE L'ARTICLE/SLIDE
                 $('#slide' + i + this.id).css('background', 'url("'+this.slides[indexes[i]]['image']+'") no-repeat center top');

        }
        $("#" + this.id + "Slides").css('left','-100%');
    },


    changeSlide: function (deplacement) {
        this.currentSlide = (this.currentSlide + deplacement + this.nbSlides) % this.nbSlides;
        if(this.currentSlide == 0) this.currentSlide =3;
        var self = this;
        console.log(self.currentSlide);
        $("#" + this.id + "Slides").animate({
            left : -deplacement-1 +'00%'
        },'linear', function () {
            $("#" + self.id + "Compteur").text(self.currentSlide + '/' + self.nbSlides);
            self.fillDivSlides(self.currentSlide);
        })
    }
}
});
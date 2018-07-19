function circleArea(rayon){
    return Math.PI * rayon * rayon;
}

function sum(tab){
    var s = 0;
    for(var i = 0; i < tab.length; i++){
        s += tab[i];
    }
    return s;
}

function maximum(tab){
    var m = tab[0];
    for(var i = 1; i < tab.length; i++){
        if(m < tab [i]) m = tab[i];
    }
    return m;
}

function avg(tab){
    return sum(tab)/tab.length;
}

function isPrimeNumber(n){
    var is = true;
    if(n < 2) is = false;
    else if(n == 2) is = true;
    else{
        for(var i = 2; i <= Math.pow(n, 0.5); i++){
        if (n%i == 0) {
            is = false;
            break;
        }
    }}
    return is;
}

function listOfPrimeNumbers(tab){
    return  tab.filter(isPrimeNumber);
}

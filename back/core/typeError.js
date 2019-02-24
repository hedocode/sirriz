function checkNumber(n, name){
    if(typeof(n) != "number"){
        v = Number.parseFloat(n);
        if(Number.isNaN(n)){
            throw name + ' must be a number';
        }
    }
    return n;
}

function checkPositive(n){
    checkNumber(n);
    return n < 0 ? false : true;
}

module.exports.isNumber = checkNumber;
module.exports.isPositive = checkPositive;
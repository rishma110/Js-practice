var isPerfectSquare = function(num) {
    let sum = 0;
    for(let i=1; i<= Math.ceil(num/2)+2; i=i+2){
        sum = sum + i;
        if(sum === num){
            return true;
        }
        else if(sum > num){
            return false;
        }
    }
    
};
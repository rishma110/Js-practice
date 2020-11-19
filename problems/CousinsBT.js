// **
//  * @param {TreeNode} root
//  * @param {number} x
//  * @param {number} y
//  * @return {boolean}
//  */
 export const isCousins = function(root, x, y) {

        var indexOf = function(a) {
            for(let i=0; i<root.length; i++){
                if(root[i] === a){
                    return i+1;
                }
            }
        }
        var findParentPair = function(xI, yI){
            let xPar = Math.floor(xI/2);
            let yPar = Math.floor(yI/2);
            if(xPar === yPar){
                return true;
            }
            else if(xPar === 1 || yPar === 1){
                return false;
            }
            else {
                return findParentPair(xPar, yPar);
            }
            
        }
        let xInd = indexOf(x);
            let yInd = indexOf(y);
        if(Math.floor(xInd/2) === Math.floor(yInd/2)){
            return false;
        }
        else{
            return findParentPair(xInd,  yInd);
        }
    
};
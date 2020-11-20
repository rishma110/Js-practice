//polyfill for foreach
Array.prototype.myForEach = function(callbackFn, context){
    for(let i=0; i<this.length; i++){
        callbackFn.call(context, this[i], i, this)
    }
}

//polyfill for map
Array.prototype.myMap = function(callbackFn, context){
    let arr = [];
    for(let i=0; i<this.length; i++){
        arr.push(callbackFn.call(context, this[i], i, this));
    }
    return arr;
}

//polyfill for filter
Array.prototype.myFilter = function(callbackFn, context){
    let arr = [];
    for(let i=0; i<this.length; i++){
        if(callbackFn.call(context, this[i], i, this)){
            arr.push(this[i]);
        }
    }
    return arr;
}

//polyfill for reduce
Array.prototype.myReduce = function(callbackFn, initialVal, context){
    let acc = initialVal;
    for(let i=0; i<this.length; i++){
        if(acc!==undefined){
            acc = callbackFn.call(context, acc, this[i], i, this);
        }
        else {
            acc = this[i];
        }
    }
    return acc;
}

//polyfill for flat array.flat(2)
Array.prototype.myFlat = function(depth){
    return depth ? this.reduce((acc, curr)=>{
        if(Array.isArray(curr)){
            acc.push(myFlat.call(curr, depth-1));
        }
        else{
            acc.push(curr);
        }
        return acc;
    }, []) : this.slice();
}

//polyfill for flat(infinite)
let completeFlat = function(arr){
    let newarr = arr.reduce((acc, curr)=> {
        if(Array.isArray(curr)){
        let flatArr = completeFlat(curr);
           acc.push(...flatArr);
        }
        else{
            acc.push(curr);
        }
        return acc;
    }, []);
    return newarr;
}


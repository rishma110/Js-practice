//polyfill for Object.create
Object.prototype.myCreate = function(proto){
    function F(){}
    F.prototype = proto;
    return new F();
}

//Object.assign
Object.defineProperty(Object, 'assign', {
    value: function assign(...args){
        let to = args[0];
        for(let i=1; i<args.length; i++){
            let nextSource = args[i];
            for(let key in nextSource){
                to[key] = nextSource[key];
            }
        }
        return to;
    },
    writable: true,
    configurable: true,
    enumerable: false
})
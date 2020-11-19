//bind
Function.prototype.mybind = (args) => {
    let obj = this;
    let params = args.slice(1);
    return function (args2) {
        obj.apply(args[0], [...params, ...args2]);
    }
}

let name = {
    fN: 'ris',
    lN: 'D'
}

let PN = () => {
    console.log(this.fN + this.lN);
}

let print = PN.bind(name);
print();
let myPrint = PN.mybind(name);
myPrint(); //args2

const myThrottle = (func, limit) => {
    let flag = true;
    return function() {
        if(flag){
            func();
            flag=false;
        }
        setTimeout(()=>{
flag=true;
        }, limit)
    }
}

//debounce
const debounce = (func, delay) => {
    let timer
    return function() {
      const context = this
      const args = arguments
      clearTimeout(timer)
      timer = setTimeout(() => func.apply(context, args), delay)
    }
  }
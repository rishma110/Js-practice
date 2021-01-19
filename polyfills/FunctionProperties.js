//polyfill for bind
Function.prototype.myBind = function (...args) {
  let fun = this;
  let args1 = args.slice(1);
  return function (...args2) {
    fun.apply(args[0], [...args1, ...args2]);
  };
};

//Throttle and debounce
const throttle = (funct, limit) => {
  let flag = true;
  return function () {
    if (flag) {
      funct();
      flag = false;
    }
    setTimeout(() => {
      flag = true;
    }, limit);
  };
};

const debounce = (funct, limit) => {
  let timer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    setTimeout(() => {
      funct.apply(context, args);
    }, limit);
  };
};

//currying
//implement mul(1)(2)(3)() is 6

function mul(a) {
  return function (b) {
    if (b) {
      return mul(a * b);
    } else {
      return a;
    }
  };
}
//simply
let mul = (a) => (b) => (b ? mul(a * b) : a);
console.log(mul(1)(2)(3)(4)());

//IIFE
(function iife() {
  console.log("Immediately invoked function");
})();

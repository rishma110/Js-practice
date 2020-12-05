//polyfill for Object.create
Object.prototype.myCreate = function (proto) {
  function F() {}
  F.prototype = proto;
  return new F();
};

//Object.assign
Object.defineProperty(Object, "assign", {
  value: function assign(...args) {
    let to = args[0];
    for (let i = 1; i < args.length; i++) {
      let nextSource = args[i];
      for (let key in nextSource) {
        to[key] = nextSource[key];
      }
    }
    return to;
  },
  writable: true,
  configurable: true,
  enumerable: false,
});

const shallowCompare = (object1, object2) => {
  let keys1 = Object.keys(object1);
  let keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) return false;

  for (key in keys1) {
    if (object1[key] !== object2[key]) return false;
  }
  return true;
};

const deepCompare = (object1, object2) => {
  let keys1 = Object.keys(object1);
  let keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) return false;

  for (key in keys1) {
    let areObjects =
      typeof object1[key] === "object" && typeof object2[key] === "object";
    if (areObjects) {
      return deepCompare(object1[key], object2[key]);
    }
    if (!areObjects && object1[key] !== object2[key]) return false;
  }
  return true;
};

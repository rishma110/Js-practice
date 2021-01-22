const circle = {
  pi: 3.14,
  area: (r) => {
    console.log("kk", this); 
    return this.pi * r * r;
  },
};
console.log(circle.area.bind({ pi: 4 }, 5)());
circle.area();//kk window


var b = new person('ashish')
var c = person

function person(name) {
  this.name = name;
}

// console.log(a.name)  => undefined
// console.log(b.name)  => ashish
// console.log(c.name)  => undefined
// console.log(typeof c)  => function
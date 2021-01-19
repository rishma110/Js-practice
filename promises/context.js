const circle = {
  pi: 3.14,
  area: (r) => {
    console.log("kk", this);
    return this.pi * r * r;
  },
};
console.log(circle.area.bind({ pi: 4 }, 5)());
circle.area();

// var a = person('ashish')
// var b = new person('ashish')
// var c = person

// function person(name) {
//   this.name = name;
// }

// console.log(a.name)  => undefined
// console.log(b.name)  => ashish
// console.log(c.name)  => undefined
// console.log(typeof c)  => function

// class SomeEvent {
//   constructor() {
//     this.subscribesList = [];
//   }
//   subscribe(cb) {
//     const index = this.subscribesList.length;
//     this.subscribesList.push(cb);
//     let self = this;
//     return {
//       unsubscribe: function () {
//         self.subscribesList.splice(index, 1);
//       }
//     };
//   }
//   publish(val) {
//     let self = this;
//     this.subscribesList.forEach((callBk)=>{
//       callBk.call(this, val);
//     });
//   }
// }

// // some service.js
// export const eventInstance = new SomeEvent();

// // component A
// const subscriptionA = eventInstance.subscribe(function (val) {
//   console.log("Sub A", val);
// });
// eventInstance.subscribe((val) => {
//   console.log("Sub B", val);
// });

// eventInstance.publish(10);
// // A => coponentWillUnmount
// setTimeout(() => {
//   subscriptionA.unsubscribe();
// }, 1000);

// // component C
// setTimeout(() => {
//   eventInstance.publish(20);
// }, 2000);

function task1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("TASK_1_DONE");
    }, 1000);
  });
}

function task2() {
  return Promise.resolve("TASK_2_DONE");
}

function task3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("TASK_3_DONE");
    }, 2000);
  });
}

function task4() {
  const string = "TASK_4_DONE";
  const letters = string.split();
  let result = "";

  for (let i = 0; i < letters.length; i++) {
    result += letters[i];
  }
  return result;
}

const input = [task1, task2, task4, task3];

function first(input) {
  let arr = input.map((item) => {
    return item();
  });
  return Promise.all(arr);
}

function second(input) {
  let arr = input.map((item) => {
    return item();
  });
  let result = [];
  return new Promise((resolve) => {
    function recur(i) {
      const a = arr[i] instanceof Promise ? arr[i] : Promise.resolve(arr[i]);
      return a.then((res) => {
        if (i === arr.length) {
          resolve(result);
        } else {
          result.push(res);
          return recur(i + 1);
        }
      });
    }

    recur(0);
  });
}

first(input).then(res => console.log(res))
second(input).then((res) => console.log(res));

[
  'TASK_1_DONE',
  'TASK_2_DONE',
  'TASK_4_DONE'
  'TASK_3_DONE',
]

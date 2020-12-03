// The code snippet below is synchronous. It calls callback1 one time and callback2 three times. You must modify this code to make it asynchronous with the following rules:

// callback1 must be called only one time, after 2 seconds.
// callback2 must be called three times with an interval of 1 second.

function job(callback1, callback2) {
  setTimeout(() => {
    callback1();
  }, 2000);
  let count = 0;
  let timer = setInterval(() => {
    count += 1;
    callback2();
    if (count === 3) {
      clearInterval(timer);
    }
  }, 1000);
}

// Let's do a harder exercise. In this code, your function receives a parameter data. You must modify the code below based on the following rules:

// Your function must always return a promise
// If data is not a number, return a promise rejected instantly and give the data "error" (in a string)
// If data is an odd number, return a promise resolved 1 second later and give the data "odd" (in a string)
// If data is an even number, return a promise rejected 2 seconds later and give the data "even" (in a string)

function job(data) {
  return new Promise((resolve, reject) => {
    if (isNaN(data)) {
      reject("error");
    }
    if (data % 2 === 0) {
      setTimeout(() => {
        reject("even");
      }, 2000);
    } else {
      setTimeout(() => {
        resolve("odd");
      }, 1000);
    }
  });
}

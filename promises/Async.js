let task = function (time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(time);
    }, time);
  });
};

const taskList = [42, task(1000), task(500), task(3000)];

//promise.all fifo starting all async in parallel
function myPromise(taskList) {
  let counter = 0;
  let results = [];
  return new Promise((resolve, reject) => {
    taskList.forEach((task) => {
      task = task instanceof Promise ? task : Promise.resolve(task);
      task
        .then((time) => {
          counter++;
          results.push(time);
          if (counter === taskList.length) {
            resolve(results);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

myPromise(taskList).then((data) => console.log(data));
//[42, 500, 1000, 3000]

// starting all async in sequence
function myPromiseSeries(taskList) {
  return new Promise((resolve, reject) => {
    let result = [];

    function recur(i) {
      if (i === taskList.length) {
        resolve(result);
      } else {
        let task =
          taskList[i] instanceof Promise
            ? taskList[i]
            : Promise.resolve(taskList[i]);
        task.then((data) => {
          result.push(data);
          return recur(i + 1);
        });
      }
    }
    return recur(0);
  });
}

myPromiseSeries(mytaskList).then((res) => {
  console.log("result is ", res);
});

//promise.all
function myOtherPromise(taskList) {
  return new Promise((resolve, reject) => {
    let results = [];
    let counter = 0;
    taskList.forEach((task, index) => {
      task = task instanceof Promise ? task : Promise.resolve(task);
      task
        .then((time) => {
          results[index] = time;
          counter++;
          if (counter === taskList.length) {
            resolve(results);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

//Promises execution in series
let task = function (time) {
  return function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(time);
      }, time);
    });
  };
};

const taskList = [task(1000), task(500), task(3000)];

taskList.reduce((accP, currP) => {
  return accP.then(() => {
    return currP().then((result) => {
      console.log(result);
    });
  });
}, Promise.resolve());

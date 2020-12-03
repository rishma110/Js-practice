let task = function (time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(time);
    }, time);
  });
};

const taskList = [42, task(1000), task(500), task(3000)];

//promise.all fifo
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

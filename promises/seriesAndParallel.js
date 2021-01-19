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

const input = [task1, task2, task3, task4];

const first = (input) => {
  let arr = input.map((item) => item());
  return Promise.all(arr);
};

const first = (input) => {
  let result = [];
  return new Promise((resolve, reject) => {
    recur = (i) => {
      if (i === input.length) {
        resolve(result);
      }
      let func = input[i]();
      let p = func instanceof Promise ? func : Promise.resolve(func);
      return p.then((resp) => {
        result.push(resp);
        return recur(i + 1);
      });
    };
    return recur(0);
  });
};

const first = (input) => {
  return new Promise((resolve, reject) => {
    let result = [];
    let counter = 0;
    input.forEach((func, index) => {
      let p = func() instanceof Promise ? func() : Promise.resolve(func());
      return p.then((resp) => {
        counter++;
        result[index] = resp;
        if (counter === input.length) {
          resolve(result);
        }
      });
    });
  });
};

const first = (input) => {
  let result = [];
  return new Promise((resolve, reject) => {
    input.reduce((accP, currP) => {
      return accP.then(() => {
        let p = currP() instanceof Promise ? currP() : Promise.resolve(currP());
        return p.then((res) => {
          result.push(res);
          if (result.length === input.length) {
            resolve(result);
          }
        });
      });
    }, Promise.resolve());
  });
};

const second = (input) => {
  return new Promise((resolve, reject) => {
    let result = [];
    input.forEach((func) => {
      let p = func() instanceof Promise ? func() : Promise.resolve(func());
      p.then((res) => {
        result.push(res);
        if (result.length === input.length) {
          resolve(result);
        }
      });
    });
  });
};

first(input).then((res) => console.log(res));
second(input).then((res) => console.log(res));

/* first ===  [
    'TASK_1_DONE',
    'TASK_2_DONE',
    'TASK_4_DONE'
    'TASK_3_DONE',
  ] */

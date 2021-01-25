class MyPromise {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("Please pass a function the promise constructor");
    }
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    this.observers = [];
    try {
      executor(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }

  get state() {
    return "PENDING";
  }

  get value() {
    return null;
  }

  get settled() {
    return false;
  }

  resolve(value) {
    if (this.settled) return;
    Object.defineProperty(this, "settled", {
      value: true,
    });

    Object.defineProperty(this, "state", {
      value: "FULLFILLED",
    });
    Object.defineProperty(this, "value", {
      value: value,
    });
  }

  reject(reason) {
    if (this.settled) return;
    Object.defineProperty(this, "settled", {
      value: true,
    });
    Object.defineProperty(this, "state", {
      value: "REJECTED",
    });
    Object.defineProperty(this, "value", {
      value: reason,
    });
  }

  then(onFullFilled) {
    if (this.state === "FULLFILLED" && !this.called) {
      onFullFilled(this.value);
      this.called = false;
    }
    return this;
  }

  catch(onReject) {
    if (this.state !== "REJECTED") return;
    if (!this.called) {
      onReject(this.value);
      this.called = false;
    }
  }

  static resolve(value) {
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }

  static reject(reason) {
    return new MyPromise((reject) => {
      reject(reason);
    });
  }

  static all(iterable) {
    let res = [];
    let counter = 0;
    return new MyPromise((resolve, reject) => {
      iterable.forEach((val, index) => {
        let p = val instanceof MyPromise ? val : MyPromise.resolve(val);

        p.then((result) => {
          res[index] = result;
          counter++;
          if (counter === iterable.length) {
            resolve(res);
          }
        }).catch((err) => {
          reject(err);
        });
      });
    });
  }

  static race(iterable) {
    return new MyPromise((resolve, reject) => {
      iterable.forEach((val, index) => {
        let p = val instanceof MyPromise ? val : MyPromise.resolve(val);
        p.then((result) => {
          resolve(result);
        }).catch((err) => {
          reject(err);
        });
      });
    });
  }
}

const myPromise = new MyPromise((resolve, reject) => {
  reject("hello");
})
  .then((result) => {
    console.log("first", result);
  })
  .catch((err) => {
    console.log("error : " + err);
  });

let p = MyPromise.resolve("happy");
p.then((val) => {
  console.log("I am " + val);
});

const promise1 = MyPromise.resolve(3);
const promise2 = 42;
const promise3 = new MyPromise((resolve, reject) => {
  resolve(100);
});

MyPromise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});

MyPromise.race([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});

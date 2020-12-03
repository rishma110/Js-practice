class myPromise {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("Promise will take a function in the constructor");
    }
    this.observers = [];
    Object.defineProperty(this, "setlled", { value: false });
    Object.defineProperty(this, "state", { value: "PENDING" });
    Object.defineProperty(this, "value", { value: null });
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  thenable = (subject) => {
    return subject && typeof subject.then === "function";
  };
  resolve = (value) => {
    if (this.settled) return;
    Object.defineProperty(this, "setlled", { value: true });
    let isThenable = thenable(value);
    if (isThenable && value.state === "PENDING") {
      let { internalOnFulfill, onInternalReject } = this.observers.shift();
      value.then(
        (v) => {
          internalOnFulfill(v);
        },
        (r) => {
          onInternalReject(r);
        }
      );
      // value.then((v)=>resolve(v), (r)=>reject(r))
    } else {
      value = isThenable ? value.value : value;
      Object.defineProperty(this, "value", { value: value });
      state = isThenable ? value.state : "FULFILLED";
      Object.defineProperty(this, "state", { value: state });
    }
  };
  reject = (reason) => {
    if (this.settled) return;
    Object.defineProperty(this, "setlled", { value: true });
    Object.defineProperty(this, "state", { value: "REJECTED" });
    Object.defineProperty(this, "value", { value: reason });
  };
  then(onFulFilled, onRejected) {
    return new this.constructor((resolve, reject) => {
      const internalOnFulfill = (value) => {
        resolve(onFulFilled(value));
      };
      const onInternalReject = (reason) => {
        resolve(onRejected(reason));
      };
      this.observers.push({
        onfulfill: internalOnFulfill,
        onreject: onInternalReject,
      });
    });
  }

  static resolve(value) {
    return new myPromise((resolve) => {
      resolve(value);
    });
  }

  static reject(reason) {
    return new myPromise((_, reject) => {
      reject(reason);
    });
  }

  static all(iterables) {
    const results = [];
    let promiseCount = 0;
    return new myPromise((resolve, reject) => {
      iterables
        .forEach((prom, index) => {
          result[index] = prom;
          promiseCount++;
          if (promiseCount === iterables.length) {
            resolve(results);
          }
        })
        .catch((err) => reject(err));
    });
  }
}

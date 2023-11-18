class MyPromiseHard {
  constructor(executorFn) {
    if (typeof executorFn !== "function") {
      throw new Error("pass function in constructor of MyPromiseHard");
    }
    this.state = "PENDING";
    this.value = null;
    this.successCallbacks = [];
    this.failureCallbacks = [];
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    executorFn(this.resolve, this.reject);
  }
  runCallbacks() {
    if (this.state === "FULFILLED") {
      this.successCallbacks.forEach((callback) => {
        callback(this.value);
      });
      this.successCallbacks = [];
    }
    if (this.state === "REJECTED") {
      this.failureCallbacks.forEach((callback) => {
        callback(this.value);
      });
    }
  }
  resolve(successVal) {
    queueMicrotask(() => {
      if (this.state !== "PENDING") return;
      if (
        successVal instanceof MyPromiseHard ||
        successVal instanceof Promise
      ) {
        successVal.then(this.resolve, this.reject);
        return;
      }
      this.value = successVal;
      this.state = "FULFILLED";
      this.runCallbacks();
    });
  }
  reject(err) {
    queueMicrotask(() => {
      if (this.state !== "PENDING") return;
      if (err instanceof MyPromiseHard || err instanceof Promise) {
        err.then(this.resolve, this.reject);
        return;
      }
      this.value = err;
      this.state = "REJECTED";
      this.runCallbacks();
    });
  }
  then(onFulfilled, onRejected) {
    return new MyPromiseHard((resolve, reject) => {
      this.successCallbacks.push((result) => {
        if (onFulfilled === undefined) {
          resolve(result);
          return;
        }
        try {
          resolve(onFulfilled(result));
        } catch (err) {
          reject(err);
        }
      });

      this.failureCallbacks.push((result) => {
        if (onRejected === undefined) {
          reject(result);
          return;
        }
        try {
          resolve(onRejected(result));
        } catch (err) {
          reject(err);
        }
      });
      this.runCallbacks();
    });
  }
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
}

//this.subscribers= {event1: [], event2:[]};
class createMiddlewares {
  constructor() {
    this.subscribers = [];
  }
  attach(eventName, cbFn) {
    if (eventName in this.subscribers) {
      this.subscribers[eventName].push(cbFn);
    } else {
      this.subscribers[eventName] = [cbFn];
    }
  }

  publish(eventName, data) {
    if (eventName in this.subscribers) {
      let callBackFunctions = this.subscribers[eventName];
      let i = 0;
      let self = this;

      function recur(i) {
        if (i === callBackFunctions.length) {
          return;
        }
        return callBackFunctions[i].call(self, data, recur.bind(self, i + 1));
      }

      recur(i);
    }
  }
}

let middlewares = new createMiddlewares();

middlewares.attach("event1", (data, next) => {
  setTimeout(() => {
    console.log(data, 1);
    next();
  });
});

middlewares.attach("event2", (data, next) => {
  console.log(data, 2);
});

middlewares.attach("event1", (data, next) => {
  console.log(data, 3);
  next();
});

middlewares.attach("event1", (data, next) => {
  console.log(data, 4);
});

middlewares.publish("event1", 4);
middlewares.publish("event2", 10);

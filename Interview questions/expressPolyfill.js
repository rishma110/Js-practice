//this.subscribers= {event1: [], event2:[]};
class CreateMiddlewares {
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

      const recur = (i) => {
        if (i === callBackFunctions.length) {
          return;
        }
        return callBackFunctions[i].call(this, data, recur.bind(this, i + 1));
      };

      recur(0);
    }
  }
}

let middlewares = new CreateMiddlewares();

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

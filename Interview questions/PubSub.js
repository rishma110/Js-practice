class Publisher {
  constructor() {
    this.subscribers = {
      clicked: [],
      update: [],
    };
    this.eventMap = {
      clicked: (payload) => {
        console.log("I am clicked" + payload);
      },
      update: (payload) => {
        console.log("I am update" + payload);
      },
    };
  }
  subscribe(event) {
    this.subscribers[event].push(this.eventMap[event]);
  }
  unsubscribe(event) {
    let objIndex = this.subscribers[event].indexOf(this.eventMap[event]);
    this.subscribe.splice(objIndex, 1);
  }
  publish(event, payload) {
    let self = this;
    this.subscribers[event].forEach((callBack) => {
      callBack.call(self, payload);
    });
  }
}

const sub1 = new Publisher();
sub1.subscribe("clicked");
sub1.publish("clicked", "hi ");

/*===========================Another way============================== */
class Publisher {
  constructor() {
    this.subscribers = {};
    this.uniqueIds = {};
    this.counter = 0;
  }

  publish(event, data) {
    this.subscribers[event].forEach((id) => {
      this.uniqueIds[id](data);
    });
  }

  subscribe(event, callback) {
    let id = this.counter++;
    this.uniqueIds[id] = callback;
    if (event in this.subscribers) {
      this.subscribers[event].push(id);
    } else {
      this.subscribers[event] = [id];
    }
    return id;
  }

  unsubscribe(id) {
    delete this.uniqueIds[id];
    let index = this.subscribers[event].indexOf(id);
    if (index > -1) {
      this.subscribers[event].splice(index, 1);
    }
  }
}

const sub1 = new Publisher();
sub1.subscribe("clicked", function (data) {
  console.log(data + "Rish");
});
sub1.publish("clicked", "hi ");

/*===========================Yet Another way=====================*/

class SomeEvent {
  constructor() {
    this.subscribesList = [];
  }
  subscribe(cb) {
    const index = this.subscribesList.length;
    this.subscribesList.push(cb);
    let self = this;
    return {
      unsubscribe: () => {
        this.subscribesList.splice(index, 1);
      },
    };
  }
  publish(val) {
    this.subscribesList.forEach((callBk) => {
      callBk(val);
    });
  }
}

// some service.js
const eventInstance = new SomeEvent();

// component A
const subscriptionA = eventInstance.subscribe(function (val) {
  console.log("Sub A", val);
});
eventInstance.subscribe((val) => {
  console.log("Sub B", val);
});

eventInstance.publish(10);
// A => coponentWillUnmount
setTimeout(() => {
  subscriptionA.unsubscribe();
}, 1000);

// component C
setTimeout(() => {
  eventInstance.publish(20);
}, 2000);

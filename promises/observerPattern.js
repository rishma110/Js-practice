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

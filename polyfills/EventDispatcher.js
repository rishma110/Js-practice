class EventDispatcher {
  constructor() {
    this.listeners = {};
  }

  addEventListener(eventName, callBackFunction) {
    if (eventName in this.listeners) {
      this.listeners[eventname].push(callBackFunction);
    } else {
      this.listeners[eventname] = [callBackFunction];
    }
  }

  removeEventListener(eventName, listnerFn) {
    let index = this.listeners[eventName].indexOf(listnerFn);
    if (index > -1) {
      this.listeners[eventName].splice(index, 1);
    }
  }

  dispatch(event) {
    //to avoid race conditions keep a copy of the listners
    let newEventListners = this.listeners[event.type];
    newEventListners.forEach((fn) => {
      fn.call(this, event);
    });
  }
}

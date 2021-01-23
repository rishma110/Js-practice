//Design a data structure to store key value pairs.
//It should support get(key), put(key,val), delete(key) and getRandom().
//All of them in constant time

class RandomizedSet {
  constructor() {
    this.map = {};
    this.arr = [];
  }
  put = (key, value) => {
    if (key in this.map) {
      return false;
    } else {
      this.map[key] = {
        value,
        index: this.arr.length,
      };
      this.arr.push(key);
      return true;
    }
  };

  get = (key) => {
    if (key in this.map) {
      return this.map[key];
    } else {
      return null;
    }
  };

  delete = (key) => {
    if (key in this.map) {
      let index = this.map[key].index;
      let temp = this.arr[index];
      let last = arr.length - 1;
      let lastIndex = this.map[this.arr[last]].index;
      let lastValue = this.map[this.arr[last]].value;
      this.map[this.arr[last]] = { index: lastIndex, value: lastValue };
      this.arr[index] = this.arr[last];
      this.arr[last] = temp;

      delete this.map[key];
      this.arr.pop();
      return true;
    } else {
      return false;
    }
  };

  getRandom = () => {
    const randomIndex = Math.floor(Math.random() * this.arr.length);
    return this.arr[randomIndex];
  };
}

//implementing LRU

class LRU {
  constructor(capacity) {
    this.capacity = capacity;
    this.leastUsed = [];
    this.cache = {};
  }

  get = (key) => {
    if (key in this.cache) {
      let index = this.leastUsed.indexOf(key);
      this.leastUsed.splice(index, 1);
      this.leastUsed.push(index);
      return this.cache[key];
    } else {
      return -1;
    }
  };

  put = (key, value) => {
    if (key in this.cache) {
      let index = this.leastUsed.indexOf(key);
      this.leastUsed.splice(index, 1);
    } else {
      if (this.leastUsed.length >= this.capacity) {
        let evictedKey = this.leastUsed.shift();
        delete this.cache[evictedKey];
      }
    }
    this.cache[key] = value;
    this.leastUsed.push(index);
  };
}

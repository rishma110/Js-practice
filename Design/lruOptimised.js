//this.head points to the most recently used while this.tail points to the least recently used
class Node {
  constructor(key, value, next = null, prev = null) {
    this.key = key;
    this.value = value;
    this.next = next;
    thie.prev = prev;
  }
}
class LRU {
  constructor(capacity) {
    this.size = 0;
    this.capacity = capacity;
    this.cache = {};
    this.head = null;
    this.tail = null;
  }
  write = (key, value) => {
    this.ensureLimit();
    let node = new Node(key, value, null, null);
    if (key in cache) {
      this.remove(key);
    }
    if (this.head === null) {
      this.head = this.tail = node;
    } else {
      let curr = this.head;
      node.next = curr;
      curr.prev = node;
      this.head = node;
    }
    this.size++;
    this.cache[key] = this.head;
  };

  read = (key) => {
    if (key in this.cache) {
      let val = this.cache[key].value;
      this.remove(key);
      this.write(key, val);
      return val;
    } else {
      return;
    }
  };
  remove = (key) => {
    let node = this.cache[key];
    if (node === this.head) {
      node.next.prev = null;
      this.head = node.next;
    } else if (node === this.tail) {
      node.prev.next = null;
      this.tail = node.prev;
    } else {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }
    delete this.cache[key];
    this.size--;
  };
  ensureLimit = () => {
    if (this.capacity === this.size) {
      this.remove(this.tail.key);
    }
  };
}

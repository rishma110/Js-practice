class Node {
  constructor(word) {
    this.key = word;
    this.children = null;
    this.isFullWord = false;
  }
}
class Trie {
  constructor() {
    if (Trie.exists) {
      return Trie.instance;
    }
    this.root = new Node("");
    Trie.exists = true;
    Trie.instance = this;
    return this;
  }

  insert = (word) => {
    let currNode = this.root;
    let letter = word.slice(0, 1);
    word = word.slice(1);
    let child;

    while (letter.length > 0) {
      if (currNode.children[letter] === null) {
        child = new Node(letter);
        currNode.children[letter] = child;
      } else {
        child = currNode.children[letter];
      }
      currNode = child;
      letter = word.slice(0, 1);
      word = word.slice(1);
    }
    child.isFullWord = true;
  };

  search = (word) => {
    let currNode = this.root;
    let letter = word.slice(0, 1);
    word = word.slice(1);

    while (letter.length > 0) {
      if (letter in currNode.children) {
        currNode = currNode.children[letter];
        if (word.length === 0) {
          return currNode.isFullWord || false;
        }
        letter = word.slice(0, 1);
        word = word.slice(1);
      } else {
        return false;
      }
    }
    return true;
  };

  startsWith = (word) => {
    let currNode = this.root;
    let letter = word.slice(0, 1);
    word = word.slice(1);

    while (letter.length > 0) {
      if (letter in currNode.children) {
        currNode = currNode.children[letter];
        letter = word.slice(0, 1);
        word = word.slice(1);
      } else {
        return false;
      }
    }
    return true;
  };
}

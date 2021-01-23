class Game {
  constructor() {
    this.board = new Board();
    this.dice = new Dice();
    this.playersQ = [];
    this.winnerCount = 0;
    this.result = [];
  }

  join(playerId) {
    this.playersQ.push(new Player(playerId));
  }

  declare() {
    let str = "";
    for (let i = 0; i < this.result.length; i++) {
      str += `${this.result[i].name} won ${i} place`;
    }

    return str;
  }

  play() {
    let i = 0;
    while (this.winnerCount !== 1) {
      let nextPos = this.board.move(
        this.playersQ[i].getPosition,
        this.dice.roll()
      );
      this.playersQ[i].setPosition = nextPos;
      if (nextPos === 100) {
        this.result.push(this.playersQ[i]);
        this.playersQ.splice(i, 1);
      }
      if (i >= this.playersQ.length) {
        i = 0;
      } else {
        i++;
      }
    }
    //declarewinner
    let str = declare();
    console.log(str);
  }

  start() {
    if (this.players.length >= 4) {
      this.board.create();
      this.play();
    }
  }
}

class Dice {
  constructor() {}
  roll() {
    return Math.floor(Math.random() * 6) + 1;
  }
}

class Board {
  constructor() {
    this.ladderMap = [];
    this.snakeMap = [];
  }
  create() {
    //make an api call to get laddermap and snake map
    fetch("getSnakeLadderMap").then((data) => {
      this.snakeMap = data.snakeMap;
      this.ladderMap = data.ladderMap;
    });
  }
  move(pos, by) {
    let newPos = pos + by;
    while (this.snakeMap[newPos] !== null || this.ladderMap[newPos] !== null) {
      if (newPos in this.snakeMap) {
        newPos = this.snakeMap[newPos];
      }
    }
    return newPos;
  }
}

class Players {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.currPos = 0;
  }
  get getPosition() {
    return this.currPos;
  }
  set setPosition(pos) {
    this.currPos = pos;
  }
}

//on click

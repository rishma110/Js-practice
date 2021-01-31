class Player {
  constructor(isWhiteSide) {
    this.isWhiteSide = isWhiteSide;
    this.currTurn = this.isWhiteSide;
  }
}

// new Game(new Player(true), new Player(false))
class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.currentTurn = this.player1.currTurn ? this.player1 : this.player2;
    this.board = new Board();
    this.initializeGame();
  }

  initializeGame() {
    this.board.reset();
  }

  makeMove(start, end, player) {
    if (player !== this.currentTurn) {
      return false;
    }
    let sourcePiece = this.board.squares[start.x][start.y].piece;
    if (sourcePiece === null) {
      return false;
    }
    if (sourcePiece.isWhitePiece !== player.isWhiteSide) {
      return false;
    }
    if (!sourcePiece.canMove(start, end)) {
      return false;
    }

    let destPiece = this.board.squares[end.x][end.y].piece;
    if (destPiece !== null) {
      this.board.squares[end.x][end.y].piece = null;
    }

    if (destPiece === "king") {
      //game won by this.currenTurn
    }

    //switch turns
    if (this.currentTurn === this.player1) {
      this.currentTurn = this.player2;
    } else {
      this.currentTurn = this.player1;
    }
    return true;
  }
}

class Board {
  constructor() {
    this.squares = [];
  }

  reset() {
    //white pieces
    this.squares[0][0] = new Spot(0, 0, new Piece("Rook", true));
    this.squares[0][1] = new Spot(1, 0, new Piece("Knight", true));
    this.squares[0][2] = new Spot(2, 0, new Piece("Bishop", true));
    this.squares[0][3] = new Spot(3, 0, new Piece("Queen", true));
    this.squares[0][4] = new Spot(4, 0, new Piece("King", true));
    this.squares[0][5] = new Spot(5, 0, new Piece("Bishop", true));
    this.squares[0][6] = new Spot(6, 0, new Piece("Knight", true));
    this.squares[0][7] = new Spot(7, 0, new Piece("Rook", true));
    //also populate white pawns

    //black pieces
    this.squares[7][0] = new Spot(7, 0, new Piece("Rook", false));
    this.squares[7][1] = new Spot(7, 1, new Piece("Knight", false));
    this.squares[7][2] = new Spot(7, 2, new Piece("Bishop", false));
    this.squares[7][3] = new Spot(7, 3, new Piece("Queen", false));
    this.squares[7][4] = new Spot(7, 4, new Piece("King", false));
    this.squares[7][5] = new Spot(7, 5, new Piece("Bishop", false));
    this.squares[7][6] = new Spot(7, 6, new Piece("Knight", false));
    this.squares[7][7] = new Spot(7, 7, new Piece("Rook", false));
    //also populate black pawns

    for (i = 0; i < 8; i++) {
      for (j = 0; j < 8; j++) {
        if (!this.squares[i][j]) {
          this.squares[i][j] = new Spot(0, 0, null);
        }
      }
    }
  }
}

class Spot {
  constructor(x, y, piece) {
    this.x = x;
    this.y = y;
    this.piece = piece;
  }
  get x() {
    return this.x;
  }
  get y() {
    return this.y;
  }
  get piece() {
    return this.piece;
  }
  set x(xval) {
    this.x = xval;
  }
  set y(yval) {
    this.y = yval;
  }
  set piece(pieceV) {
    this.piece = pieceV;
  }
}

class Piece {
  constructor(pieceType, isWhitePiece) {
    this.pieceType = pieceType;
    this.isWhitePiece = isWhitePiece;
  }

  get pieceType() {
    return this.pieceType;
  }
  get isWhitePiece() {
    return this.isWhitePiece;
  }
  set pieceType(pt) {
    this.pieceType = pt;
  }
  set isWhitePiece(isW) {
    this.isWhitePiece = isW;
  }

  canMove(start, end) {
    //check for boundary conditions
    switch (this.pieceType) {
      case "Rook":
        return end.x === start.x || end.y === start.y;
      case "Knight":
        return Math.abs((end.x - start.x) * (end.y - start.y)) === 2;
      case "Bishop":
        return Math.abs(start.x - end.x) === Math.abs(start.y - end.y);
      case "Queen":
        return (
          end.x === start.x ||
          end.y === start.y ||
          Math.abs(start.x - end.x) === Math.abs(start.y - end.y)
        );
      case "King":
        return Math.abs(start.x - end.x) <= 1 && Math.abs(start.y - end.y) <= 1;
      case "Pawn":
        if (this.isWhitePiece) {
          return end.x === start.x + 1;
        } else {
          return end.x === start.x - 1;
        }
    }
  }
}

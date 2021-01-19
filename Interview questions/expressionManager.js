/**
 * "+-/*^"
 * equation example : x^y+z+c
 * EquationManager:
 * * createEquation(...args): eqId
 * * editEquation(eqId, ...args): true
 * * deleteEquation(eqId): true
 * * mergeEquations(eqId1, eqId2, operator): eqId3
 * mergeEquations(eqId1, eqId3, operator): eqId4
 * * solveEquation(eqId3, {x:value1, z: value2}): number
 **/

// createEquation(['x', "^", 'y']);
// createEquation('x^y*5+2');

class EquationManager {
  constructor() {
    if (EquationManager.exists) {
      return EquationManager.instance;
    }
    EquationManager.instance = this;
    EquationManager.exists = true;
    if (!this.equations) {
      this.equations = {};
    }
    return this;
  }

  createEquation = (...args) => {
    let eqid = Date.now() + Math.random() * 100;
    this.equations[eqid] = {
      val: args.join(""),
      left: null,
      right: null,
      operand: null,
    };
    return eqid;
  };

  deleteEquation = (eqId) => {
    if (eqId in this.equations) {
      delete this.equations[eqId];
    }
  };

  editEquation = (eqId, ...args) => {
    if (eqId in this.equations) {
      this.equations[eqId] = {
        val: args.join(""),
        left: null,
        right: null,
        operand: null,
      };
      return true;
    }
    return false;
  };

  mergeEquations = (eqId1, eqId2, operator) => {
    let eqId3 = Date.now() + Math.random() * 100;

    this.equations[eqId3] = {
      left: eqId1,
      right: eqId2,
      operand: operator,
      val: null,
    };
    return eqId3;
  };

  getExpr = (eqId) => {
    let equationObj = this.equations[eqId];
    if (equationObj.val) {
      return equationObj.val;
    } else {
      return (
        this.getExpr(equationObj.left) +
        equationObj.operand +
        this.getExpr(equationObj.right)
      );
    }
  };

  solveEquation = (eqId, obj) => {
    let equation = this.getExpr(eqId);
    for (let key in obj) {
      let regex = new RegExp(key, "g");
      equation = equation.replace(regex, obj[key]);
    }
    return eval(equation);
  };
}

let eqManager = new EquationManager();
let e1 = eqManager.createEquation("a", "*", "b");
let e2 = eqManager.createEquation("a", "/", "b");
let e3 = eqManager.createEquation("a", "-", "b");
let e4 = eqManager.createEquation("a", "/", "2");
let e5 = eqManager.mergeEquations(e1, e2, "+");
let e6 = eqManager.mergeEquations(e5, e4, "+");
let e7 = eqManager.editEquation(e2, "a", "+", "b");

let sol = eqManager.solveEquation(e6, { a: 6, b: 4 });
console.log(sol);

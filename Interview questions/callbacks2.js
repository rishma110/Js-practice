/*// example function


fn = less(sum);

fn1 = fn(1);					fn(1, 2)

fn3 = fn1(2)						fn1(3) // 6

fn3(3) // 6*/

function sum(a, b, c) {
  console.log(a + b + c);
  return a + b + c;
}

function less(sumFn) {
  let self = this;
  let args = [];
  let recur = function (...args1) {
    args = [...args, ...args1];
    if (args.length === sumFn.length) {
      sumFn.apply(self, args);
    } else {
      return recur;
    }
  };
  return recur;
}

fn = less(sum);
fn1 = fn(1);
fn3 = fn1(2);
fn3(3);

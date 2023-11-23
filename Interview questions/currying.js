// https://javascript.info/currying-partials

function log(date, importance, message) {
  console.log(
    `[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`
  );
}

function curry(log) {
  return function curried(...args) {
    if (args.length >= log.length) {
      return log.apply(this, args);
    } else {
      return function (...argsAgain) {
        return curried.apply(this, args.concat(argsAgain));
      };
    }
  };
}
const curriedLog = curry(log);
// log(new Date(), "DEBUG", "some debug");
curriedLog(new Date())("DEBUG")("some debug");
// logNow will be the partial of log with fixed first argument
const logNow = curriedLog(new Date());

// use it
logNow("INFO", "message"); // [HH:mm] INFO message
const debugNow = logNow("DEBUG");

debugNow("message"); // [HH:mm] DEBUG message

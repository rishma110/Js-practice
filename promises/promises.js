// function composition - math operation, operation on functions.
// compose(a, b, c, d)(payload) = a(b(c(d(payload))))

const addTen = (n) => n + 10;
const square = (n) => n * n;

const squareAndAddTen = compose(addTen, square);

squareAndAddTen(10); // 110

// implement a version of compose (composeFetch), that works with rest endpoints.
// i.   Instead of accepting functions, it accepts a list of strings each represting a URL which listens to HTTP POST requests.
// ii.  Instead of invoking functions, it makes HTTP POST requests with the respective payload in it's request body.
// iii. The return value of the function returned by composeFetch is always going to be a promise that resolves to the correct value.

// makeRequest(url, payload) -> post request -> return promise which resolves to serialized response

const squareAndAddTen = composeFetch(
  "http://abc.com/addTen",
  "http://abc.com/square"
);

squareAndAddTen(10).then((response) => {
  console.log(response); // 110
});

let composeFetch = (...args) => (payload) => {
  let i = args.length - 1;
  recur = (url, payload) => {
    return makeRequest(args[i], payload).then((newpayload) => {
      i--;
      return recur(args[i], newpayload);
    });
  };
  return recur(args[i], payload);
};

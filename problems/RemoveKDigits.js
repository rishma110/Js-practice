// Given a non-negative integer num represented as a string, remove k digits from the number so that the new number is the smallest possible.

// Note:
// The length of num is less than 10002 and will be ≥ k.
// The given num does not contain any leading zero.
// Example 1:

// Input: num = "1432219", k = 3
// Output: "1219"
// Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.
// Example 2:

// Input: num = "10200", k = 1
// Output: "200"
// Explanation: Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.
// Example 3:

// Input: num = "10", k = 2
// Output: "0"
// Explanation: Remove all the digits from the number and it is left with nothing which is 0.

/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
export const removeKdigits = function (num, k) {
  let numsArray = num.split("");
  let n = numsArray.length;
  let iter = n - k;
  let output = [];
  var findMin = function (numsArray, start, end) {
    if (start === end) {
      return {
        min: numsArray[start],
        minIndex: start,
      };
    }
    let min = numsArray[start];
    let minIndex = start;
    for (let i = start; i <= end; i++) {
      if (numsArray[i] < min) {
        minIndex = i;
        min = numsArray[i];
      }
    }
    return { min, minIndex };
  };
  let start = 0;
  let end = k;
  if (n === k) {
    return "0";
  }

  while (iter > 0) {
    let min = findMin(numsArray, start, end).min;
    let minIndex = findMin(numsArray, start, end).minIndex;
    if (min !== "0" || output.length !== 0) {
      output.push(min);
    }
    iter--;
    k = k - (minIndex - start);
    start = minIndex + 1;
    end = start + k;
  }
  if (output.length === 0) {
    output.push("0");
  }
  return output.join("");
};

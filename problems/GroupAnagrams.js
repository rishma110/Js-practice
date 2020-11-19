// Given an array of strings, group anagrams together.

// Example:

// Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
// Output:
// [
//   ["ate","eat","tea"],
//   ["nat","tan"],
//   ["bat"]
// ]
// Note:

// All inputs will be in lowercase.
// The order of your output does not matter.

var groupAnagrams = function(strs) {
    let grpdAnag = [];
    let dict={};
    for (let i=0; i< strs.length; i++) {
        let elem = strs[i].split('').sort();
        if(elem in dict) {
           dict[elem] = dict[elem] + ',' +  strs[i];
        }
        else {
            dict[elem] = strs[i];
        }
    }
    
    let anaKeys = Object.keys(dict);
    anaKeys.forEach((key) => {
        grpdAnag.push(dict[key].split(','))
    });
  return grpdAnag;
    
};
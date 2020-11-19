// Given a string, find the first non-repeating character in it and return it's index. If it doesn't exist, return -1.

// Examples:

// s = "leetcode"
// return 0.

// s = "loveleetcode",
// return 2.
// Note: You may assume the string contain only lowercase letters.


/**
 * @param {string} s
 * @return {number}
 */
export const firstUniqChar = function(s) {
    // let dict = {};
    // for (let i=0; i<s.length; i++) {
    //     if(s[i] in dict){
    //         dict[s[i]] = dict[s[i]] + 1;
    //     }
    //     else {
    //         dict[s[i]] = 1;
    //     }
    // }

    // for(let i=0; i<s.length; i++){
    //     if(dict[s[i]]===1){
    //         return i;
    //     }
    // }
    // return -1;

    let dict = new Map();
    for (let i=0; i<s.length; i++) {
        if(dict.has(s[i])){
            dict.set(s[i], -1);
        }
        else {
            dict.set(s[i], i);
        }
    }
    
    let keys = dict.keys();

    for(let i=0; i<dict.size; i++){
         let key = keys.next().value;
        if(dict.get(key) > -1){
            return dict.get(key);
        }
    }
    return -1;
};
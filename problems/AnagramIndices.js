// Given a string s and a non-empty string p, find all the start indices of p's anagrams in s.

// Strings consists of lowercase English letters only and the length of both strings s and p will not be larger than 20,100.

// The order of output does not matter.

// Example 1:

// Input:
// s: "cbaebabacd" p: "abc"

// Output:
// [0, 6]

// Explanation:
// The substring with start index = 0 is "cba", which is an anagram of "abc".
// The substring with start index = 6 is "bac", which is an anagram of "abc".
// Example 2:

// Input:
// s: "abab" p: "ab"

// Output:
// [0, 1, 2]

// Explanation:
// The substring with start index = 0 is "ab", which is an anagram of "ab".
// The substring with start index = 1 is "ba", which is an anagram of "ab".
// The substring with start index = 2 is "ab", which is an anagram of "ab".

export const findAnagrams = function(s, p) {
    let dict = {};
    let output = [];
    for(let i=0; i<s.length - p.length; i++){
        let j =i;
        while(j < i + p.length){
            if(s[j] in dict){
                dict[s[j]]++
            }
            else {
                dict[s[j]] = 1;
            }
            j++;
        }
        for (let i=0; i<p.length; i++){
            if(p[i] in dict) {
                dict[p[i]]--;
            }
        }
        let keys = Object.keys(dict); let foundAnagram = true;
        for(let i=0; i<keys.length; i++){
            if(dict[keys[i]]!==0){
                dict[keys[i]]--;
                foundAnagram = false;
            }
        }
        if(foundAnagram){
            console.log('i', i);
            output.push(i);
        }
        dict[s[i]] > 0 ? dict[s[i]]-- : delete dict[s[i]];
    }
    return output;
    
};
// Given a non-empty array of integers, every element appears twice except for one. Find that single one.
// Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

// Input: [4,1,2,1,2]
// Output: 4

// Input: [2,2,1]
// Output: 1

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let init = nums[0];
    for (let i=1; i< nums.length; i++) {
        init = init ^ nums[i];
    }
    return init
};
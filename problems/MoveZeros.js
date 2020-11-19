// Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.
// Input: [0,1,0,3,12]
// Output: [1,3,12,0,0]

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) { 
    let i = -1; // pointer to the left most zero
    for(let j=0; j< nums.length; j++){
        if(nums[i]!==0){
            i++;
        }
        else {
            if(nums[j]!==0) {
                let temp = nums[i];
                nums[i] = nums[j];
                nums[j] = temp;
            i++;
            } 
        }
        
    }
    
};
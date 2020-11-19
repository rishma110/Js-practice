/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
export const subarraySum = function(nums, k) {
    let count = 0;
    let dict = {};
    let sum = 0
    for(let i =0; i<nums.length; i++){
        sum = sum + nums[i];
        if(sum === k){
            count ++;
        }
        if(sum-k in dict) {
            count = count + dict[sum-k];
        }
        if(sum in dict){
             dict[sum] = dict[sum] + 1 ;
        }
        else {
            dict[sum]=1;
        }  
        
    }
    console.log('count', count);
    return count;
};
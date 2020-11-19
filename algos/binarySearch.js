// given a sorted array find index of an element k in it in O(logN)

const search = (arr, low, high, k) => {
    const length = high + low;
    const index = length % 2 === 0 ? length/2 : (length -1 )/2;
        if (arr[index] === k){
            console.log('index of k is', index);
            return index;
        }
        else if(arr[index] < k) {
            search(arr, index + 1, high, k);
        }
        else if(arr[index] > k){
            search(arr, low, index -1, k);
        }
        else {
            return -1;
        }
}


export const binSearch = (arr, k) => {
    search(arr, 0, arr.length-1, k);
}
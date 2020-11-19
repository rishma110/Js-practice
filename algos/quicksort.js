// input a[], eg: [7,10,4,3,20,15]



// initially call quicksort with low=0 and high=arr.length-1

const partition = (arr, low, high) => {
    let i = low-1;
    const pivot = arr[high];
    let swapVariable;
    // j to traverse only till before the pivot
    for (let j=low; j<=high-1; j++) {
        if(arr[j] < pivot) {
            i++;
            // swap arr[i] and arr[j]
            swapVariable = arr[j];
            arr[j] = arr[i];
            arr[i] = swapVariable;
        }
    }
    // swap i+1 with pivot
    swapVariable = arr[i+1];
    arr[i+1] = arr[high];
    arr[high] = swapVariable
    return i+1;
}

const quickSort = (arr, low, high) => {
    if(low < high) {
        let pi = partition(arr, low, high);
        quickSort(arr, low, pi-1);
        quickSort(arr, pi+1, high);
    } 
}

export const quick_sort = (arr) => {
    quickSort(arr, 0, arr.length - 1);
    console.log(arr);
}



const merge = (arr, l, m, r) => {
    const n1 = m - l + 1;
    const n2 = r - m;
    // create two empty arrays for left and right;
    let L = new Array(n1);
    let R = new Array(n2);
    for(let i=0; i<n1; i++){
        L[i] = arr[i+l];
    }
    for (let j=0; j<n2; j++){
        R[j] = arr[m+1+j];
    }
    console.log(L, '---', R);
    let i =0; let j =0; let k=l;
    while(i<n1 && j<n2){
        if(L[i] <= R[j]){
            arr[k]=L[i];
            i++;
        }
        else{
            arr[k]=R[j];
            j++
        }
        k++;
    }

    while (i< n1){
        arr[k]=L[i];
        i++;
        k++  
    }

    while (j< n2){
        arr[k]=R[j];
        j++;
        k++  
    }
    console.log('arr', arr);

}

const partition  = (arr, l, r) => {
    if(l<r) {
    const length = l + r;
    const mid = Math.floor(length/2);
    partition (arr, l, mid);
    partition (arr, mid+1, r);
    merge(arr, l, mid, r);
    }
    
}

export const merge_sort=(arr) => {
    const n = arr.length - 1;
    partition(arr, 0, n);
    console.log(arr);

}
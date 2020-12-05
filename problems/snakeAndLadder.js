//snake and ladder board
let arr = [];
for (let i = 0; i < 10; i++) {
  arr.push([]);
  let start = i * 10 + 1;
  let colarr = [];
  for (let j = 0; j < 10; j++) {
    colarr.push(start + j);
  }
  if (i % 2 === 0) {
    arr[i].push(...colarr);
  } else {
    arr[i].push(...colarr.reverse());
  }
}
console.log(arr);

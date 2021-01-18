const data = [{
    x: 45,
    y: 32,
    z: 10
  },
  {
    x: 32,
    y: 54,
    z: 10
  },
  {
    x: 46,
    y: 32,
    z: 10
  },
  {
    x: 93,
    y: 89,
    z: 11
  },
  {
    x: 16,
    y: 54,
    z: 11
  },
  {
    x: 12,
    y: 54,
    z: 11
  },
];

const sortBy = ['z', 'y', 'x'];

const output = [{
    x: 45,
    y: 32,
    z: 10
  },
  {
    x: 46,
    y: 32,
    z: 10
  },
  {
    x: 32,
    y: 54,
    z: 10
  },
  {
    x: 12,
    y: 54,
    z: 11
  },
  {
    x: 16,
    y: 54,
    z: 11
  },
  {
    x: 93,
    y: 89,
    z: 11
  },
];

function sortValues(arr, sortBy) {
sortBy = sortBy.reverse();
  sortBy.reduce((acc, curr) => {
    return acc.sort(function(a, b) {
      return a[curr] - b[curr];
    })
   
  }, arr)

}

sortValues(data, sortBy);
console.log(data);






































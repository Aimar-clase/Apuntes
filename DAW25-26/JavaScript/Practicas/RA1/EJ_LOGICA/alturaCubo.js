







function putoCubo(heights) {
  if (!Array.isArray(heights) || heights.length < 2) return 0;

  let i = 0;
  let j = heights.length - 1;
  let max = 0;

  while (i < j) {
    const h = heights[i] < heights[j] ? heights[i] : heights[j];
    const width = j - i;
    const area = h * width;

    if (area > max) {
      max = area;
    }

    if (heights[i] < heights[j]) {
      i += 1;
    } else if (heights[i] > heights[j]) {
      j -= 1;
    } else {
      j -= 1;
    }
  }

  return max;
}


console.log(putoCubo([1, 8, 6, 2, 5, 4, 8, 3, 7])); 

console.log(putoCubo([1, 1])); 

console.log(putoCubo([4, 3, 2, 1, 4])); 

console.log(putoCubo([1, 2, 1])); 

console.log(putoCubo([2, 3, 4, 5, 18, 17, 6])); 

console.log(putoCubo([2, 2, 2, 2, 2])); 

console.log(putoCubo([0, 0, 0, 0])); 

console.log(putoCubo([0, 1, 2, 3, 4, 5])); 

console.log(putoCubo([5, 4, 3, 2, 1, 0])); 

console.log(putoCubo([3])); 

console.log(putoCubo([3, 9, 3, 4, 7, 2, 12, 6])); 

console.log(putoCubo([1, 3, 2, 5, 25, 24, 5])); 

console.log(putoCubo([6, 9, 3, 4, 5, 8])); 

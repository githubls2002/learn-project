/**
*～╭════╮┌══════════════┐
* ╭╯开车║ ▁▂▃▅▆▇  |  ~~~
* ╰⊙═⊙╯╰══⊙══════⊙══╯
* @description: 简历 
* @author: PresByter
* @date  : 2020/03/02 22:57:10
* @file  : demo.js
*/
function someAsyncProcess () {
  console.log ('someAsyncProcess');
}
async function someError () {
  await someAsyncProcess ();
  throw new Error ('发生异常---someError');
}
async function main () {
  try {
    someError ();
  } catch (e) {
    console.log ('异常4');
  }
  try {
    await someError ();
  } catch (e) {
    console.log ('异常5');
  }
}
// main ()
function map (arr, mapCallback) {
  // 首先，检查传递的参数是否正确。
  if (
    !Array.isArray (arr) ||
    !arr.length ||
    typeof mapCallback !== 'function'
  ) {
    return [];
  } else {
    let result = [];
    // 每次调用此函数时，我们都会创建一个 result 数组
    // 因为我们不想改变原始数组。
    for (let i = 0, len = arr.length; i < len; i++) {
      result.push (mapCallback (arr[i], i, arr));
      // 将 mapCallback 返回的结果 push 到 result 数组中
    }
    return result;
  }
}
console.log (map ([1, 2, 3], v => v ** 2));

function reduce (arr, reduceCallback, initialValue) {
  // 首先，检查传递的参数是否正确。
  if (
    !Array.isArray (arr) ||
    !arr.length ||
    typeof reduceCallback !== 'function'
  ) {
    return [];
  } else {
    // 如果没有将initialValue传递给该函数，我们将使用第一个数组项作为initialValue
    let hasInitialValue = initialValue !== undefined;
    let value = hasInitialValue ? initialValue : arr[0];

    // 如果有传递 initialValue，则索引从 1 开始，否则从 0 开始
    for (let i = hasInitialValue ? 0 : 1, len = arr.length; i < len; i++) {
      value = reduceCallback (value, arr[i], i, arr);
    }
    return value;
  }
}
function filter (arr, filterCallback) {
  // 首先，检查传递的参数是否正确。
  if (
    !Array.isArray (arr) ||
    !arr.length ||
    typeof filterCallback !== 'function'
  ) {
    return [];
  } else {
    let result = [];
    // 每次调用此函数时，我们都会创建一个 result 数组
    // 因为我们不想改变原始数组。
    for (let i = 0, len = arr.length; i < len; i++) {
      // 检查 filterCallback 的返回值是否是真值
      if (filterCallback (arr[i], i, arr)) {
        // 如果条件为真，则将数组元素 push 到 result 中
        result.push (arr[i]);
      }
    }
    return result; // return the result array
  }
}
// console.log (filter ([1, 2, 3], v => v > 1));
console.log (reduce ([1, 2, 3], (v, l) => v + l));

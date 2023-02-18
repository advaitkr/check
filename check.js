function executeValue(callback,value) { return typeof callback === 'function' ? callback(value) : value }
function zero(callback) {
  const value = 0;
  return executeValue(callback,value);
}
function one(callback) {
  const value = 1;
  return executeValue(callback,value);
}
function two(callback) {
  const value = 2;
  return executeValue(callback,value);
}
function three(callback) {
  const value = 3;
  return executeValue(callback,value);
}
function four(callback) {
  const value = 4;
  return executeValue(callback,value);
}
function five(callback) {
  const value = 5;
  return executeValue(callback,value);
}
function six(callback) {
  const value = 6;
  return executeValue(callback,value);
}
function seven(callback) {
  const value = 7;
  return executeValue(callback,value);
}
function eight(callback) {
  const value = 8;
  return executeValue(callback,value);
}
function nine(callback) {
  const value = 9;
  return executeValue(callback,value);
}

function plus(a) {
  return (b) => {
    return a + b
  }
}
function minus(a) {
  return (b) => {
    return b - a
  }
}
function times(a) {
  return (b) => {
    return a * b
  }
}
function dividedBy(a) {
  return (b) => {
    return Math.floor(b/a)
  }
}

let ans = four(plus(nine()))
let ans2 = seven(times(five()))
let ans3 = eight(minus(three()))
let ans4 = six(dividedBy(two()))
console.log(ans,ans2,ans3,ans4)
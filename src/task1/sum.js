export const sum = function(a) {
  if(typeof(a) !== 'number') {
    throw Error("Invalid argument");
  }

  return function(b) {
    if(b) {
      return sum(a+b);
    }
    return a;
  }
}
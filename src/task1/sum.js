export const sum = function(a) {
  if(!a) {
    return 0;
  }

  return function(b) {
    if(b) {
      return sum(a+b);
    }
    return a;
  }
}
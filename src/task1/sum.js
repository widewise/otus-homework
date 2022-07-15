export const sum = function(a) {
  if(typeof(a) !== 'number') {
    return 0;
  }

  return function (b){
    return b !== undefined
        ? sum(a + b)
        : a;
  }
}
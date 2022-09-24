export interface ISumResult {
  (n: number): ISumResult;
  (n?: undefined): number
}

export const sum = ((a?: any) => {
  if(typeof a !== "number") {
    return 0;
  }

  const sumFunc = (b: any) => {
    if(typeof b !== "number") {
      return a;
    }
    a = (a && a + b) || b;
    return sumFunc;
  }
  return sumFunc;
}) as ISumResult;
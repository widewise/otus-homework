import { sum } from "./sum";

describe('sum', () => {
  let actual;

  describe('single call without arguments', () => {
    beforeEach(() => {
      //Act
      actual = sum();
    });

    it('Should return zero', () => {
      expect(actual).toBe(0);
    });
  });

  describe('single call with zero', () => {
    beforeEach(() => {
      //Act
      actual = sum(0)();
    });

    it('Should return zero', () => {
      expect(actual).toBe(0);
    });
  });

  describe('single call with one argument', () => {
    const a = 10;
    beforeEach(() => {
      //Act
      actual = sum(a)();
    });

    it('Should return argument', () => {
      expect(actual).toBe(a);
    });
  });

  describe('multiple calls with arguments with zero', () => {
    const a = 10;
    beforeEach(() => {
      //Act
      actual = sum(a)(0)();
    });

    it('Should return a argument', () => {
      expect(actual).toBe(a);
    });
  });

  describe('multiple calls with arguments', () => {
    const a = 10, b = 20, c = 30;
    beforeEach(() => {
      //Act
      actual = sum(a)(b)(c)();
    });

    it('Should return sum of arguments', () => {
      expect(actual).toBe(a+b+c);
    });
  });
});
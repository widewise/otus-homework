import { getPath } from "./getPath";
import { JSDOM } from 'jsdom';

describe('getPath', () =>{
  let actual;
  const firstListElementClassName = "first-element";
  const secondListElementId = "second-element";
  const dom = new JSDOM(
`<html>
  <body>
    <div>
        <h1>Title</h1>
        <ul>
            <li class="${firstListElementClassName}">First</li>
            <li id="${secondListElementId}">Second</li>
            <li>Third</li>
        </ul>
    <div>
  </body>
</html>`);

  describe('not element', () => {
    beforeEach(() => {
      //act
      actual = getPath(null);
    });

    it('Should return undefined', () => {
      //assert
      expect(actual).toBeUndefined();
    });
  });

  describe('element with id', () => {
    beforeEach(() => {
      //arrange
      const secondListItemElement = dom.window.document.getElementById(secondListElementId);

      //act
      actual = getPath(secondListItemElement);
    });

    it(`Should return li with ${secondListElementId} id`, () => {
      //assert
      expect(actual).toBe(`li#${secondListElementId}`);
    });
  });

  describe('element with class', () => {
    beforeEach(() => {
      //arrange
      const firstListItemElement = dom.window.document.getElementsByClassName(firstListElementClassName)[0];

      //act
      actual = getPath(firstListItemElement);
    });

    it(`Should return li with ${firstListElementClassName} class name`, () => {
      //assert
      expect(actual).toBe(`body div ul li.${firstListElementClassName}`);
    });
  });

  describe('element without class and id in collection', () => {
    beforeEach(() => {
      //arrange
      const thirdListItemElement = dom.window.document.getElementsByTagName('ul')[0].children[2];

      //act
      actual = getPath(thirdListItemElement);
    });

    it(`Should return li with ${firstListElementClassName} class name`, () => {
      //assert
      expect(actual).toBe(`body div ul li:nth-of-type(3)`);
    });
  });
});

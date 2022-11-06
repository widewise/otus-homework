import React from "react";
import renderer from "react-test-renderer";
import { CitiesSearch } from "./index";

jest.mock("react-router-dom", () => ({
    useNavigate: () => (data: any) => data,
}));

describe(`${CitiesSearch.name}`, () =>{
    //arrange
   const searchString = "city";
   let actual: any;
   describe(`rerender ${CitiesSearch.name}`, () => {
       beforeEach(() =>{
           //act
           actual = renderer.create(<CitiesSearch search={searchString} />).toJSON();
       });

       it("should match snapshot", () =>{
           //assert
           expect(actual).toMatchSnapshot();
       });
   });
});
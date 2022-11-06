import React from 'react';
import renderer from "react-test-renderer";
import { Cities } from "./index";
import { useSearchParams } from "react-router-dom";
import { citiesStorage } from "../../Services/citiesStorage";

jest.mock("react-router-dom");
jest.mock("../../Services/citiesStorage");

describe(`${Cities.name}`, () =>{
    let actual: any;
    describe(`rerender ${Cities.name}`, () => {
        beforeEach(() => {
            //arrange
            (useSearchParams as jest.Mock).mockImplementationOnce(() => [{
                get: (): string => "1"
            }]);
            (citiesStorage.searchCities as jest.Mock).mockImplementationOnce(() => []);

            //act
            actual = renderer.create(<Cities />).toJSON();
        });

        it("should match snapshot", () =>{
            //assert
            expect(actual).toMatchSnapshot();
        });
    });
});
import React from "react";
import renderer from "react-test-renderer";
import { CitiesList } from "./index";
import { MemoryRouter } from "react-router";

describe(`${CitiesList.name}`, () => {
    //arrange
    const data = [
        {
            id: "1",
            name: "City",
            data: []
        }
    ];
    let actual: any;

    describe(`rerender ${CitiesList.name}`, () => {
        beforeEach(() => {
            //act
            actual = renderer.create(<MemoryRouter><CitiesList data={data} /></MemoryRouter>).toJSON();
        });

        it('should match snapshot', () => {
            //assert
            expect(actual).toMatchSnapshot();
        });
    });
});
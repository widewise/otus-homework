import React from "react";
import renderer from "react-test-renderer";
import { City } from "./index";
import { MemoryRouter } from "react-router";
import { useParams } from "react-router";
import { citiesStorage } from "../../Services/citiesStorage";

jest.mock("react-router");
jest.mock("../../Services/citiesStorage");

describe(`${City.name}`, () => {
    const city = {
        id: "1",
        name: "city",
        data: []
    };
    let actual: any;

    describe(`rerender with data ${City.name}`, () => {
        beforeEach(() => {
            //arrange
            (useParams as jest.Mock).mockImplementationOnce(() => { "1" });
            (citiesStorage.getCity as jest.Mock).mockImplementationOnce(() => city);

            //act
            actual = renderer.create(<MemoryRouter><City /></MemoryRouter>).toJSON();
        });

        it('should match snapshot', () => {
            //assert
            expect(actual).toMatchSnapshot();
        });
    });

    describe(`rerender without data ${City.name}`, () => {
        beforeEach(() => {
            //act
            actual = renderer.create(<MemoryRouter><City /></MemoryRouter>).toJSON();
        });

        it('should match snapshot', () => {
            //assert
            expect(actual).toMatchSnapshot();
        });
    });
});
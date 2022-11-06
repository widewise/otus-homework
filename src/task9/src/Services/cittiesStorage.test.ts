import { CITIES_KEY, citiesStorage } from "./citiesStorage";
import { ICityWeather } from "../Models/weather";

describe("citiesStorage", () => {
    const cities = [
        { id: "1", name: "city1", data: [] },
        { id: "2", name: "city2", data: [] },
        { id: "3", name: "city3", data: [] }
    ];

    beforeAll(() => {
        global.localStorage.setItem(CITIES_KEY, JSON.stringify(cities));
        //jest.spyOn(global.localStorage.prototype, 'setItem');
    });

    describe(`${citiesStorage.init.name}`, () => {
        describe("some cities", () => {
            beforeEach(() => {
                //act
                citiesStorage.init(cities);
            });

            it("storage initialized", () => {
                //assert
                const storageValue = global.localStorage.getItem(CITIES_KEY);
                expect(storageValue).toEqual(JSON.stringify(cities));
            });
        });
    });

    describe(`${citiesStorage.getCity.name}`, () => {
        let actual: ICityWeather | undefined;

        describe("exist city", () => {
            beforeEach(() => {
                //act
                actual = citiesStorage.getCity(cities[0].id);
            });

            it("should return city", () => {
                //assert
                expect(actual).toEqual(cities[0]);
            });
        });

        describe("not exist city id", () => {
            beforeEach(() => {
                //arrange
                jest.spyOn(global.console, 'log');

                //act
                actual = citiesStorage.getCity("99");
            });

            it("should log error", () => {
                //assert
                expect(actual).toBeUndefined();
                expect(console.log).toHaveBeenCalled();
            });
        });
    });

    describe(`${citiesStorage.searchCities.name}`, () => {
        let actual: ICityWeather[];

        describe("city first city name", () => {
            beforeEach(() => {
                //act
                actual = citiesStorage.searchCities(cities[0].name);
            });

            it("should return first city", () => {
                //assert
                expect(actual).toEqual([cities[0]]);
            });
        });
    });

    afterAll(() => {
        global.localStorage.removeItem(CITIES_KEY);
        jest.clearAllMocks();
    });
});
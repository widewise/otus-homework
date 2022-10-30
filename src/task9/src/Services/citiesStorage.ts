import {ICityWeather} from "../Models/weather";
import {Error} from "../components/Error";

const CITIES_KEY = "CITIES";

function getCities(): ICityWeather[] {
    const jsonData = localStorage.getItem(CITIES_KEY);
    if (!jsonData) {
        throw Error("Storage is not initialized");
    }
    return  JSON.parse(jsonData) as ICityWeather[];
}

export const citiesStorage = {
    init: (cities: ICityWeather[]) => {
        localStorage.setItem(CITIES_KEY, JSON.stringify(cities));
    },

    searchCities: (search: string = ""): ICityWeather[] => {
        return getCities().filter(c => c.name.includes(search));
    },

    getCity: (id: string): ICityWeather | undefined => {
        const city = getCities().find(c => c.id === id);
        if(!city) {
            console.log(`City with id ${id} doesn't exist`);
            return;
        }
        return city;
    }
}
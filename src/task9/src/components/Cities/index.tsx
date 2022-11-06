import React, {
    useEffect,
    useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import { ICityWeather } from "../../Models/weather";
import { CitiesSearch } from "./CitiesSearch";
import { CitiesList } from "./CitiesList";
import { citiesStorage } from "../../Services/citiesStorage";

export const Cities: React.FC = () => {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const [cities, setCities] = useState<ICityWeather[]>()

    useEffect(() => {
        setCities(citiesStorage.searchCities(search));
    }, [search])
    return (
        <div>
            <CitiesSearch search={search} />
            <CitiesList data={cities} />
        </div>
    );
}
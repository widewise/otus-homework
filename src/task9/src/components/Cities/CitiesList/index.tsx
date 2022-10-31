import React, { FunctionComponent } from 'react';
import { ICityWeather } from "../../../Models/weather";
import { Link } from "react-router-dom";

export interface ICitiesListProps {
    data?: ICityWeather[]
}
export const CitiesList: FunctionComponent<ICitiesListProps> = ({
    data
}: ICitiesListProps) => (<ul>
        {data && data.map(city => <li key={city.id}>
            <Link to={city.id}>{city.name}</Link>
        </li>)}
    </ul>);
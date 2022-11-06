import React, {useEffect, useState} from "react";
import { ICityWeather } from "../../Models/weather";
import { useParams } from "react-router";
import { citiesStorage } from "../../Services/citiesStorage";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../../Services/formatDate";

export const City: React.FC = () => {
    const { id } = useParams();
    const [ city, setState ] = useState<ICityWeather>();
    const navigate = useNavigate();

    useEffect(() => {
        let cityWeather: ICityWeather | undefined;
        if(id) {
            cityWeather = citiesStorage.getCity(id)
        }
        if (!cityWeather) {
            navigate('/')
            return;
        }
        setState(cityWeather);

    }, [id]);

    return (<div>
        {city &&
            <>
                <Link to="/">To list</Link>
                {city &&
                    <>
                        <h1>{city.name}</h1>
                        <ul>
                            {city.data.map((d, index) =>
                                <li key={index}>{formatDate(d.date)}: &nbsp;&nbsp; {d.temperature} &#176;С</li>
                            )
                            }
                        </ul>
                    </>
                }
            </>
        }
    </div>);
}
import React, { FunctionComponent } from 'react';
import { useNavigate } from "react-router-dom";
import "./styles.css";

export interface ICitiesSearchProps {
    search: string,
}

export const CitiesSearch: FunctionComponent<ICitiesSearchProps> = ({
    search
}: ICitiesSearchProps) => {
    const navigate = useNavigate();
    const onSearchChange =(event: React.ChangeEvent<HTMLInputElement>) => {
        navigate(`?search=${event.target.value}`);
    };
    return (<div className="cities-search">
        <label>City:</label>
        <input
            type="text"
            value={search}
            placeholder="Enter city"
            onChange={onSearchChange}
        />
    </div>);
}
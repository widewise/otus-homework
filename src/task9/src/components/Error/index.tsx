import React from "react";
import {Link, useRouteError} from "react-router-dom";

export const Error: React.FC = () => {
    const error = useRouteError() as Error;
    console.log(error);
    return (<div>
        <Link to="/">To list</Link>
        <h1>Something went wrong.</h1>
        <p>
            <i>{JSON.stringify(error)}</i>
        </p>
    </div>);
}
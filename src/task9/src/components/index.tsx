import { StrictMode } from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"
import { Cities } from "./Cities";
import { City } from "./City";
import { Error } from "./Error";
import { citiesStorage } from "../Services/citiesStorage";

citiesStorage.init([
    {
        id: "1",
        name: "Moscow",
        data: [
            { date: new Date(2022, 10, 30), temperature: 5 },
            { date: new Date(2022, 10, 31), temperature: 5 },
            { date: new Date(2022, 11, 1), temperature: 4 },
            { date: new Date(2022, 11, 2), temperature: 6 },
            { date: new Date(2022, 11, 3), temperature: 3 },
        ]
    },
    {
        id: "2",
        name: "Saint Petersburg",
        data: [
            { date: new Date(2022, 10, 30), temperature: 3 },
            { date: new Date(2022, 10, 31), temperature: 3 },
            { date: new Date(2022, 11, 1), temperature: 4 },
            { date: new Date(2022, 11, 2), temperature: 4 },
            { date: new Date(2022, 11, 3), temperature: 1 },
        ]
    },
    {
        id: "3",
        name: "Saratov",
        data: [
            { date: new Date(2022, 10, 30), temperature: 5 },
            { date: new Date(2022, 10, 31), temperature: 5 },
            { date: new Date(2022, 11, 1), temperature: 5 },
            { date: new Date(2022, 11, 2), temperature: 6 },
            { date: new Date(2022, 11, 3), temperature: 4 },
        ]
    }
]);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Cities />,
        errorElement:<Error />
    },
    {
        path: "/:id",
        element: <City/>
    }
])

export default function App() {
    return (
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    );
}

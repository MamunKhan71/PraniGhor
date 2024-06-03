import MainLayouts from "@/Layouts/MainLayouts";
import AllPets from "@/pages/All Pets/AllPets";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayouts />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/all-pets',
                element: <AllPets />
            }
        ]
    },
]);

export default router
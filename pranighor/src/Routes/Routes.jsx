import MainLayouts from "@/Layouts/MainLayouts";
import AboutUs from "@/pages/About Us/AboutUs";
import AllPets from "@/pages/All Pets/AllPets";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import PetDetails from "@/pages/Pet Details/PetDetails";
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
            },
            {
                path: '/about-us',
                element: <AboutUs />
            },
            {
                path: '/details',
                element: <PetDetails />
            }
        ]
    },
]);

export default router
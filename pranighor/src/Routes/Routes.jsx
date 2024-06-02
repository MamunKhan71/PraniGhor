import MainLayouts from "@/Layouts/MainLayouts";
import Home from "@/pages/Home/Home";
import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayouts />,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
    },
]);

export default router
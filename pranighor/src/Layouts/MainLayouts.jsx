import Navbar from "@/components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const MainLayouts = () => {
    return (
        <div className="font-primary">
            <div className="container mx-auto">
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayouts;
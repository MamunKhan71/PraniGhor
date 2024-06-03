import Navbar from "@/shared/Navbar/Navbar";
import Footer from "@/shared/Footer";
import { Outlet } from "react-router-dom";

const MainLayouts = () => {
    return (
        <div className="font-primary">
            <div className="container mx-auto">
                <Navbar />
                <div>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MainLayouts;
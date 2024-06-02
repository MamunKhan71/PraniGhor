import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/shared/Footer";
import { Outlet } from "react-router-dom";

const MainLayouts = () => {
    return (
        <div className="font-primary">
            <div className="container mx-auto">
                <Navbar />
                <Outlet />

            </div>
            <Footer />
        </div>
    );
};

export default MainLayouts;
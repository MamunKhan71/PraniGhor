import Navbar from "@/shared/Navbar/Navbar";
import Footer from "@/shared/Footer";
import { Outlet, useLocation } from "react-router-dom";

const MainLayouts = () => {
    const location = useLocation()
    return (
        <div className="font-primary">
            <div className="container mx-auto">
                {!location.pathname.startsWith("/dashboard") && <Navbar />}
                <div>
                    <Outlet />
                </div>
            </div>
            {!location.pathname.startsWith("/dashboard")  && <Footer />}

        </div>
    );
};

export default MainLayouts;
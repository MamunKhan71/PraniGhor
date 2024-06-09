import Navbar from "@/shared/Navbar/Navbar";
import Footer from "@/shared/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"
const MainLayouts = () => {
    const location = useLocation()
    return (
        <div className="font-primary">
            <div className="container mx-auto py-8">
                {!location.pathname.startsWith("/dashboard") && <Navbar />}
                <div>
                    <Outlet />
                </div>
            </div>
            {!location.pathname.startsWith("/dashboard") && <Footer />}
            <Toaster />
        </div>
    );
};

export default MainLayouts;
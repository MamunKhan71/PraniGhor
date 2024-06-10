import MainLayouts from "@/Layouts/MainLayouts";
import AboutUs from "@/pages/About Us/AboutUs";
import ManageDonations from "@/pages/Admin Dashboard/ManageDonations";
import ManagePets from "@/pages/Admin Dashboard/ManagePets";
import ManageUsers from "@/pages/Admin Dashboard/ManageUsers";
import AllPets from "@/pages/All Pets/AllPets";
import DonationCampaign from "@/pages/Campaign Page/DonationCampaign";
import Dashboard from "@/pages/Dashboard/Dashboard";
import DonationDetails from "@/pages/Donation Details/DonationDetails";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import PetDetails from "@/pages/Pet Details/PetDetails";
import AddPet from "@/pages/User Dashboard/AddPet";
import CreateDonationCampaign from "@/pages/User Dashboard/CreateDonationCampaign";
import EditDonation from "@/pages/User Dashboard/EditDonation";
import MyAdoptionRequests from "@/pages/User Dashboard/MyAdoptionRequest";
import MyCampaigns from "@/pages/User Dashboard/MyCampaigns";
import MyDonations from "@/pages/User Dashboard/MyDonations";
import MyPets from "@/pages/User Dashboard/MyPets";
import UpdatePet from "@/pages/User Dashboard/UpdatePet";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import LoginProtection from "./LoginProtection";
import AdminRoute from "./AdminRoute";
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
                element: <LoginProtection><Login /></LoginProtection>
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
                path: '/details/:id',
                element: <PrivateRoutes><PetDetails /></PrivateRoutes>
            },
            {
                path: '/donation',
                element: <DonationCampaign />
            },

            {
                path: '/campaign-details/:id',
                element: <PrivateRoutes><DonationDetails /></PrivateRoutes>
            },
            {
                path: '/dashboard',
                element: <PrivateRoutes><Dashboard /></PrivateRoutes>,
                children: [
                    // user
                    {
                        index: true,
                        element: <AddPet />
                    },
                    {
                        path: 'add-pet',
                        element: <AddPet />
                    },
                    {
                        path: 'my-pets',
                        element: <MyPets />
                    },
                    {
                        path: 'update-pet/:id',
                        element: <UpdatePet />
                    },
                    {
                        path: 'donation-campaign',
                        element: <CreateDonationCampaign />
                    },
                    {
                        path: 'my-campaigns',
                        element: <MyCampaigns />
                    },
                    {
                        path: 'edit-donation/:id',
                        element: <EditDonation />
                    },
                    {
                        path: 'my-donations',
                        element: <MyDonations />
                    },
                    {
                        path: 'adoption-requests',
                        element: <MyAdoptionRequests />
                    },
                    //admin
                    {
                        path: 'users',
                        element: <AdminRoute><ManageUsers /></AdminRoute>
                    },
                    {
                        path: 'all-pets',
                        element: <AdminRoute><ManagePets /></AdminRoute>
                    },
                    {
                        path: 'all-campaigns',
                        element: <AdminRoute><ManageDonations /></AdminRoute>
                    }
                ]
            }
        ]
    },
]);

export default router
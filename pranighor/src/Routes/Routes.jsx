import MainLayouts from "@/Layouts/MainLayouts";
import AboutUs from "@/pages/About Us/AboutUs";
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
                path: '/details/:id',
                element: <PetDetails />
            },
            {
                path: '/donation',
                element: <DonationCampaign />
            },

            {
                path: '/campaign-details/:id',
                element: <DonationDetails />
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
                children: [
                    // user
                    {
                        path: 'add-pet',
                        element: <AddPet />
                    },
                    {
                        path: 'my-pets',
                        element: <MyPets />
                    },
                    {
                        path: 'my-pets/update-pet',
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
                    }
                ]
            }
        ]
    },
]);

export default router
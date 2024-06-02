import { Button } from "@/components/ui/button";
import Hero from "./Hero";
import { MdShoppingCartCheckout } from "react-icons/md";
import Category from "./Category";
import { FeaturedSection } from "./FeaturedSection";
import HomeAbout from "./HomeAbout";
import CompanySlider from "./CompanySlider";
import { BestPets } from "./BestPets";
import { GoMoveToEnd } from "react-icons/go";
import { ShopByPets } from "./ShopByPets";
const Home = () => {
    return (
        <div className="space-y-40">
            <div className="relative">
                <Hero />
                <div className="absolute top-1/2 -translate-y-1/2 z-20 p-20 max-w-3xl text-white space-y-4">
                    <p className="text-primaryCol font-semibold">Pet shop</p>
                    <h1 className="text-6xl font-black leading-[60px]">A pet store with everything you need</h1>
                    <h3 className="text-lg">Sociis blandit et pellentesque aliquet at quisque tortor lacinia nullam. Mattis aenean scelerisque dui libero</h3>
                    <Button>
                        <MdShoppingCartCheckout className="mr-2 h-4 w-4" /> Shop Now
                    </Button>
                </div>
            </div>
            <div className="space-y-16">
                <h1 className="text-3xl font-bold text-center">Browse by category</h1>
                <Category />
            </div>
            <div className="space-y-16">
                <h1 className="text-3xl font-bold text-center">Featured products</h1>
                <FeaturedSection />
            </div>
            <div>
                <HomeAbout />
            </div>
            <div className="space-y-16">
                <h1 className="text-3xl font-bold text-center">Our proud partners</h1>
                <CompanySlider />
            </div>
            <div className="space-y-16">
                <h1 className="text-3xl font-bold text-center">Best selling products</h1>
                <BestPets />
                <div className="w-full flex items-center justify-center">
                    <Button><div className="flex items-center gap-2 justify-center">View More <GoMoveToEnd /></div></Button>
                </div>
            </div>
            <div className="space-y-16">
                <h1 className="text-3xl font-bold text-center">Shop by pet</h1>
                <ShopByPets></ShopByPets>
            </div>
        </div>
    );
};

export default Home;
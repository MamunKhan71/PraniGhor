import { Button } from "@/components/ui/button";
import Hero from "./Hero";
import { MdShoppingCartCheckout } from "react-icons/md";
import { FeaturedSection } from "./FeaturedSection";
import HomeAbout from "./HomeAbout";
import CompanySlider from "./CompanySlider";
import { BestPets } from "./BestPets";
import { GoMoveToEnd } from "react-icons/go";
import { ShopByPets } from "./ShopByPets";
import { Link } from "react-router-dom";
import CallToAction from "./CallToAction";
const Home = () => {
    return (
        <div className="space-y-40">
            <div className="relative">
                <Hero />
                <div className="absolute top-1/2 -translate-y-1/2 z-20 p-20 max-w-3xl text-white space-y-4">
                    <p className="text-primaryCol font-semibold">Pet shop</p>
                    <h1 className="text-6xl font-black leading-[60px]">A pet store with everything you need</h1>
                    <h3 className="text-lg">Sociis blandit et pellentesque aliquet at quisque tortor lacinia nullam. Mattis aenean scelerisque dui libero</h3>
                    <div>
                        <Link to={'/all-pets'}><Button>
                            <MdShoppingCartCheckout className="mr-2 h-4 w-4" /> Adopt Now
                        </Button></Link>
                    </div>
                </div>
            </div>
            <div className="space-y-16 relative">
                <h1 className="text-3xl font-bold text-center">Browse by category</h1>
                <ShopByPets></ShopByPets>
            </div>
            <div className="space-y-16">
                <h1 className="text-3xl font-bold text-center">Featured Pets</h1>
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
                    <div className="flex items-center gap-2 justify-center">
                        <Link to={'/all-pets'}><Button className="inline-flex gap-2 items-center">View More <GoMoveToEnd /></Button></Link>
                    </div>

                </div>
            </div>

            <div className="space-y-16">
                <div className="space-y-2 text-center">
                    <h2 className="text-3xl font-bold">Find Your Furry Friend Today</h2>
                    <p className="text-gray-500 dark:text-gray-400">
                        Give a loving home to a pet in need. Adopt today and make a friend for life!
                    </p>
                </div>
                <div className="flex gap-6 items-center">
                    <div className="flex-1 w-full">
                        <img className="rounded-lg object-cover" src="header1.jpg" alt="" />
                    </div>
                    <div className="flex-1 h-full w-full">
                        <CallToAction />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
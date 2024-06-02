import { Button } from "@/components/ui/button";
import Hero from "./Hero";
import { MdShoppingCartCheckout } from "react-icons/md";
const Home = () => {
    return (
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
    );
};

export default Home;
import Lottie from "lottie-react";
import dog from '/src/assets/lottie/dog.json'
import { Button } from "@/components/ui/button";
import { MdOutlineReadMore } from "react-icons/md";
const HomeAbout = () => {
    return (
        <div className="flex justify-between gap-6 items-center bg-[#F8F9FA] p-6 rounded-xl">
            <div className=" flex-1">
                <Lottie animationData={dog} loop={true} />
            </div>
            <div className="max-w-3xl space-y-4 flex-1">
                <p className="text-primaryCol font-semibold">Pet shop</p>
                <h1 className="text-5xl font-black leading-[60px]">The smarter way to adopt
                    your pet</h1>
                <h3 className="text-lg">Lorem ipsum dolor sit amet consectetur. At et vehicula sodales est proin turpis pellentesque sinulla a aliquam amet rhoncus quisque eget sit</h3>
                <Button>
                    <MdOutlineReadMore className="mr-2 h-4 w-4" /> Learn More
                </Button>
            </div>
        </div>
    );
};

export default HomeAbout;
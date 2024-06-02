import Marquee from "react-fast-marquee";
const CompanySlider = () => {
    return (
        <Marquee>
            <div className="flex gap-20 items-center grayscale opacity-75">
                <img className="max-h-24" src="/src/images/logos1.png" alt="" />
                <img className="max-h-24" src="/src/images/logos2.png" alt="" />
                <img className="max-h-24" src="/src/images/logos3.webp" alt="" />
                <img className="max-h-24" src="/src/images/logos4.png" alt="" />
                <img className="max-h-24" src="/src/images/logos5.png" alt="" />
                <img className="max-h-24" src="/src/images/logos7.svg" alt="" />
                <img className="max-h-24" src="/src/images/logos8.webp" alt="" />
            </div>
        </Marquee>
    );
};

export default CompanySlider;
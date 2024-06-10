import Marquee from "react-fast-marquee";
const CompanySlider = () => {
    return (
        <Marquee>
            <div className="flex gap-20 items-center grayscale opacity-75">
                <img className="max-h-24" src="https://i.ibb.co/LpcrBVs/logos2.png" alt="Logo 2" />
                <img className="max-h-24" src="https://i.ibb.co/NFhb2t5/logos3.webp" alt="Logo 3" />
                <img className="max-h-24" src="https://i.ibb.co/q0gMthS/logos4.png" alt="Logo 4" />
                <img className="max-h-24" src="https://i.ibb.co/N1GwHSV/logos5.png" alt="Logo 5" />
                <img className="max-h-24" src="https://i.ibb.co/Xx3qSPv/logos8.png" alt="Logo 8" />
                <img className="max-h-24" src="https://i.ibb.co/hRgD1wk/logos8.webp" alt="Logo 8 (WebP)" />
            </div>

        </Marquee>
    );
};

export default CompanySlider;
import { Card, CardTitle, CardHeader } from "@/components/ui/card"
import { PiDogFill } from "react-icons/pi";
import { FaCat } from "react-icons/fa";
import { GiRabbit, GiTurtleShell } from "react-icons/gi";
import { GiTurtle } from "react-icons/gi";
import { FaEarlybirds } from "react-icons/fa";
import { GiSeatedMouse } from "react-icons/gi";
import { GiParrotHead } from "react-icons/gi";
import { IoFish } from "react-icons/io5"
import { FaDove } from "react-icons/fa";
import { FaFrog } from "react-icons/fa";
export function ShopByPets() {
    return (
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-6">
            <Card className="hover:bg-primaryCol transition-all transform hover:text-black hover:cursor-pointer">
                <CardHeader>
                    <div className="space-y-4 flex flex-col items-center justify-center">
                        <CardTitle>
                            <PiDogFill className="text-7xl" />
                        </CardTitle>
                        <CardTitle>Dog</CardTitle>
                    </div>
                </CardHeader>
            </Card>
            <Card className="hover:bg-primaryCol transition-all transform hover:text-black hover:cursor-pointer">
                <CardHeader>
                    <div className="space-y-4 flex flex-col items-center justify-center">
                        <CardTitle>
                            <FaCat className="text-7xl" />
                        </CardTitle>
                        <CardTitle>Cat</CardTitle>
                    </div>
                </CardHeader>
            </Card>
            <Card className="hover:bg-primaryCol transition-all transform hover:text-black hover:cursor-pointer">
                <CardHeader>
                    <div className="space-y-4 flex flex-col items-center justify-center">
                        <CardTitle>
                            <GiRabbit className="text-7xl" />
                        </CardTitle>
                        <CardTitle>Rabbit</CardTitle>
                    </div>
                </CardHeader>
            </Card>
            <Card className="hover:bg-primaryCol transition-all transform hover:text-black hover:cursor-pointer">
                <CardHeader>
                    <div className="space-y-4 flex flex-col items-center justify-center">
                        <CardTitle>
                            <GiParrotHead className="text-7xl" />
                        </CardTitle>
                        <CardTitle>Parrot</CardTitle>
                    </div>
                </CardHeader>
            </Card>
            <Card className="hover:bg-primaryCol transition-all transform hover:text-black hover:cursor-pointer">
                <CardHeader>
                    <div className="space-y-4 flex flex-col items-center justify-center">
                        <CardTitle>
                            <GiTurtle className="text-7xl" />
                        </CardTitle>
                        <CardTitle>Turtle</CardTitle>
                    </div>
                </CardHeader>
            </Card>
            <Card className="hover:bg-primaryCol transition-all transform hover:text-black hover:cursor-pointer">
                <CardHeader>
                    <div className="space-y-4 flex flex-col items-center justify-center">
                        <CardTitle>
                            <GiSeatedMouse className="text-7xl" />
                        </CardTitle>
                        <CardTitle>Hamster</CardTitle>
                    </div>
                </CardHeader>
            </Card>
            <Card className="hover:bg-primaryCol transition-all transform hover:text-black hover:cursor-pointer">
                <CardHeader>
                    <div className="space-y-4 flex flex-col items-center justify-center">
                        <CardTitle>
                            <FaFrog className="text-7xl" />
                        </CardTitle>
                        <CardTitle>Frog</CardTitle>
                    </div>
                </CardHeader>
            </Card>
            <Card className="hover:bg-primaryCol transition-all transform hover:text-black hover:cursor-pointer">
                <CardHeader>
                    <div className="space-y-4 flex flex-col items-center justify-center">
                        <CardTitle>
                            <FaEarlybirds className="text-7xl" />
                        </CardTitle>
                        <CardTitle>Pigeon</CardTitle>
                    </div>
                </CardHeader>
            </Card>
            <Card className="hover:bg-primaryCol transition-all transform hover:text-black hover:cursor-pointer">
                <CardHeader>
                    <div className="space-y-4 flex flex-col items-center justify-center">
                        <CardTitle>
                            <IoFish className="text-7xl" />
                        </CardTitle>
                        <CardTitle>Goldfish</CardTitle>
                    </div>
                </CardHeader>
            </Card>
            <Card className="hover:bg-primaryCol transition-all transform hover:text-black hover:cursor-pointer">
                <CardHeader>
                    <div className="space-y-4 flex flex-col items-center justify-center">
                        <CardTitle>
                            <FaDove className="text-7xl" />
                        </CardTitle>
                        <CardTitle>Dove</CardTitle>
                    </div>
                </CardHeader>
            </Card>
        </div>
    )
}

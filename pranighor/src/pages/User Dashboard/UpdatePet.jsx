import { FaUser } from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react";
import Select from 'react-select';
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import moment from 'moment';
import TimeDisplay from "@/components/ui/time-display";
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const UpdatePet = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [currentTime, setCurrentTime] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'))

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);
    return (
        <div>
            <h1 className="text-2xl font-bold text-center">Add Pet</h1>
            <hr />
            <>
                <div className=" flex py-4 gap-6">
                    <div className="flex-1 flex flex-col border border-gray-100 rounded-lg p-4 space-y-4">
                        <h1 className="text-2xl font-bold inline-flex items-center gap-2"><MdOutlinePets />Pet Info</h1>
                        <div>
                            <img className="h-32 w-32 rounded-lg" src="heder1.jpg" alt="" />
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="picture">Pet Picture</Label>
                            <Input id="picture" type="file" />
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="petName">Pet Name</Label>
                            <Input id="petName" type="text" />
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="petName">Pet Age</Label>
                            <Input id="petName" type="number" />
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="petName">Pet Name</Label>
                            <Select
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options}

                            />
                        </div>
                        <div className="space-y-4">
                            <Label>Pet Location</Label>
                            <Input type="text" />
                        </div>
                        <div className="space-y-4">
                            <Label>Short Description</Label>
                            <Input type="text" />
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="petName">Long Description</Label>
                            <Textarea />
                        </div>
                        <Button>Submit</Button>
                    </div>
                    <div className="basis-1/3 ">
                        <div className="border border-gray-100 rounded-lg p-4 space-y-4">
                            <h1 className="text-2xl font-bold inline-flex items-center gap-2"><FaUser />User Info</h1>
                            <hr />
                            <p>Name: Md. Mamun</p>
                            <p>Email: mkmamun031@gmail.com</p>
                            <p>Phone: +880 1643091606</p>
                            <p>Current Time:  <TimeDisplay /></p>
                        </div>
                        <p className="text-red-200 font-light mt-2">* These info will be submitted</p>
                    </div>
                </div>

            </>

        </div>
    );
};

export default UpdatePet;
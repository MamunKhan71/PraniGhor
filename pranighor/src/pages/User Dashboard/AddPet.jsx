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
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import UseAuth from "@/hooks/useAuth";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox"
const AddPet = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = UseAuth()
    const [categories, setCategories] = useState([])
    const [selectedOption, setSelectedOption] = useState(null);
    const [currentTime, setCurrentTime] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'))
    const [adoptionStatus, setAdoptionStatus] = useState(null)
    const [urgent, setUrgent] = useState(false)
    const [vaccinated, setVaccinated] = useState(false)
    const [neutered, setNeutered] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)

    const { isPending, error, data: category } = useQuery({
        queryKey: ['petData'],
        queryFn: () =>
            axiosPublic.get('pet-category').then((res) => { return res.data })
    })
    useEffect(() => {
        const options = category?.map(item => ({
            value: item.CategoryId,
            label: item.name
        }));
        setCategories(options)
    }, [category])
    const { register, handleSubmit } = useForm();

    const handleAddPet = async (data) => {
        const petName = data.petName;
        const petAge = data.petAge;
        const petCategory = selectedOption.label;
        const petCategoryId = selectedOption.value;
        const petLocation = data.petLocation;
        const petShortDescription = data.petShortDescription;
        const petLongDescription = data.petLongDescription;
        const urgentCheck = Boolean(data.urgencyStatus)
        const vaccinationCheck = Boolean(data.vaccinationStatus)
        const neuteredCheck = Boolean(data.neurationStatus)
        const adoptedStatus = adoptionStatus
        const postedBy = {
            name: user?.displayName,
            email: user?.email,
            phone: "",
            postedTime: new Date().toISOString()
        };

        const petData = {
            name: petName,
            age: petAge,
            category: petCategory,
            categoryId: petCategoryId,
            location: petLocation,
            shortDescription: petShortDescription,
            longDescription: petLongDescription,
            status: adoptedStatus,
            postedBy: postedBy,
            postedDate: new Date().toISOString(),
            interactionCount: 0,
            adoptionUrgency: urgentCheck,
            vaccinated: vaccinationCheck,
            neutered: neuteredCheck,
            featuredStatus: false
        };
        if (selectedFile !== null) {
            axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_api}`, { image: data.image[0] }, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    newCampaign.campaignImage = (res.data?.data?.display_url)

                })
                .then(() => {
                    axiosPublic.patch(`edit-campaign?id=${id.id}`, newCampaign)
                        .then(res => console.log(res.data))
                })
        }
        axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_api}`, { image: data.petPicture[0] }, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then((res) => {
                petData.image = (res.data?.data?.display_url)
                axiosPublic.post('add-pet', petData)
                    .then(() => {
                        toast({
                            title: "Successful!",
                            description: "Pet Added Successfully!",
                        })
                    })
            })

    }
    return (
        <div>
            <h1 className="text-2xl font-bold text-center">Add Pet</h1>
            <hr />
            <>
                <div className=" flex py-4 gap-6">
                    <form onSubmit={handleSubmit(handleAddPet)} className="flex-1 flex flex-col border border-gray-100 rounded-lg p-4 space-y-4">
                        <h1 className="text-2xl font-bold inline-flex items-center gap-2"><MdOutlinePets />Pet Info</h1>
                        <div>
                            <img className="h-32 w-32 rounded-lg" src="heder1.jpg" alt="" />
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="picture">Pet Picture</Label>
                            <Input {...register("petPicture")} id="picture" type="file" />
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="petName">Pet Name</Label>
                            <Input {...register("petName")} id="petName" type="text" />
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="Age">Pet Age</Label>
                            <Input {...register("petAge")} id="petName" type="number" />
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="petCategory">Pet Category</Label>
                            <Select
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={categories}
                            />
                        </div>
                        <div className="space-y-4">
                            <Label>Pet Location</Label>
                            <Input {...register("petLocation")} type="text" />
                        </div>
                        <div className="space-y-4">
                            <Label>Pet Adoption Status</Label>
                            <div>
                                <>
                                    <div className="flex gap-6 items-center w-full">
                                        <div className="flex flex-1 items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                            <input
                                                onChange={() => setAdoptionStatus("Adopted")}
                                                id="bordered-radio-1"
                                                type="radio"
                                                value={"Adopted"}
                                                name="bordered-radio"
                                            />
                                            <label
                                                htmlFor="bordered-radio-1"
                                                className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                Adopted
                                            </label>
                                        </div>
                                        <div className="flex flex-1 items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                            <input
                                                id="bordered-radio-2"
                                                onChange={() => setAdoptionStatus("Not Adopted")}
                                                value={"Not Adopted"}
                                                type="radio"
                                                name="bordered-radio"
                                            />
                                            <label
                                                htmlFor="bordered-radio-2"
                                                className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                Not Adopted
                                            </label>
                                        </div>
                                    </div>
                                </>

                            </div>
                        </div>
                        <div className="space-y-4">
                            <Label>Short Description</Label>
                            <Input {...register("petShortDescription")} type="text" />
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="petName">Long Description</Label>
                            <Textarea {...register("petLongDescription")} />
                        </div>
                        <div className="space-y-4">
                            <Label>Other info</Label>
                            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input
                                            {...register('neurationStatus')}
                                            id="vue-checkbox-list"
                                            type="checkbox"
                                            value={true}
                                        />
                                        <label
                                            htmlFor="vue-checkbox-list"
                                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Neutered
                                        </label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input
                                            {...register('vaccinationStatus')}
                                            id="react-checkbox-list"
                                            type="checkbox"
                                            defaultChecked={false}
                                            value={true}
                                        />
                                        <label
                                            htmlFor="react-checkbox-list"
                                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Vaccinated
                                        </label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input
                                            {...register('urgencyStatus')}
                                            id="angular-checkbox-list"
                                            type="checkbox"
                                            value={true}
                                        />
                                        <label
                                            htmlFor="angular-checkbox-list"
                                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            Urgent
                                        </label>
                                    </div>
                                </li>
                            </ul>
                            <Label className="text-gray-400">* Select all that apply</Label>

                        </div>
                        <Button>Submit</Button>
                    </form>
                    <div className="basis-1/3 ">
                        <div className="border border-gray-100 rounded-lg p-4 space-y-4">
                            <h1 className="text-2xl font-bold inline-flex items-center gap-2"><FaUser />User Info</h1>
                            <hr />
                            <p>Name: {user?.displayName}</p>
                            <p>Email: {user?.email}</p>
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

export default AddPet;
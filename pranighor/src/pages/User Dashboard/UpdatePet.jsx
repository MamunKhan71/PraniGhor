import { FaUser } from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import TimeDisplay from "@/components/ui/time-display";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import UseAuth from "@/hooks/useAuth";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const UpdatePet = () => {
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();
    const [petData, setPetData] = useState({});
    const [petLoading, setPetLoading] = useState(true);
    const { user } = UseAuth();
    const [categories, setCategories] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [adoptionStatus, setAdoptionStatus] = useState("");
    const [urgent, setUrgent] = useState(false);
    const [vaccinated, setVaccinated] = useState(false);
    const [neutered, setNeutered] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null)

    const { data: category } = useQuery({
        queryKey: ["petData"],
        queryFn: async () =>
            await axiosPublic.get("pet-category").then((res) => res.data),
    });

    useEffect(() => {
        axiosPublic
            .get(`pet-data?id=${id}`)
            .then((res) => {
                setPetData(res.data);
                setPetLoading(false);
            });
    }, [id, axiosPublic]);

    useEffect(() => {
        if (petData.adopted !== undefined) {
            setAdoptionStatus(petData.adopted);
        }
        if (petData.adoptionUrgency !== undefined) {
            setUrgent(petData.adoptionUrgency);
        }
        if (petData.vaccinated !== undefined) {
            setVaccinated(petData.vaccinated);
        }
        if (petData.neutered !== undefined) {
            setNeutered(petData.neutered);
        }
    }, [petData]);
    useEffect(() => {
        const options = category?.map((item) => ({
            value: item.CategoryId,
            label: item.name,
        }));
        setCategories(options);
    }, [category]);

    useEffect(() => {
        if (petData.categoryId && categories?.length) {
            const categoryOption = categories.find(
                (cat) => cat.value === petData.categoryId
            );
            setSelectedOption(categoryOption);
        }
    }, [petData.categoryId, categories]);

    const { register, handleSubmit } = useForm();

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }
    const handleAddPet = async (data) => {
        const petName = data.petName;
        const petAge = data.petAge;
        const petCategory = selectedOption.label;
        const petCategoryId = selectedOption.value;
        const petLocation = data.petLocation;
        const petShortDescription = data.petShortDescription;
        const petLongDescription = data.petLongDescription;
        const urgentCheck = Boolean(data.urgencyStatus);
        const vaccinationCheck = Boolean(data.vaccinationStatus);
        const neuteredCheck = Boolean(data.neurationStatus);
        const adoptedStatus = Boolean(adoptionStatus)
        const postedBy = {
            name: user?.displayName,
            email: user?.email,
            phone: "",
            postedTime: new Date().toISOString(),
        };

        const newPetData = {
            name: petName,
            age: petAge,
            category: petCategory,
            categoryId: petCategoryId,
            image: selectedFile || petData?.image,
            location: petLocation,
            shortDescription: petShortDescription,
            longDescription: petLongDescription,
            adopted: Boolean(adoptedStatus),
            postedBy: postedBy,
            postedDate: new Date().toISOString(),
            interactionCount: 0,
            adoptionUrgency: urgentCheck,
            vaccinated: vaccinationCheck,
            neutered: neuteredCheck,
            featuredStatus: false,
        };

        if (selectedFile !== null) {
            console.log("inside");
            axios
                .post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_api}`,
                    { image: data.petPicture[0] },
                    {
                        headers: {
                            "content-type": "multipart/form-data",
                        },
                    }
                )
                .then((res) => {
                    newPetData.image = res.data?.data?.display_url;
                    axiosPublic.patch(`edit-pet?id=${id}`, newPetData).then(() => {
                        toast({
                            title: "Successful!",
                            description: "Pet Updated Successfully!",
                        });
                    });
                });
        }
        else {
            console.log("outside");
            axiosPublic.patch(`edit-pet?id=${id}`, newPetData)
                .then(() => toast({
                    title: "Successful!",
                    description: "Pet Updated Successfully!",
                }))
        }

    };

    return (
        <div>
            <Helmet>
                <title>Pranighor | Update {petData?.name}</title>
            </Helmet>
            <h1 className="text-2xl font-bold text-center">Update {petData?.name}</h1>
            <hr />
            {petLoading ? (
                <></>
            ) : (
                <>
                    <div className="flex py-4 gap-6">
                        <form
                            onSubmit={handleSubmit(handleAddPet)}
                            className="flex-1 flex flex-col border border-gray-100 rounded-lg p-4 space-y-4"
                        >
                            <h1 className="text-2xl font-bold inline-flex items-center gap-2">
                                <MdOutlinePets />
                                Pet Info
                            </h1>
                            <div>
                                <img
                                    className="h-32 w-32 rounded-lg object-cover"
                                    src={petData.image}
                                    alt=""
                                />
                            </div>
                            <div className="space-y-4">
                                <Label htmlFor="picture">Pet Picture</Label>
                                <Input {...register("petPicture")} onChange={handleFileChange} id="picture" type="file" />
                            </div>
                            <div className="space-y-4">
                                <Label htmlFor="petName">Pet Name</Label>
                                <Input
                                    {...register("petName")}
                                    defaultValue={petData.name}
                                    id="petName"
                                    type="text"
                                />
                            </div>
                            <div className="space-y-4">
                                <Label htmlFor="Age">Pet Age</Label>
                                <Input
                                    {...register("petAge")}
                                    id="petAge"
                                    defaultValue={petData.age}
                                    type="text"
                                />
                            </div>
                            <div className="space-y-4">
                                <Label htmlFor="petCategory">Pet Category</Label>
                                <Select
                                    value={selectedOption}
                                    onChange={setSelectedOption}
                                    options={categories}
                                />
                            </div>
                            <div className="space-y-4">
                                <Label>Pet Location</Label>
                                <Input
                                    {...register("petLocation")}
                                    defaultValue={petData.location}
                                    type="text"
                                />
                            </div>
                            <div className="space-y-4">
                                <Label>Pet Adoption Status</Label>
                                <div>
                                    <div className="flex gap-6 items-center w-full">
                                        <div className="flex flex-1 items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                            <input
                                                onChange={() => setAdoptionStatus(true)}
                                                id="bordered-radio-1"
                                                type="radio"
                                                checked={adoptionStatus === true}
                                                value={true}
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
                                                onChange={() => setAdoptionStatus(false)}
                                                value={false}
                                                type="radio"
                                                checked={adoptionStatus === false}
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
                                </div>
                            </div>
                            <div className="space-y-4">
                                <Label>Short Description</Label>
                                <Input
                                    {...register("petShortDescription")}
                                    defaultValue={petData.shortDescription}
                                    type="text"
                                />
                            </div>
                            <div className="space-y-4">
                                <Label htmlFor="longDescription">Long Description</Label>
                                <Textarea
                                    {...register("petLongDescription")}
                                    id="longDescription"
                                    defaultValue={petData.longDescription}
                                />
                            </div>
                            <div className="space-y-4">
                                <Label>Other info</Label>
                                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input
                                                {...register("neurationStatus")}
                                                type="checkbox"
                                                checked={neutered}
                                                onChange={(e) => setNeutered(e.target.checked)}
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
                                                {...register("vaccinationStatus")}
                                                type="checkbox"
                                                checked={vaccinated}
                                                onChange={(e) => setVaccinated(e.target.checked)}
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
                                                {...register("urgencyStatus")}
                                                type="checkbox"
                                                checked={urgent}
                                                onChange={(e) => setUrgent(e.target.checked)}
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
                                <h1 className="text-2xl font-bold inline-flex items-center gap-2">
                                    <FaUser />
                                    User Info
                                </h1>
                                <hr />
                                <p>Name: {user?.displayName}</p>
                                <p>Email: {user?.email}</p>
                                <p>Phone: +880 1643091606</p>
                                <p>
                                    Current Time: <TimeDisplay />
                                </p>
                            </div>
                            <p className="text-red-200 font-light mt-2">
                                * These info will be submitted
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default UpdatePet;

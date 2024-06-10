import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { MdOutlineAttachEmail } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea"
import { useParams } from "react-router-dom"
import { IoPersonCircleOutline } from "react-icons/io5";
import useAxiosPublic from "@/hooks/useAxiosPublic"
import { useQuery } from "@tanstack/react-query"
import { LuCalendarDays } from "react-icons/lu";
import moment from "moment"
import { MdShareLocation } from "react-icons/md";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { FaHeart } from "react-icons/fa"
import { useForm } from "react-hook-form";
import UseAuth from "@/hooks/useAuth";
export default function PetDetails() {
    const { user } = UseAuth()
    const petId = useParams()
    const axiosPublic = useAxiosPublic()
    const { register, handleSubmit } = useForm();

    const { isPending, error, data: pet } = useQuery({
        queryKey: [`petDetails/${petId.id}`],
        queryFn: async () =>
            await axiosPublic.get(`pet-details/${petId.id}`).then((res) => { return res.data })
    })
    const handleAdoption = data => {
        const requestorName = user?.displayName
        const requestorEmail = user?.email
        const requestorPhone = data?.phone
        const requestorAddress = data?.address
        const requestorInfo = {
            postInfo: {
                petId: pet?._id,
                petName: pet?.name,
                petCategory: pet?.category
            },
            requestorInfo: {
                requestorName,
                requestorEmail,
                requestorPhone,
                requestorAddress,
            },
            authorInfo: {
                authorName: pet?.postedBy.name,
                authorEmail: pet?.postedBy.email
            }
        }
        axiosPublic.post(`adoption-requests`, requestorInfo)
            .then(res => console.log(res.data))
    }
    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
                <div className="relative rounded-2xl overflow-hidden">
                    <img src={pet?.image} alt={pet?.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 lg:bottom-8 lg:left-8 text-white">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{pet?.name}</h1>
                        <p className="text-sm md:text-base lg:text-lg font-medium">{pet?.shortDescription}</p>
                    </div>
                </div>
                <div className="space-y-8 md:space-y-10 lg:space-y-12">
                    <div className="space-y-4 md:space-y-5 lg:space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">About {pet?.name}</h2>
                            <h1 className="text-2xl font-bold inline-flex gap-2 items-center text-orange-400"><FaHeart /> {pet?.interactionCount}</h1>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl">
                            {pet?.longDescription}
                        </p>
                        <div className="flex flex-col gap-2">
                            <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl inline-flex gap-2 items-center"><LuCalendarDays /> {moment(pet?.postedBy?.postedTime).format('MMMM Do YYYY')}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl inline-flex gap-2 items-center"><MdShareLocation /> {pet?.location}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl inline-flex gap-2 items-center"><HiOutlineStatusOnline /> {pet?.adopted ? "Adopted": "Not Adopted"}</p>
                        </div>
                        <div className="flex flex-col border rounded-lg p-4 space-y-4">
                            <h1 className="text-base md:text-lg lg:text-xl font-semibold">Post Author Info:</h1>
                            <hr />
                            <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl inline-flex gap-2 items-center"><IoPersonCircleOutline /> {pet?.postedBy?.name}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl inline-flex gap-2 items-center"><MdOutlineAttachEmail /> {pet?.postedBy?.email}</p>
                        </div>

                    </div>
                    <div className="space-y-4 md:space-y-5 lg:space-y-6">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Details</h2>
                        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl">Age:</p>
                                <p className="text-base md:text-lg lg:text-xl">{pet?.age}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl">Neutered:</p>
                                <p className="text-base md:text-lg lg:text-xl">{pet?.neutered ? "Yes" : "No"}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl">Vaccinated:</p>
                                <p className="text-base md:text-lg lg:text-xl">{pet?.vaccinated ? "Yes" : "No"}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl">Urgent:</p>
                                <p className="text-base md:text-lg lg:text-xl">{pet?.adoptionUrgency ? "Yes" : "No"}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    size="lg"
                                    className=" dark:bg-black dark:text-white"
                                >
                                    Adopt {pet?.name}
                                </Button>
                            </DialogTrigger>
                            <DialogContent className={'font-primary'}>
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold text-center  ">Adopt {pet?.name}</DialogTitle>
                                    <DialogDescription className="font-semibold text-md text-center">Fill out the form below to adopt {pet?.name}.</DialogDescription>
                                </DialogHeader>
                                <hr />
                                <form onSubmit={handleSubmit(handleAdoption)} className="grid gap-4 md:gap-6 border rounded-lg p-4">
                                    <div className="flex gap-4 items-center border rounded-lg p-4 shadow-md">
                                        <img src={pet?.image} alt={pet?.name} className="w-24 h-24 rounded-xl object-cover" />
                                        <div className="space-y-1">
                                            <h1 className="text-xl font-bold">{pet?.name}</h1>
                                            <h1 className="text-sm font-medium text-gray-400">#{pet?._id}</h1>
                                            <p className="font-medium text-gray-400">{pet?.shortDescription}</p>
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="name" className="text-base md:text-lg lg:text-xl">
                                            Name
                                        </Label>
                                        <Input
                                            id="name"
                                            defaultValue={user?.displayName}
                                            disabled
                                            className="bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-base md:text-lg lg:text-xl"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email" className="text-base md:text-lg lg:text-xl">
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            defaultValue={user?.email}
                                            disabled
                                            className="bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-base md:text-lg lg:text-xl"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="phone" className="text-base md:text-lg lg:text-xl">
                                            Phone
                                        </Label>
                                        <Input
                                            {...register('phone')}
                                            id="phone"
                                            placeholder="Enter your phone number"
                                            className="border-gray-200 dark:border-gray-700 text-base md:text-lg lg:text-xl"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="address" className="text-base md:text-lg lg:text-xl">
                                            Address
                                        </Label>
                                        <Textarea
                                            {...register('address')}
                                            id="address"
                                            placeholder="Enter your address"
                                            className="border-gray-200 dark:border-gray-700 text-base md:text-lg lg:text-xl"
                                        />
                                    </div>
                                    <DialogFooter>
                                        <Button
                                            type="submit"
                                            className="dark:bg-black dark:text-white"
                                        >
                                            Submit Request
                                        </Button>
                                    </DialogFooter>
                                </form>

                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    )
}
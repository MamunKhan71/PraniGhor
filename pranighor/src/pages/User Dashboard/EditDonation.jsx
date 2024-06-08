import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import useAxiosPublic from "@/hooks/useAxiosPublic"
import { useForm } from "react-hook-form"
import { FaUser } from "react-icons/fa"
import UseAuth from "@/hooks/useAuth"
import TimeDisplay from "@/components/ui/time-display"
import Select from 'react-select';
import { useEffect, useState } from "react"
import { DatePicker } from "@/components/ui/date-picker"
import axios from "axios"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
const options = [
    { value: 'adoption', label: 'Adoption & Rescue' },
    { value: 'wellbeing', label: 'campaign Wellbeing' },
    { value: 'ownership', label: 'Responsible Ownership' },
    { value: 'products', label: 'campaign Products' },
    { value: 'services', label: 'campaign Services' },
    { value: 'lifestyle', label: 'campaign Lifestyle' },
    { value: 'entertainment', label: 'campaign Entertainment' },
];

export default function EditDonation() {
    const id = useParams()
    const { data, isLoading } = useQuery({
        queryKey: ['editCampaign'],
        queryFn: async () => await axiosPublic.get(`edit-campaign/${id.id}`).then(res => { return res.data })
    })
    const [selectedOption, setSelectedOption] = useState(null);
    const [date, setDate] = useState(data?.campDeadline)
    const [selectedFile, setSelectedFile] = useState(null)
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }
    useEffect(() => {
        setDate(data?.campDeadline)
        const initialOption = options.find(option => option.value === data?.campaignCategory.value);
        setSelectedOption(initialOption);
    }, [data, isLoading])
    const { user } = UseAuth()
    const axiosPublic = useAxiosPublic()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const handleEditCampaign = newData => {
        const campaignName = newData.campaignName
        const maxDonation = parseFloat(newData.maxDonation)
        const campDeadline = date
        const shortDescription = newData.shortDescription
        const longDescription = newData.longDescription
        const newCampaign = {
            campaignName,
            campaignImage: selectedFile || data?.campaignImage,
            campDeadline: new Date(campDeadline).toISOString(),
            maxDonation,
            campaignCategory: selectedOption,
            shortDescription,
            longDescription,
        }
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
        else {
            axiosPublic.patch(`edit-campaign?id=${id.id}`, newCampaign)
                .then(res => console.log(res.data))
        }



    }
    return (
        <>
            {
                isLoading ? <></> : <>
                    <div className="flex gap-6 w-full">
                        <Card>
                            <CardHeader className="text-center">
                                <CardTitle>Edit Donation Campaign</CardTitle>
                                <CardDescription>Help pets in need by creating a donation campaign.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit(handleEditCampaign)} className="grid gap-4">
                                    <div className="rounded-lg flex items-center justify-center border p-4 shadow-lg">
                                        <img className="h-24 w-24 object-cover rounded-lg" src={data?.campaignImage} alt="" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label >Campaign Name</Label>
                                            <Input {...register('campaignName')} type="text" defaultValue={data?.campaignName} accept="image/*" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="max-donation">Maximum Donation</Label>
                                            <Input
                                                {...register('maxDonation')}
                                                id="max-donation"
                                                type="number"
                                                defaultValue={data?.maxDonation}
                                                placeholder="Enter maximum donation amount"
                                            />
                                        </div>
                                        <div className="space-y-2 w-full">
                                            <Label htmlFor="campaign-image">Campaign Picture</Label>
                                            <Input {...register('image')} onChange={handleFileChange} id="campaign-image" type="file" accept="image/*" />
                                        </div>
                                        <div className="space-y-2 w-full">
                                            <Label htmlFor="campaign-image">Campaign Deadline</Label>
                                            <DatePicker setDate={setDate} date={date} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="short-description">Short Description</Label>
                                            <Input
                                                {...register('shortDescription')}
                                                id="short-description"
                                                type="text"
                                                defaultValue={data?.shortDescription}
                                                placeholder="Enter a brief description"
                                            />
                                        </div>
                                        <div className="space-y-2 w-full">
                                            <Label>Campaign Category</Label>
                                            <Select
                                                styles={{
                                                    control: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        borderColor: state.isFocused ? 'border-gray-200' : 'border-gray-300',
                                                    }),
                                                }}
                                                defaultValue={selectedOption?.label}
                                                onChange={setSelectedOption}
                                                options={options}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="long-description">Long Description</Label>
                                        <Textarea
                                            {...register('longDescription')}
                                            id="long-description"
                                            defaultValue={data?.longDescription}
                                            placeholder="Enter a detailed description"
                                        />
                                    </div>
                                    <Button type="submit">Create Campaign</Button>
                                </form>
                            </CardContent>
                        </Card>
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
            }
        </>
    )
}
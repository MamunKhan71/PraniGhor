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
import { useState } from "react"
import { DatePicker } from "@/components/ui/date-picker"
import axios from "axios"
import { ErrorMessage } from "@hookform/error-message"
import { toast } from "@/components/ui/use-toast"
import useAxiosSecure from "@/hooks/useAxiosSecure"
const options = [
  { value: 'adoption', label: 'Adoption & Rescue' },
  { value: 'wellbeing', label: 'campaign Wellbeing' },
  { value: 'ownership', label: 'Responsible Ownership' },
  { value: 'products', label: 'campaign Products' },
  { value: 'services', label: 'campaign Services' },
  { value: 'lifestyle', label: 'campaign Lifestyle' },
  { value: 'entertainment', label: 'campaign Entertainment' },
];

export default function CreateDonationCampaign() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [date, setDate] = useState()
  const { user } = UseAuth()
  const axiosSecure = useAxiosSecure()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const handleAddCampaign = data => {
    const campaignName = data.campaignName
    const maxDonation = parseFloat(data.maxDonation)
    const campDeadline = date
    const shortDescription = data.shortDescription
    const longDescription = data.longDescription
    const newCampaign = {
      campaignName,
      campaignImage: null,
      campDeadline,
      raisedMoney: 0,
      maxDonation,
      campaignCategory: selectedOption,
      shortDescription,
      longDescription,
      authorInfo: {
        name: user?.displayName,
        email: user?.email
      },
      creationTime: new Date().toISOString()
    }

    axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_api}`, { image: data.image[0] }, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
      .then((res) => {
        newCampaign.campaignImage = (res.data?.data?.display_url)

      })
      .then(() => {
        axiosSecure.post(`/create-campaign?email=${user?.email}`, newCampaign)
          .then(() => toast({
            title: "Successful!",
            description: "Campaign created Successfully!",
          }))
      })


  }
  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Create Donation Campaign</CardTitle>
          <CardDescription>Help pets in need by creating a donation campaign.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleAddCampaign)} className="grid gap-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2 w-full">
                <Label htmlFor="campaign-image">Campaign Picture</Label>
                <Input
                  {...register('image', { required: 'Campaign picture is required' })}
                  id="campaign-image"
                  type="file"
                  accept="image/*"
                />
                <ErrorMessage errors={errors} name="image" as="p" className="text-red-600 text-sm" />
              </div>
              <div className="space-y-2">
                <Label>Campaign Name</Label>
                <Input
                  {...register('campaignName', { required: '* This field is required' })}
                  type="text"
                />
                <ErrorMessage errors={errors} name="campaignName" as="p" className="text-red-600 text-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-donation">Maximum Donation $</Label>
                <Input
                  {...register('maxDonation', { required: '* This field is required' })}
                  id="max-donation"
                  type="number"
                  placeholder="Enter maximum donation amount"
                />
                <ErrorMessage errors={errors} name="maxDonation" as="p" className="text-red-600 text-sm" />
              </div>

              <div className="space-y-2 w-full">
                <Label>Campaign Deadline</Label>
                <DatePicker setDate={setDate} date={date} />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="short-description">Short Description</Label>
                <Input
                  {...register('shortDescription', { required: '* Short description is required' })}
                  id="short-description"
                  type="text"
                  placeholder="Enter a brief description"
                />
                <ErrorMessage errors={errors} name="shortDescription" as="p" className="text-red-600 text-sm" />
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="campaign-image">Campaign Category</Label>
                <Select
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: state.isFocused ? 'border-gray-200' : 'border-gray-300',
                    }),
                  }}
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="long-description">Long Description</Label>
              <Textarea
                {...register('longDescription', { required: '* Long description is required' })}
                id="long-description"
                placeholder="Enter a detailed description"
              />
              <ErrorMessage errors={errors} name="longDescription" as="p" className="text-red-600 text-sm" />
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
  )
}
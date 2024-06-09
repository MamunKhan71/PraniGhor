import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Lottie from "lottie-react"
import cards from '/src/assets/lottie/card.json'
import PaymentCard from "@/components/ui/payment-card"
import { Link, useParams } from "react-router-dom"
import useAxiosPublic from "@/hooks/useAxiosPublic"
import { useQuery } from "@tanstack/react-query"
export default function DonationDetails() {
    const campaignId = useParams()
    const axiosPublic = useAxiosPublic()
    const { data, isPending } = useQuery({
        queryKey: [`${campaignId.id}`],
        queryFn: async () => await axiosPublic.get(`campaigns/${campaignId.id}`).then(res => { return res.data })
    })
    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 space-y-4">
                        <div className="space-y-4">
                            <div className="space-y-4">
                                <img src={data?.actualData?.campaignImage} alt="Campaign Image" className="rounded-lg h-80 w-full object-cover" />
                                <div className="space-y-3">
                                    <h2 className="text-xl font-bold">{data?.actualData?.campaignName}</h2>
                                    <p className="text-gray-500 dark:text-gray-400">{data?.actualData?.shortDescription}</p>
                                    <p className="text-gray-500 dark:text-gray-400">{data?.actualData?.campaignCategory?.label}</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">Raised so far</p>
                                <p className="text-2xl font-bold">${data?.actualData?.raisedMoney}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">Goal</p>
                                <p className="text-2xl font-bold">${data?.actualData?.maxDonation}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Donation Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-4 items-center justify-between dark:bg-black dark:text-white p-4 rounded-lg">
                                <div className="h-12 w-12">
                                    <img className="w-full h-full rounded-lg object-cover" src="header1.jpg" alt="" />
                                </div>
                                <div className="text-xl flex justify-between items-center font-semibold w-full">
                                    <h3>Md. Mamun</h3>
                                    <h3>$3000</h3>
                                </div>
                            </div>
                        </CardContent>
                        <CardContent>
                            <div className="flex gap-4 items-center justify-between dark:bg-black dark:text-white p-4 rounded-lg">
                                <div className="h-12 w-12">
                                    <img className="w-full h-full rounded-lg object-cover" src="header1.jpg" alt="" />
                                </div>
                                <div className="text-xl flex justify-between items-center font-semibold w-full">
                                    <h3>Md. Mamun</h3>
                                    <h3>$500</h3>
                                </div>
                            </div>
                        </CardContent>
                        <CardContent>
                            <div className="flex gap-4 items-center justify-between dark:bg-black dark:text-white p-4 rounded-lg">
                                <div className="h-12 w-12">
                                    <img className="w-full h-full rounded-lg object-cover" src="header1.jpg" alt="" />
                                </div>
                                <div className="text-xl flex justify-between items-center font-semibold w-full">
                                    <h3>Md. Rakib</h3>
                                    <h3>$2000</h3>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full dark:bg-black dark:text-white">Donate Now</Button>
                        </DialogTrigger>
                        <DialogContent >
                            <DialogHeader>
                                <Lottie animationData={cards}></Lottie>
                                <div className="text-center space-y-4">
                                    <DialogTitle className="text-2xl">Donate to Rebuild After Disaster</DialogTitle>
                                    <DialogDescription>
                                        Enter your donation amount and payment details to complete your contribution.
                                    </DialogDescription>
                                    <DialogTitle>
                                        <div className="flex items-center gap-2">
                                            <label htmlFor="amount" className="text-2xl font-bold">$</label>
                                            <input type="number" className="w-full text-2xl font-bold bg-gray-50 p-2 rounded-lg border" placeholder="Your Donation Amount" />
                                        </div>
                                    </DialogTitle>
                                </div>
                            </DialogHeader>
                            <div>
                                <PaymentCard />
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Recommended Donations</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {
                        data?.recommendedData?.map(data => (
                            <>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{data?.campaignName}</CardTitle>
                                        <CardDescription>{data?.shortDescription}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-gray-500 dark:text-gray-400">Raised so far</p>
                                                <p className="text-2xl font-bold">${data?.raisedMoney}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 dark:text-gray-400">Goal</p>
                                                <p className="text-2xl font-bold">${data?.maxDonation}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Link to={`/campaign-details/${data?._id}`}><Button className="dark:bg-black dark:text-white">Donate Now</Button></Link>
                                    </CardFooter>
                                </Card>
                            </>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}
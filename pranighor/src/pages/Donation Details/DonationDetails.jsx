import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Lottie from "lottie-react"
import cards from '/src/assets/lottie/card.json'
import PaymentCard from "@/components/ui/payment-card"
export default function DonationDetails() {
    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 space-y-4">
                        <div className="space-y-4">
                            <div className="space-y-4">
                                <img src="header1.jpg" alt="Campaign Image" className="rounded-lg" />
                                <div className="space-y-3">
                                    <h2 className="text-xl font-bold">Rebuild After Disaster</h2>
                                    <p className="text-gray-500 dark:text-gray-400">Help us rebuild after the recent hurricane.</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">Raised so far</p>
                                <p className="text-2xl font-bold">$15,000</p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">Goal</p>
                                <p className="text-2xl font-bold">$50,000</p>
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
                            <div className="flex gap-4 items-center justify-between bg-gray-50 p-4 rounded-lg">
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
                            <div className="flex gap-4 items-center justify-between bg-gray-50 p-4 rounded-lg">
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
                            <div className="flex gap-4 items-center justify-between bg-gray-50 p-4 rounded-lg">
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
                            <Button className="w-full">Donate Now</Button>
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
                    <Card>
                        <CardHeader>
                            <CardTitle>Help Feed the Homeless</CardTitle>
                            <CardDescription>Provide meals and shelter for those in need.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">Raised so far</p>
                                    <p className="text-2xl font-bold">$8,500</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">Goal</p>
                                    <p className="text-2xl font-bold">$15,000</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button size="sm">Donate Now</Button>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Support Animal Rescue</CardTitle>
                            <CardDescription>Help us rescue and care for abandoned animals.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">Raised so far</p>
                                    <p className="text-2xl font-bold">$12,000</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">Goal</p>
                                    <p className="text-2xl font-bold">$20,000</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button size="sm">Donate Now</Button>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Provide Clean Water</CardTitle>
                            <CardDescription>Help us bring clean water to communities in need.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">Raised so far</p>
                                    <p className="text-2xl font-bold">$18,000</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">Goal</p>
                                    <p className="text-2xl font-bold">$25,000</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button size="sm">Donate Now</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
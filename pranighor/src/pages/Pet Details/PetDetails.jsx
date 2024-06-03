import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function PetDetails() {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
                <div className="relative rounded-2xl overflow-hidden">
                    <img src="header1.jpg" alt="Pet Image" className="w-full h-auto object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 lg:bottom-8 lg:left-8 text-white">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Buddy the Golden Retriever</h1>
                        <p className="text-sm md:text-base lg:text-lg font-medium">ID: #12345</p>
                    </div>
                </div>
                <div className="space-y-8 md:space-y-10 lg:space-y-12">
                    <div className="space-y-4 md:space-y-5 lg:space-y-6">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">About Buddy</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl">
                            Buddy is a 3-year-old Golden Retriever who loves to play fetch and go on long walks. He's great with kids
                            and other pets, and is house-trained and up-to-date on all his vaccinations.
                        </p>
                    </div>
                    <div className="space-y-4 md:space-y-5 lg:space-y-6">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Details</h2>
                        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl">Age:</p>
                                <p className="text-base md:text-lg lg:text-xl">3 years</p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl">Breed:</p>
                                <p className="text-base md:text-lg lg:text-xl">Golden Retriever</p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl">Gender:</p>
                                <p className="text-base md:text-lg lg:text-xl">Male</p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl">Size:</p>
                                <p className="text-base md:text-lg lg:text-xl">Large</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    size="lg"
                                    className="bg-primary text-white hover:bg-primary-500 focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                                >
                                    Adopt Buddy
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Adopt Buddy</DialogTitle>
                                    <DialogDescription>Fill out the form below to adopt Buddy.</DialogDescription>
                                </DialogHeader>
                                <form className="grid gap-4 md:gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name" className="text-base md:text-lg lg:text-xl">
                                            Name
                                        </Label>
                                        <Input
                                            id="name"
                                            defaultValue="John Doe"
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
                                            defaultValue="john@example.com"
                                            disabled
                                            className="bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-base md:text-lg lg:text-xl"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="phone" className="text-base md:text-lg lg:text-xl">
                                            Phone
                                        </Label>
                                        <Input
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
                                            id="address"
                                            placeholder="Enter your address"
                                            className="border-gray-200 dark:border-gray-700 text-base md:text-lg lg:text-xl"
                                        />
                                    </div>
                                </form>
                                <DialogFooter>
                                    <Button
                                        type="submit"
                                        className="bg-primary text-white hover:bg-primary-500 focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                                    >
                                        Submit
                                    </Button>
                                    <div>
                                        <Button
                                            variant="outline"
                                            className="border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    )
}
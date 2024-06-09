import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"

export default function About() {
    return (
        <section>
            <div>
                <div className="space-y-8 text-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-50">
                            About PraniGhor
                        </h2>
                        <p className="text-lg text-gray-600 md:text-xl dark:text-gray-400 max-w-4xl mx-auto">
                            At PraniGhor, we are dedicated to rescuing and caring for abandoned and neglected pets. Our mission is to
                            provide a safe and loving environment for these animals, and to find them forever homes with compassionate
                            families. Join us in our mission to make a difference in the lives of these deserving creatures.
                        </p>
                    </div>
                    <div className="flex gap-6">
                        <div className="flex-1">
                            <img
                                src="header1.jpg"
                                className="rounded-lg shadow-lg h-auto"
                            />
                        </div>
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6 w-full">
                            <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <CardContent className="p-6 flex flex-col items-center justify-center">
                                    <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                                        <PawPrintIcon className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold mt-4 text-gray-900 dark:text-gray-50">500+</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Pets Rescued</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <CardContent className="p-6 flex flex-col items-center justify-center">
                                    <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                                        <HeartIcon className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold mt-4 text-gray-900 dark:text-gray-50">95%</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Adoption Rate</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <CardContent className="p-6 flex flex-col items-center justify-center">
                                    <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                                        <SmileIcon className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold mt-4 text-gray-900 dark:text-gray-50">10+</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Years of Service</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <CardContent className="p-6 flex flex-col items-center justify-center">
                                    <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                                        <VoteIcon className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold mt-4 text-gray-900 dark:text-gray-50">100+</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Volunteers</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div> 
                </div>
            </div>
        </section>
    )
}

function HeartIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    )
}


function PawPrintIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="4" r="2" />
            <circle cx="18" cy="8" r="2" />
            <circle cx="20" cy="16" r="2" />
            <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
        </svg>
    )
}


function SmileIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" x2="9.01" y1="9" y2="9" />
            <line x1="15" x2="15.01" y1="9" y2="9" />
        </svg>
    )
}


function VoteIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 12 2 2 4-4" />
            <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z" />
            <path d="M22 19H2" />
        </svg>
    )
}
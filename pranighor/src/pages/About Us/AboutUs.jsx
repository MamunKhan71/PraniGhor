
export default function AboutUs() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32  dark:bg-gray-800">
            <div className="container grid items-center justify-center gap-4 px-4 space-y-16 text-center md:px-6">
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">About PraniGhor</h2>
                    <p className="mx-auto max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                        Pranighor is a platform designed to simplify the pet adoption process, connecting loving families with their
                        perfect furry companions. With our automated matching system, built-in support, and integrated adoption
                        tools, we provide the complete solution for finding your new best friend.
                    </p>
                </div>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
                    <div className="w-full">
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <PuzzleIcon className="w-12 h-12 text-primary" />
                            <h3 className="text-2xl font-bold">Personalized Matches</h3>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Our advanced algorithm analyzes your preferences and lifestyle to find the perfect pet match, ensuring a
                            harmonious and lasting companionship.
                        </p>
                    </div>
                    <div>
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <UsersIcon className="w-12 h-12 text-primary" />
                            <h3 className="text-2xl font-bold">Adoption Support</h3>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Our dedicated team is here to guide you through every step of the adoption process, providing resources,
                            advice, and emotional support to make your new addition feel right at home.
                        </p>
                    </div>
                    <div>
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <LaptopIcon className="w-12 h-12 text-primary" />
                            <h3 className="text-2xl font-bold">Seamless Experience</h3>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            With our user-friendly platform, you can easily browse adoptable pets, submit applications, and manage the
                            entire adoption journey from the comfort of your own home.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

function LaptopIcon(props) {
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
            <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
        </svg>
    )
}


function PuzzleIcon(props) {
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
            <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z" />
        </svg>
    )
}


function UsersIcon(props) {
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
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )
}
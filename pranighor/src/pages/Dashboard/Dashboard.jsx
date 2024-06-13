import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { FaMoneyBill, FaPaw, FaUser } from "react-icons/fa"
import UseAuth from "@/hooks/useAuth"
import { useEffect, useState } from "react"
import useAdmin from "@/hooks/useAdmin"
import { Helmet } from "react-helmet"

export default function Dashboard() {
    const { user, userSignOut } = UseAuth()
    const [isAdmin, isAdminLoading] = useAdmin()
    const navigate = useNavigate()
    return (
        <div className="lg:grid lg:min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <div className="border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                <div className="flex h-full lg:max-h-screen flex-col gap-2">
                    <div className="flex h-[60px] items-center border-b px-6">
                        <NavLink to={'/'} className="flex items-center gap-2 font-semibold" prefetch={false} >
                            <PawPrintIcon className="h-6 w-6" />
                            <span className="">PraniGhor</span>
                        </NavLink>
                        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                            <BellIcon className="h-4 w-4" />
                            <span className="sr-only">Toggle notifications</span>
                        </Button>
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        {
                            !isAdminLoading && <>
                                {
                                    !isAdmin ? <nav className="grid items-start px-4 text-sm font-medium space-y-3">
                                        <NavLink
                                            to={'add-pet'}
                                            className={({ isActive }) =>
                                                `${isActive ? "active bg-gray-100 " : ""}flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50`
                                            }
                                            prefetch={false}
                                        >
                                            <PlusIcon className="h-4 w-4" />
                                            Add a Pet
                                        </NavLink>
                                        <NavLink
                                            to={'my-pets'}
                                            className={({ isActive }) =>
                                                `${isActive ? "active bg-gray-100 " : ""}flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50`
                                            }
                                            prefetch={false}
                                        >
                                            <PackageIcon className="h-4 w-4" />
                                            My Added Pets
                                        </NavLink>
                                        <NavLink
                                            to={'adoption-requests'}
                                            className={({ isActive }) =>
                                                `${isActive ? "active bg-gray-100 " : ""}flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50`
                                            }
                                            prefetch={false}
                                        >
                                            <UsersIcon className="h-4 w-4" />
                                            Adoption Requests
                                        </NavLink>
                                        <NavLink
                                            to={'donation-campaign'}
                                            className={({ isActive }) =>
                                                `${isActive ? "active bg-gray-100 " : ""}flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50`
                                            }
                                            prefetch={false}
                                        >
                                            <DollarSignIcon className="h-4 w-4" />
                                            Create Donation Campaign
                                        </NavLink>
                                        <NavLink
                                            to={'my-donations'}
                                            className={({ isActive }) =>
                                                `${isActive ? "active bg-gray-100 " : ""}flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50`
                                            }
                                            prefetch={false}
                                        >
                                            <WalletIcon className="h-4 w-4" />
                                            My Donations
                                        </NavLink>
                                        <NavLink
                                            to={'my-campaigns'}
                                            className={({ isActive }) =>
                                                `${isActive ? "active bg-gray-100 " : ""}flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50`
                                            }
                                            prefetch={false}
                                        >
                                            <ClipboardIcon className="h-4 w-4" />
                                            My Campaigns
                                        </NavLink>
                                    </nav> :
                                        <nav className="grid items-start px-4 text-sm font-medium space-y-3">
                                            <hr />
                                            <h1>General Routes</h1>
                                            <hr />
                                            <NavLink
                                                to={'add-pet'}
                                                className={({ isActive }) =>
                                                    `${isActive ? "active bg-gray-100 " : ""}flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50`
                                                }
                                                prefetch={false}
                                            >
                                                <PlusIcon className="h-4 w-4" />
                                                Add a Pet
                                            </NavLink>
                                            <NavLink
                                                to={'my-pets'}
                                                className={({ isActive }) =>
                                                    `${isActive ? "active bg-gray-100 " : ""}flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50`
                                                }
                                                prefetch={false}
                                            >
                                                <PackageIcon className="h-4 w-4" />
                                                My Added Pets
                                            </NavLink>
                                            <NavLink
                                                to={'adoption-requests'}
                                                className={({ isActive }) =>
                                                    `${isActive ? "active bg-gray-100 " : ""}flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50`
                                                }
                                                prefetch={false}
                                            >
                                                <UsersIcon className="h-4 w-4" />
                                                Adoption Requests
                                            </NavLink>
                                            <NavLink
                                                to={'donation-campaign'}
                                                className={({ isActive }) =>
                                                    `${isActive ? "active bg-gray-100 " : ""}flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50`
                                                }
                                                prefetch={false}
                                            >
                                                <DollarSignIcon className="h-4 w-4" />
                                                Create Donation Campaign
                                            </NavLink>
                                            <NavLink
                                                to={'my-donations'}
                                                className={({ isActive }) =>
                                                    `${isActive ? "active bg-gray-100 " : ""}flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50`
                                                }
                                                prefetch={false}
                                            >
                                                <WalletIcon className="h-4 w-4" />
                                                My Donations
                                            </NavLink>
                                            <NavLink
                                                to={'my-campaigns'}
                                                className={({ isActive }) =>
                                                    `${isActive ? "active bg-gray-100 " : ""}flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50`
                                                }
                                                prefetch={false}
                                            >
                                                <ClipboardIcon className="h-4 w-4" />
                                                My Campaigns
                                            </NavLink>
                                            <hr />
                                            <h1>Admin Routes</h1>
                                            <hr />
                                            <NavLink
                                                to={'users'}
                                                className={({ isActive }) =>
                                                    `${isActive ? "active bg-gray-100 " : ""}flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50`
                                                }
                                                prefetch={false}
                                            >
                                                <FaUser />
                                                Manage Users
                                            </NavLink>
                                            <NavLink
                                                to={'all-pets'}
                                                className={({ isActive }) =>
                                                    `${isActive ? "active bg-gray-100 " : ""}flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50`
                                                }
                                                prefetch={false}
                                            >
                                                <FaPaw />
                                                Manage Pets
                                            </NavLink>
                                            <NavLink
                                                to={'all-campaigns'}
                                                className={({ isActive }) =>
                                                    `${isActive ? "active bg-gray-100 " : ""}flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50`
                                                }
                                                prefetch={false}
                                            >
                                                <FaMoneyBill />
                                                Manage Donations
                                            </NavLink>
                                        </nav>
                                }

                            </>
                        }
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
                    <NavLink href="#" className="lg:hidden" prefetch={false}>
                        <PawPrintIcon className="h-6 w-6" />
                        <span className="sr-only">Home</span>
                    </NavLink>
                    <div className="w-full flex-1">
                        <form>
                            <div className="relative">
                                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <Input
                                    type="search"
                                    placeholder="Search pets..."
                                    className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                                />
                            </div>
                        </form>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full border border-gray-200 h-12 w-12 object-cover dark:border-gray-800"
                            >

                                <img src={`${user?.photoURL || "https://github.com/shadcn.png"}`} width="32" height="32" className="rounded-full h-full w-full object-cover" alt="Avatar" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{user?.displayName}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => {
                                userSignOut()
                                    .then(() => navigate('/'))
                            }}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

function BellIcon(props) {
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
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
    )
}


function ClipboardIcon(props) {
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
            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        </svg>
    )
}


function DollarSignIcon(props) {
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
            <line x1="12" x2="12" y1="2" y2="22" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
    )
}


function PackageIcon(props) {
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
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
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


function PlusIcon(props) {
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
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}


function SearchIcon(props) {
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
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
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


function WalletIcon(props) {
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
            <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
            <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
        </svg>
    )
}
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { SiDatadog } from "react-icons/si";
import { Avatar } from "../../components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { CgLogOut } from "react-icons/cg";
import { TbLayoutDashboard } from "react-icons/tb";
import { HiLogin } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import UseAuth from "@/hooks/useAuth";
import { ModeToggle } from "@/components/ui/toggle";

export default function Navbar() {
  const { user, userSignOut } = UseAuth()
  const navigate = useNavigate()
  const handleUserSignOut = () => {
    userSignOut()
      .then(() => navigate('/'))
  }
  return (
    <header className="flex w-full shrink-0 items-center bg-gray-100 dark:bg-black px-6 py-4 rounded-full mb-8">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <div className="grid gap-2 py-6">
            <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
              Home
            </Link>
            <Link to={'/about-us'} className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
              About
            </Link>
            <Link to={'/all-pets'} className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
              Pet Listings
            </Link>
            <Link to={`/donation`} className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
              Donation Campaign
            </Link>
            {
              user ? <Link prefetch={false} className="group inline-flex h-9 w-max items-center justify-center rounded-full px-4 py-2 text-lg font-medium transition-colors  hover:text-primaryCol focus:bg-primaryCol focus:text-black focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50">
                <DropdownMenu>
                  <DropdownMenuTrigger><Avatar>
                    <AvatarImage className="object-cover h-12 w-12" src={`${user?.photoURL || "https://github.com/shadcn.png"}`} />
                    <AvatarFallback>{user?.displayName}</AvatarFallback>
                  </Avatar></DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Link to={'/dashboard'} className="flex items-center justify-center gap-2 hover:cursor-pointer"><TbLayoutDashboard /> Dashboard</Link></DropdownMenuItem>
                    <DropdownMenuItem><button onClick={handleUserSignOut} className="flex items-center justify-center gap-2">
                      <CgLogOut /> Logout
                    </button></DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

              </Link> : <Link
                to={'/login'}
                className="flex w-full items-center py-2 text-lg font-semibold"
                prefetch={false}
              >
                <div className="flex gap-2 items-center justify-center">Login<HiLogin /></div>
              </Link>
            }
          </div>
        </SheetContent>
      </Sheet>
      <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="ml-auto hidden lg:flex gap-6">
        <Link
          href="#"
          className="group inline-flex h-9 w-max items-center justify-center rounded-full  px-4 py-2 text-lg font-medium transition-colors  hover:text-primaryCol focus:bg-primaryCol focus:text-black focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Home
        </Link>
        <Link
          to={'/about-us'}
          className="group inline-flex h-9 w-max items-center justify-center rounded-full  px-4 py-2 text-lg font-medium transition-colors  hover:text-primaryCol focus:bg-primaryCol focus:text-black focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          About
        </Link>
        <Link
          to={'/all-pets'}
          className="group inline-flex h-9 w-max items-center justify-center rounded-full  px-4 py-2 text-lg font-medium transition-colors  hover:text-primaryCol focus:bg-primaryCol focus:text-black focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Pet Listings
        </Link>
        <Link
          to={`/donation`}
          className="group inline-flex h-9 w-max items-center justify-center rounded-full  px-4 py-2 text-lg font-medium transition-colors  hover:text-primaryCol focus:bg-primaryCol focus:text-black focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Donation Campaign
        </Link>
        <ModeToggle />
        {
          user ? <Link prefetch={false} className="group inline-flex h-9 w-max items-center justify-center rounded-full px-4 py-2 text-lg font-medium transition-colors  hover:text-primaryCol focus:bg-primaryCol focus:text-black focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50">
            <DropdownMenu>
              <DropdownMenuTrigger><Avatar>
                <AvatarImage className="object-cover h-12 w-12" src={`${user?.photoURL || "https://github.com/shadcn.png"}`} />
                <AvatarFallback>{user?.displayName}</AvatarFallback>
              </Avatar></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link to={'/dashboard'} className="flex items-center justify-center gap-2 hover:cursor-pointer"><TbLayoutDashboard /> Dashboard</Link></DropdownMenuItem>
                <DropdownMenuItem><button onClick={handleUserSignOut} className="flex items-center justify-center gap-2">
                  <CgLogOut /> Logout
                </button></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </Link> : <Link
            to={'/login'}
            className="group inline-flex h-9 w-max items-center justify-center rounded-full  px-4 py-2 text-lg font-medium transition-colors  hover:text-primaryCol focus:bg-primaryCol focus:text-black focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            prefetch={false}
          >
            <div className="flex gap-2 items-center justify-center">Login<HiLogin /></div>
          </Link>
        }
      </nav>
    </header>
  )
}

function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MountainIcon() {
  return (
    <div className="flex items-center justify-center text-3xl gap-2">
      <SiDatadog className="text-primaryCol" />
      <h1 className="font-semibold">Prani<span className="text-primaryCol">Ghor</span></h1>
    </div>
  )
}
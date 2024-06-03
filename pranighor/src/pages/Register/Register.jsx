import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { FaGoogle, FaTwitter } from "react-icons/fa"

export default function RegisterForm({ switchToLogin }) {
    return (
        <div className="mx-auto">
            <Card>
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold">Register</CardTitle>
                    <CardDescription>Enter your email below to register to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" type="text" placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="picture">Profile Picture</Label>
                            <Input id="picture" type="file" />
                        </div>
                        <div className="relative space-y-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link href="#" className="ml-auto inline-block text-sm underline" prefetch={false}>
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input id="password" type="password" required />
                            <Button variant="ghost" size="icon" className="absolute bottom-1 right-1 h-7 w-7">
                                <EyeIcon className="h-4 w-4" />
                                <span className="sr-only">Toggle password visibility</span>
                            </Button>
                        </div>
                        <Button type="submit" className="w-full">
                            Register
                        </Button>
                        <div className="flex items-center justify-center gap-4">
                            <Button variant="outline" className="w-full">
                                <FaGoogle />
                            </Button>
                            <Button variant="outline" className="w-full">
                                <FaTwitter />
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?&nbsp;
                        <button onClick={switchToLogin} className="underline">
                            Login
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function EyeIcon(props) {
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
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}
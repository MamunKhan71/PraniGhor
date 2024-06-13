import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FaGoogle, FaTwitter } from "react-icons/fa"
import { useForm } from "react-hook-form"
import UseAuth from "@/hooks/useAuth"
import { ErrorMessage } from "@hookform/error-message"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Helmet } from "react-helmet"

export default function LoginForm({ switchToRegister }) {
    const location = useLocation()
    const navigate = useNavigate()

    const [viewPassword, setViewPassword] = useState(false)
    const { signInUser, handleGoogleAuth, handleTwitterAuth } = UseAuth()
    const { toast } = useToast()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const handleFormSubmit = data => {
        const email = data.email
        const password = data.password
        signInUser(email, password)
            .then(() => localStorage.setItem('isAuth', 'authenticated'))
            .then(() => toast({
                title: "Successful!",
                description: "Login Successful!",
            }))
            .then(() => {
                if (location?.state) {
                    navigate(location.state.from)
                }
                else {
                    navigate('/')
                }
            })
            .catch(() => toast({
                title: "Error!",
                description: "Something went wrong!",
            }))
    }
    const handleGoogleLogin = () => {
        handleGoogleAuth()
            .then(() => localStorage.setItem('isAuth', 'authenticated'))
            .then(() => toast({
                title: "Successful!",
                description: "Login Successful!",
            }))
            .then(() => {
                if (location?.state) {
                    navigate(location.state.from)
                }
                else {
                    navigate('/')
                }
            })
            .catch(() => toast({
                title: "Error!",
                description: "Something went wrong!",
            }))
    }
    const handleTwitterLogin = () => {
        handleTwitterAuth()
            .then(() => localStorage.setItem('isAuth', 'authenticated'))
            .then(() => toast({
                title: "Successful!",
                description: "Login Successful!",
            }))
            .then(() => {
                if (location?.state) {
                    navigate(location.state.from)
                }
                else {
                    navigate('/')
                }
            })
            .catch(() => toast({
                title: "Error!",
                description: "Something went wrong!",
            }))
    }
    return (
        <div className="mx-auto">.
            <Helmet>
                <title>Pranighor | Login</title>
            </Helmet>
            <Card>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                    <CardDescription>Enter your email below to login to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input {...register('email', {
                                    required: "* Email required",
                                })} id="email" type="email" placeholder="m@example.com" />
                                <ErrorMessage
                                    errors={errors}
                                    name="email"
                                    render={({ message }) => (
                                        <span className="text-red-500 text-sm font-primary">{message}</span>
                                    )}
                                />
                            </div>
                            <div className="relative space-y-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link href="#" className="ml-auto inline-block text-sm underline" prefetch={false}>
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input {...register('password', {
                                    required: "* Password required"
                                })} id="password" type={viewPassword ? "text" : "password"} placeholder="your password" />
                                <Button onClick={(e) => { e.preventDefault(); setViewPassword(!viewPassword); }} variant="ghost" size="icon" className="absolute bottom-1 right-1 h-7 w-7">
                                    <EyeIcon className="h-4 w-4" />
                                    <span className="sr-only">Toggle password visibility</span>
                                </Button>

                            </div>
                            <ErrorMessage
                                errors={errors}
                                name="password"
                                render={({ message }) => (
                                    <span className="text-red-500 text-sm font-primary">{message}</span>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </form>
                        <div className="flex items-center justify-center gap-4">
                            <Button onClick={handleGoogleLogin} variant="outline" className="w-full">
                                <FaGoogle />
                            </Button>
                            <Button onClick={handleTwitterLogin} variant="outline" className="w-full">
                                <FaTwitter />
                            </Button>
                        </div>
                    </div>

                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account? &nbsp;
                        <button onClick={switchToRegister} className="underline">
                            Sign up
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
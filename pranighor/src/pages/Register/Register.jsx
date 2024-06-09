import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FaGoogle, FaTwitter } from "react-icons/fa"
import { useForm } from "react-hook-form"
import UseAuth from "@/hooks/useAuth"
import useAxiosPublic from "@/hooks/useAxiosPublic"
import { useToast } from "@/components/ui/use-toast"
import { ErrorMessage } from "@hookform/error-message"
import { useState } from "react"

export default function RegisterForm({ switchToLogin }) {
    const { user, signUpUser, handleGoogleAuth, handleTwitterAuth, userUpdate } = UseAuth()
    const [viewPassword, setViewPassword] = useState(false)
    const { toast } = useToast()
    const axiosPublic = useAxiosPublic()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const handleFormSubmit = data => {
        const userName = data.name
        const userEmail = data.email
        const userPassword = data.password
        const imageFile = { image: data.image[0] }
        const newUser = {
            userName,
            userEmail,
            userPassword,
            role: "admin"
        }
        signUpUser(userEmail, userPassword)
            .then(async () => {
                const res = await axiosPublic.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_api}`, imageFile, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                })
                newUser.userImage = (res.data?.data?.display_url)
            })
            .then(() => {
                const name = userName
                const photo = newUser.userImage
                userUpdate(name, photo)
                    .then(() => {
                        axiosPublic.post('/users', newUser)
                            .then(() => toast({
                                title: "Successful!",
                                description: "Account Created Successfully!",
                            }))
                            .catch(() => toast({
                                title: "Error!",
                                description: "Account Creation Unsuccessful!!",
                            }))
                    })
            })
    }
    const handleGoogleSignUp = () => {
        handleGoogleAuth()
            .then((result) => {
                const newUser = {
                    userName: result.user.displayName,
                    userEmail: result.user.email,
                    userImage: result.user.photoURL,
                    role: "user"
                }
                axiosPublic.post('/users', newUser)
                    .then(() => toast({
                        title: "Successful!",
                        description: "Account Created Successfully!",
                    }))
                    .catch(() => toast({
                        title: "Error!",
                        description: "Account Creation Unsuccessful!!",
                    }))
            })
    }
    const handleTwitterSignUp = () => {
        handleTwitterAuth()
            .then((result) => {
                const newUser = {
                    userName: result.user.displayName,
                    userEmail: result.user.email,
                    userImage: result.user.photoURL,
                    role: "user"
                }
                axiosPublic.post('/users', newUser)
                    .then(() => toast({
                        title: "Successful!",
                        description: "Account Created Successfully!",
                    }))
                    .catch(() => toast({
                        title: "Error!",
                        description: "Account Creation Unsuccessful!!",
                    }))
            })
    }
    return (
        <div className="mx-auto">
            <Card>
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold">Register</CardTitle>
                    <CardDescription>Enter your email below to register to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input {...register('name', {
                                    required: "* Name required"
                                })} id="name" type="text" placeholder="John Doe" />
                                <ErrorMessage
                                    errors={errors}
                                    name="name"
                                    render={({ message }) => (
                                        <span className="text-red-500 text-sm font-primary">{message}</span>
                                    )}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input {...register('email', {
                                    required: "* Email required"
                                })} id="email" type="email" placeholder="m@example.com" />
                                <ErrorMessage
                                    errors={errors}
                                    name="email"
                                    render={({ message }) => {
                                        return <span className="text-red-500 text-sm font-primary">{message}</span>
                                    }}
                                />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="picture">Profile Picture</Label>
                                <Input {...register('image', {
                                    required: "* Please upload your profile picture"
                                })} id="picture" type="file" />
                                <ErrorMessage
                                    errors={errors}
                                    name="image"
                                    render={({ message }) => {
                                        return <span className="text-red-500 text-sm font-primary">{message}</span>
                                    }}
                                />
                            </div>
                            <div className="relative space-y-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input {...register('password', {
                                    required: "This field is required",
                                    pattern: {
                                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
                                        message: "* Password must contain at least 6 characters, including 1 uppercase letter, 1 lowercase letter, and 1 number"
                                    }
                                })} id="password" type={viewPassword ? "text": "password"} />
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
                                Register
                            </Button>
                        </form>
                        <div className="flex items-center justify-center gap-4">
                            <Button onClick={handleGoogleSignUp} variant="outline" className="w-full">
                                <FaGoogle />
                            </Button>
                            <Button onClick={handleTwitterSignUp} variant="outline" className="w-full">
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
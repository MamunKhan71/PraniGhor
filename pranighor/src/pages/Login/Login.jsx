import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import RegisterForm from "../Register/Register";

export default function Login() {
    const [tab, setTab] = useState("login");

    return (
        <div className="flex justify-center w-full mt-40">
            <Tabs value={tab} onValueChange={setTab} className="w-2/5">
                <TabsList className="grid w-full grid-cols-2 items-center justify-center">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <LoginForm switchToRegister={() => setTab('register')} />
                </TabsContent>
                <TabsContent value="register">
                    <RegisterForm switchToLogin={() => setTab("login")} />
                </TabsContent>
            </Tabs>
        </div>
    );
}

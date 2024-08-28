"use client"

import React, { useState, useEffect } from "react";
// import GoogleIcon from '../../public/googleLogo.png';
// import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { registerUser, loginUser } from '../../helper/apiservices/userservice';
import { useUser } from '../../helper/context/usercontext';
import { Button, Input, Checkbox, Link, Divider, Spinner } from "@nextui-org/react";
import { Icon } from "@iconify/react";


export default function LoginPanel() {
    const router = useRouter();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    
    const [loginLoading, setLoginLoading] = useState(false);

    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const { loginUserHandler } = useUser();



    const handleSubmit = async (event) => {
        event.preventDefault();

        loginUserHandler(email, password);

    };

    const handleSignUp = async (event) => {
        router.push('/auth/register');
    };

    return (
        <div>
            <p className="pb-2 text-xl font-medium">Log In</p>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <Input
                    label="Email Address"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    variant="bordered"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    endContent={
                        <button type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <Icon
                                    className="pointer-events-none text-2xl text-default-400"
                                    icon="solar:eye-closed-linear"
                                />
                            ) : (
                                <Icon
                                    className="pointer-events-none text-2xl text-default-400"
                                    icon="solar:eye-bold"
                                />
                            )}
                        </button>
                    }
                    label="Password"
                    name="password"
                    placeholder="Enter your password"
                    type={isVisible ? "text" : "password"}
                    variant="bordered"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex items-center justify-between px-1 py-2">
                    <Checkbox name="remember" size="sm">
                        Remember me
                    </Checkbox>
                    <Link className="text-default-500" href="#" size="sm">
                        Forgot password?
                    </Link>
                </div>
                <Button color="primary" type="submit" >
                    Log In
                    {loginLoading && <Spinner />}
                </Button>
            </form>
            <div className="flex items-center gap-4 py-2">
                <Divider className="flex-1" />
                <p className="shrink-0 text-tiny text-default-500">OR</p>
                <Divider className="flex-1" />
            </div>
            <div className="flex flex-col gap-2">
                <Button
                    startContent={<Icon icon="flat-color-icons:google" width={24} />}
                    variant="bordered"
                >
                    Continue with Google
                </Button>
                <Button
                    startContent={<Icon className="text-default-500" icon="fe:github" width={24} />}
                    variant="bordered"
                >
                    Continue with Github
                </Button>
            </div>
            <p className="text-center text-small">
                Need to create an account?&nbsp;
                <Link href="#" size="sm" onClick={handleSignUp}>
                    Sign Up
                </Link>
            </p>
        </div>

    );



}

"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { registerUser, loginUser } from '../../helper/apiservices/userservice';
import { useUser } from '../../helper/context/usercontext';
import { Button, Input, Checkbox, Link, Divider, Spinner } from "@nextui-org/react";
import { Icon } from "@iconify/react";


export default function RegisterPanel() {
    const router = useRouter();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('')
    const [passwordCopy, setPasswordCopy] = useState('');

    const [isVisible, setIsVisible] = React.useState(false);
    const [isCopyVisible, setIsCopyVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleCopyVisibility = () => setIsCopyVisible(!isCopyVisible);

    const handleLogin = async (event) => {
        router.push('/auth/login');
    };

    const handleRegister = async (event) => {
        console.log("first name", firstName);
        console.log("last name", lastName);
        console.log("email", email);
        console.log("phone number", phoneNumber);
        console.log("password", password);
        if(firstName !== '' && lastName !== '' && email !== '' && password !== '' && passwordCopy !== '') {
            if(password === passwordCopy) {
                try {
                    const response = await registerUser(firstName, lastName, email, phoneNumber, password);
                    console.log(response);
                } catch (error) {
                    console.error('Failed to register user:', error);
                }
            } else {
                console.error('Passwords do not match');
            }
        }
        router.push('/auth/login');
    };

    return (
        <div className="flex flex-col justify-around items-center">
            <div className="text-[20px]"><strong>Sign up</strong></div>
            <div className="flex flex-col w-[80%] gap-y-[10px]">
                <Input
                    label="First name"
                    name="first name"
                    placeholder="John"
                    type="text"
                    variant="bordered"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <Input
                    label="Last name"
                    name="last name"
                    placeholder="Doe"
                    type="text"
                    variant="bordered"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <Input
                    label="Email"
                    name="email"
                    placeholder="johndoe@example.com"
                    type="email"
                    variant="bordered"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    label="Phone number"
                    name="phone number"
                    placeholder="123-456-7890"
                    type="text"
                    variant="bordered"
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                <Input
                    endContent={
                        <button type="button" onClick={toggleCopyVisibility}>
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
                    placeholder="Re-enter your password"
                    type={isCopyVisible ? "text" : "password"}
                    variant="bordered"
                    onChange={(e) => setPasswordCopy(e.target.value)}
                />
                { password !== '' ?
                    ( password === passwordCopy ?
                        <div className="text-appleGreen text-[14px]">Passwords match</div> :
                        <div className="text-appleRed text-[14px]">Passwords do not match</div>
                    ) : <div className="text-[14px]">&nbsp;</div>
                }
                <Button className="bg-appleBlue text-white rounded-[15px]" onClick={handleRegister}>
                    Sign up    
                </Button>   
            </div>
            <div>Already have an account? <Link href="#" onClick={handleLogin}>Log in</Link></div>
        </div>
    );
}
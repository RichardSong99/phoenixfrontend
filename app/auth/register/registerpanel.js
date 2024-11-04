"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { registerUser, loginUser, checkUserExists } from '../../helper/apiservices/userservice';
import { useUser } from '../../helper/context/usercontext';
import { Button, Input, Checkbox, Link, Divider, Spinner, user } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Cookies from "js-cookie";


export default function RegisterPanel() {
    const router = useRouter();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('')
    const [passwordCopy, setPasswordCopy] = useState('');
    const [userExists, setUserExists] = useState(false);

    const [isVisible, setIsVisible] = React.useState(false);
    const [isCopyVisible, setIsCopyVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleCopyVisibility = () => setIsCopyVisible(!isCopyVisible);

    const { authLoading, setAuthLoading, loginUserHandler } = useUser();

    const handleLogin = async () => {
        router.push('/auth/login');
    };

    const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isEmailInvalid = React.useMemo(() => {
        if (email === "") return false;

        return validateEmail(email) ? false : true;
    }, [email]);

    // validate phone number should just take in 10 digits
    const validatePhoneNumber = (value) => value.match(/^\d{10}$/);


    const isPhoneNumberInvalid = React.useMemo(() => {
        if (phoneNumber === "") return false;

        return validatePhoneNumber(phoneNumber) ? false : true;
    }, [phoneNumber]);

    // password must be at least 8 characters long 
    const validatePassword = (value) => value.length >= 8;


    const isPasswordInvalid = React.useMemo(() => {
        if (password === "") return false;

        return validatePassword(password) ? false : true;
    }, [password]);

    const handleRegister = async (event) => {
        if (firstName !== '' && lastName !== '' && email !== '' && phoneNumber !== '' && password !== '' && passwordCopy !== '') {
            if (password === passwordCopy) {

                try {
                    const userExistsResponse = await checkUserExists(email);
                    console.log(userExistsResponse);
                    setUserExists(userExistsResponse.exists);

                    if (!userExistsResponse.exists) {

                        try {
                            setAuthLoading(true);
                            const response = await registerUser(firstName, lastName, email, phoneNumber, password);
                            console.log(response);
                            if (response) {
                                var loginSuccessful = await loginUserHandler(email, password);

                                if (!loginSuccessful) {
                                    console.error('Failed to login user');

                                    setAuthLoading(false);
                                }
                            }
                        } catch (error) {
                            console.error('Failed to register user:', error);
                        }
                    }
                } catch (error) {
                    console.error('Failed to check user existence:', error);
                    setAuthLoading(false);
                    setUserExists(true);
                }
            } else {
                console.error('Passwords do not match');
            }
        }
        // setAuthLoading(false);
    };

    return (
        <div>
            <div className="flex flex-col w-[500px] justify-around items-center pt-[30px] pb-10">
                <div className="text-[40px] mb-[20px] text-gray-700"><strong>Sign Up</strong></div>
                <div className="flex flex-col w-[80%] gap-y-[20px]">
                    <Input
                        label="First name"
                        name="first name"
                        placeholder="John"
                        type="text"
                        variant="bordered"
                        onChange={(e) => setFirstName(e.target.value)}
                        isRequired
                        required
                    />
                    <Input
                        label="Last name"
                        name="last name"
                        placeholder="Doe"
                        type="text"
                        variant="bordered"
                        onChange={(e) => setLastName(e.target.value)}
                        isRequired
                        required
                    />
                    <Input
                        label="Email"
                        name="email"
                        placeholder="johndoe@example.com"
                        type="email"
                        variant="bordered"
                        onChange={(e) => setEmail(e.target.value)}
                        isRequired
                        required
                        isInvalid={isEmailInvalid}

                    />
                    <Input
                        label="Phone number"
                        name="phone number"
                        placeholder="123-456-7890"
                        type="text"
                        variant="bordered"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        isRequired
                        required
                        isInvalid={isPhoneNumberInvalid}
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
                        isInvalid={isPasswordInvalid}
                        description="Password must be at least 8 characters long."
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
                        isRequired
                        required

                    />
                    {password !== '' ?
                        (password === passwordCopy ?
                            <div className="text-appleGreen text-[14px]">Passwords match</div> :
                            <div className="text-appleRed text-[14px]">Passwords do not match</div>
                        ) : <div className="text-[14px]">&nbsp;</div>
                    }
                    {userExists ? <div className="text-appleRed text-[14px]">User already exists</div> : <div className="text-[14px]">&nbsp;</div>}
                    <Button className="bg-appleBlue text-white rounded-[15px]" onClick={handleRegister}>
                        Sign up
                    </Button>
                </div>
                <div className="mt-[30px]">Already have an account? <Link href="#" onClick={handleLogin}>Log in</Link></div>
            </div>
        </div>
    );
}
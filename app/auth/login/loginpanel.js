"use client"

import React, { useState, useEffect } from "react";
// import GoogleIcon from '../../public/googleLogo.png';
// import Image from 'next/image';
import Cookies from 'js-cookie';
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
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [userExists, setUserExists] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);

    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const { setIsAuthenticated } = useUser();


    useEffect(() => {
        if (loginSuccess) {
            setIsAuthenticated(true);
            router.push('/study');
        }
    }, [loginSuccess, router]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoginLoading(true);
            console.log(email, password);
            const data = await loginUser(email, password);
            Cookies.set('token', data.token);
            setLoginSuccess(true);
            setLoginLoading(false);
        } catch (error) {
            setErrorMessage(error.message);
            setLoginFailed(true);
            setLoginLoading(false);
        }


    };

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 p-2 sm:p-4 lg:p-8">
            <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-large">
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
                    <Link href="#" size="sm">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
        // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(135deg, #0077FF, #3EC2FF)', color: '#fff' }}>
        //     <div style={{ maxWidth: '400px', width: '100%', padding: '30px', border: '1px solid #fff', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)' }}>
        //         <h2 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: '700', color: '#0077FF' }}>{isLoginMode ? 'Welcome Back' : 'Join Us'}</h2>
        //         <div style={{ marginBottom: '20px' }}>
        //             {/* <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', color: '#0077FF' }}>Email<span style={{ color: 'red' }}>*</span>:</label> */}
        //             <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} label = "Email" defaultValue="myemail@gmail.com" isRequired />
        //         </div>
        //         <div style={{ marginBottom: '20px' }}>
        //             <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #0077FF', background: 'rgba(255, 255, 255, 0.9)', color: '#0077FF', marginBottom: '10px' }} />
        //         </div>
        //         {!isLoginMode && (
        //             <div style={{ marginBottom: '20px' }}>
        //                 <label htmlFor="repeatPassword" style={{ display: 'block', marginBottom: '5px', color: '#0077FF' }}>Repeat Password<span style={{ color: 'red' }}>*</span>:</label>
        //                 <input type="password" id="repeatPassword" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} placeholder="Repeat Password" required style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #0077FF', background: 'rgba(255, 255, 255, 0.9)', color: '#0077FF', marginBottom: '10px' }} />
        //             </div>
        //         )}
        //         {isLoginMode && (
        //             <a href="/forgot-password" style={{ color: '#0077FF', textDecoration: 'none', marginBottom: '15px', display: 'block', textAlign: 'right' }}>Forgot password?</a>
        //         )}
        //         {errorMessage && <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{errorMessage}</div>}
        //         <button type="button" onClick={handleSubmit} style={{ width: '100%', padding: '12px', borderRadius: '4px', border: 'none', background: '#0077FF', color: '#fff', cursor: 'pointer', marginBottom: '10px' }}>{isLoginMode ? 'LOGIN' : 'CREATE ACCOUNT'}</button>
        //         <button type="button" onClick={() => setIsLoginMode(!isLoginMode)} style={{ width: '100%', padding: '12px', borderRadius: '4px', border: 'none', background: 'none', color: '#0077FF', cursor: 'pointer', marginBottom: '10px', textDecoration: 'underline' }}>{isLoginMode ? 'Create an Account!' : 'Log In'}</button>
        //         {loginFailed && <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>Invalid credentials</div>}
        //     </div>
        // </div>
    );



}

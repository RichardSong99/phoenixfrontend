"use client"

import React, { useState, useEffect } from "react";
import styles from "./loginpanel.module.css";
import GoogleIcon from '../../public/googleLogo.png';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { registerUser, loginUser } from '../services/userservice';
import { useUser } from '../context/usercontext';


export default function LoginPanel({ isLoginMode, setIsLoginMode }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null); // New state variable for error message
    const [loginSuccess, setLoginSuccess] = useState(false); // New state for tracking login success
    // Add a new state variable for tracking if user already exists
    const [userExists, setUserExists] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false); // New state for tracking login failure

    const router = useRouter();
    const { setIsAuthenticated } = useUser();

    // Reset error message when switching between login and register
    useEffect(() => {
        if (!isLoginMode) {
            setUserExists(false);
        }
    }, [email, isLoginMode]);

    useEffect(() => {
        if (isLoginMode) {
            setLoginFailed(false);
        }
    }, [email, password, isLoginMode]);



    useEffect(() => {
        // Check if login was successful and navigate
        if (loginSuccess) {
            // Update the authentication state
            setIsAuthenticated(true);


            router.push('/study');
        }
    }, [loginSuccess, router]); // Depend on loginSuccess and router



    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle the form submission logic here

        if (!isLoginMode) {
            //check if passwords match
            if (password !== repeatPassword) {
                alert("Passwords do not match");
                return;
            }
            //check if password is at least 8 characters long
            if (password.length < 8) {
                alert('Password should be at least 8 characters long');
                return;
            }
        
            //make a post request to the backend to create a new user
            try {
                const data = await registerUser(email, password);
                // Handle success response here
                // Assuming registerUser returns a token upon successful registration
                Cookies.set('token', data.token);
                setLoginSuccess(true); // Set login success to true on successful registration
            } catch (error) {
                console.log(error.message);
                if (error.message === 'Email is already in use') {
                    setUserExists(true);
                }
            }
        } else {
            //make a post request to the backend to login
            try {
                const data = await loginUser(email, password);
                Cookies.set('token', data.token);
                setLoginSuccess(true); // Set login success to true on successful login
            } catch (error) {
                setErrorMessage(error.message); // Set error message if response is not ok
                setLoginFailed(true); // Set login failed to true on failed login
            }
        }

    };


    return (
        <>

            <div className={styles.container}>


                <div className={styles.formContainer}>
                    <div className={styles.descriptionText}>
                        <h2 >Log in</h2>
                        <p>Good to see you again!</p>
                        <p>
                            By logging into Edge Prep, you agree to our{' '}
                            <a href="/terms" className={styles.link}>
                                Terms of use
                            </a>{' '}
                            and{' '}
                            <a href="/privacy" className={styles.link}>
                                Privacy Policy
                            </a>.
                        </p>
                    </div>

                    <div className={styles.formDiv}>
                        <div className={styles.loginRegToggle}>
                            <button className={isLoginMode ? styles.loginRegToggleActive : styles.loginRegToggleInactive} onClick={() => setIsLoginMode(true)}>Login</button>
                            <button className={!isLoginMode ? styles.loginRegToggleActive : styles.loginRegToggleInactive} onClick={() => setIsLoginMode(false)}>Register</button>
                        </div>

                        <div className={styles.divider}></div>


                        <form onSubmit={handleSubmit} className={styles.form}>


                            <button className={styles.socialButton}><span className={styles.googleSpan}>Continue with </span><Image className={styles.googleLogo} src={GoogleIcon} alt="Google logo" height={20} width={20} /></button>

                            <div className={styles.divider}></div>
                            <div className={styles.formText}>
                                Or use your email to {isLoginMode ? 'login' : 'register'}
                            </div>

                            <div className={styles.inputField}>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    required
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.inputField}>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    required
                                    className={styles.input}
                                />
                            </div>

                            {!isLoginMode && (<><div className={styles.inputField}>
                                <input
                                    type="password"
                                    value={repeatPassword}
                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                    placeholder="Repeat Password"
                                    required
                                    className={styles.input}
                                />
                            </div>

                                <div className={styles.formText}>
                                    Password must be at least 8 characters long
                                </div>
                            </>
                            )}

                            {isLoginMode && (
                                <div className={styles.sameLine}>
                                    <a href="/forgot-password" className={styles.forgotPassword}>
                                        Forgot password?
                                    </a>
                                    {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>} {/* Display error message when it's not null */}
                                </div>
                            )}

                            {isLoginMode && (
                                <>
                                    <button className={styles.highlightedButton} onClick={() => handleSubmit}>
                                        Login
                                    </button>
                                    <button className={styles.greyedButton} onClick={() => setIsLoginMode(!isLoginMode)}>
                                        Don&apos;t have an account yet? Create an account!
                                    </button>
                                    {loginFailed && (<div className = {styles.redText}>
                                        Invalid credentials
                                    </div>)}
                                </>
                            )}

                            {!isLoginMode && (
                                <>
                                    <button className={userExists ? styles.greyedButton : styles.highlightedButton} onClick={() => handleSubmit}>
                                        Create Account
                                    </button>
                                    <button className={userExists ? styles.highlightedButton : styles.greyedButton} onClick={() => setIsLoginMode(!isLoginMode)}>
                                        Already have an account? Log In
                                    </button>
                                </>
                            )}

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
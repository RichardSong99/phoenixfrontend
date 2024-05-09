import React, { useState, useEffect } from "react";
import GoogleIcon from '../../public/googleLogo.png';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { registerUser, loginUser } from '../apiservices/userservice';
import { useUser } from '../helper/context/usercontext';
import {Input} from "@nextui-org/react";


export default function LoginPanel({ isLoginMode, setIsLoginMode }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [userExists, setUserExists] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);

    const router = useRouter();
    const { setIsAuthenticated } = useUser();

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
        if (loginSuccess) {
            setIsAuthenticated(true);
            router.push('/study');
        }
    }, [loginSuccess, router]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isLoginMode) {
            if (password !== repeatPassword) {
                alert("Passwords do not match");
                return;
            }
            if (password.length < 8) {
                alert('Password should be at least 8 characters long');
                return;
            }

            try {
                const data = await registerUser(email, password);
                Cookies.set('token', data.token);
                setLoginSuccess(true);
            } catch (error) {
                console.log(error.message);
                if (error.message === 'Email is already in use') {
                    setUserExists(true);
                }
            }
        } else {
            try {
                console.log(email, password);
                const data = await loginUser(email, password);
                Cookies.set('token', data.token);
                setLoginSuccess(true);
            } catch (error) {
                setErrorMessage(error.message);
                setLoginFailed(true);
            }
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(135deg, #0077FF, #3EC2FF)', color: '#fff' }}>
            <div style={{ maxWidth: '400px', width: '100%', padding: '30px', border: '1px solid #fff', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: '700', color: '#0077FF' }}>{isLoginMode ? 'Welcome Back' : 'Join Us'}</h2>
                <div style={{ marginBottom: '20px' }}>
                    {/* <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', color: '#0077FF' }}>Email<span style={{ color: 'red' }}>*</span>:</label> */}
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} label = "Email" defaultValue="myemail@gmail.com" isRequired />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #0077FF', background: 'rgba(255, 255, 255, 0.9)', color: '#0077FF', marginBottom: '10px' }} />
                </div>
                {!isLoginMode && (
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="repeatPassword" style={{ display: 'block', marginBottom: '5px', color: '#0077FF' }}>Repeat Password<span style={{ color: 'red' }}>*</span>:</label>
                        <input type="password" id="repeatPassword" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} placeholder="Repeat Password" required style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #0077FF', background: 'rgba(255, 255, 255, 0.9)', color: '#0077FF', marginBottom: '10px' }} />
                    </div>
                )}
                {isLoginMode && (
                    <a href="/forgot-password" style={{ color: '#0077FF', textDecoration: 'none', marginBottom: '15px', display: 'block', textAlign: 'right' }}>Forgot password?</a>
                )}
                {errorMessage && <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{errorMessage}</div>}
                <button type="button" onClick={handleSubmit} style={{ width: '100%', padding: '12px', borderRadius: '4px', border: 'none', background: '#0077FF', color: '#fff', cursor: 'pointer', marginBottom: '10px' }}>{isLoginMode ? 'LOGIN' : 'CREATE ACCOUNT'}</button>
                <button type="button" onClick={() => setIsLoginMode(!isLoginMode)} style={{ width: '100%', padding: '12px', borderRadius: '4px', border: 'none', background: 'none', color: '#0077FF', cursor: 'pointer', marginBottom: '10px', textDecoration: 'underline' }}>{isLoginMode ? 'Create an Account!' : 'Log In'}</button>
                {loginFailed && <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>Invalid credentials</div>}
            </div>
        </div>
    );
    
    
        
}

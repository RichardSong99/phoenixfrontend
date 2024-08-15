import Cookies from 'js-cookie';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function registerUser(email, password) {
    const response = await fetch(`${apiUrl}/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: email, Password: password }),
    });

    if (!response.ok) {
        throw new Error('Failed to register user');
    }

    const data = await response.json();
    return data;
}

export async function loginUserAPI(email, password) {
    const response = await fetch(`${apiUrl}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": email, "password": password }),
    });

    if (!response.ok) {
        throw new Error('Failed to login user');
    }

    const data = await response.json();
    Cookies.set('token', data.token); // Assuming the response contains a token
    return data;
}

export async function confirmUser() {
    let token;
    try {
        token = Cookies.get('token');
    } catch (error) {
        console.error('Could not get token:', error);
    }

    const requestOptions = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    const response = await fetch(`${apiUrl}/user/confirm`, requestOptions);

    if (!response.ok) {
        throw new Error('Failed to confirm user');
    }
    const data = await response.json();
    return data;
}

export async function getUserData(userId) {
    let token;
    try {
        token = Cookies.get('token');
    } catch (error) {
        console.error('Could not get token:', error);
    }

    const requestOptions = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    const response = await fetch(`${apiUrl}/user/${userId}`, requestOptions);

    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    return data;
}

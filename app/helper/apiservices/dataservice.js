import Cookies from "js-cookie";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getUserData() {
    let token;
    try {
        token = Cookies.get('token');
    } catch (error) {
        console.error('Could not get token:', error);
    }

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    const response = await fetch(`${apiUrl}/get_user_data`, requestOptions);
    const data = await response.json();
    return data;
}
import Cookies from 'js-cookie';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getDataCube({
    compute = true
}) {
    let token;
    try{
        token = Cookies.get('token');
    } catch (error) {
        console.error('Could not get token:', error);
    }
    const requestOptions = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    // Add the compute query parameter to the URL
    const response = await fetch(`${apiUrl}/datacube?compute=${compute}`, requestOptions);

    if (!response.ok) {
        throw new Error('Failed to fetch datacube');
    }
    const data = await response.json();
    return data;
}
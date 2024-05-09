import Cookies from 'js-cookie';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function postVideoWatched({
    videoObjId
}) {
    let token;
    try{
        token = Cookies.get('token');
    } catch (error) {
        console.error('Could not get token:', error);
    }
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    
    const response = await fetch(`${apiUrl}/videoengagement?videoId=${videoObjId}&watched=true`, requestOptions);

    if (!response.ok) {
        throw new Error('Failed to fetch video data');
    }

    const data = await response.json();
    return data;
}
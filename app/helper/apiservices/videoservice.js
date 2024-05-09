import Cookies from 'js-cookie';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchVideosById({
    videoIDList
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

    // videoIDList is an array, add each element to the params with ids = "xxx" format
    let params = "";
    for (let i = 0; i < videoIDList.length; i++) {
        params += `ids=${videoIDList[i]}&`;
    }
    
    const response = await fetch(`${apiUrl}/videosbyid?${params}`, requestOptions);

    if (!response.ok) {
        throw new Error('Failed to fetch video data');
    }

    const data = await response.json();
    return data;
}
import Cookies from 'js-cookie';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchTopicList({
    subject = 'math'
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
    const response = await fetch(`${apiUrl}/topiclist?subject=${subject}`, requestOptions);

    if (!response.ok) {
        throw new Error('Failed to fetch topic counts');
    }
    const data = await response.json();
    return data;
}

export async function fetchPracticeModule({
    name
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
    const response = await fetch(`${apiUrl}/practicemodule?name=${encodeURIComponent(name)}`, requestOptions);

    if (!response.ok) {
        throw new Error('Failed to fetch topic content list');
    }
    const data = await response.json();
    return data;
}

export async function fetchLessonModule({
    name
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
    const response = await fetch(`${apiUrl}/lessonmodule?name=${encodeURIComponent(name)}`, requestOptions);

    if (!response.ok) {
        throw new Error('Failed to fetch topic content list');
    }
    const data = await response.json();
    return data;
}

export async function fetchTestRepresentation({testName}){
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
    const response = await fetch(`${apiUrl}/testrepresentation?name=${encodeURIComponent(testName)}`, requestOptions);

    if (!response.ok) {
        throw new Error('Failed to fetch test preparation content');
    }
    const data = await response.json();
    return data;
}
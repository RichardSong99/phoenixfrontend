// questionservice.js
import Cookies from 'js-cookie';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function postEngagements(engagements) {
    let token;
    try {
        token = Cookies.get('token');
    } catch (error) {
        console.error('Could not get token:', error);
    }
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(engagements),
    };

    const response = await fetch(`${apiUrl}/engagements`, requestOptions);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
}

export async function postEngagement(engagement) {
    console.log('posting engagement', engagement);

    let token;
    try {
        token = Cookies.get('token');
    } catch (error) {
        console.error('Could not get token:', error);
    }
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(engagement),
    };

    const response = await fetch(`${apiUrl}/engagement`, requestOptions);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

export async function getUserDashboard() {
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
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(`${apiUrl}/user/dashboard`, requestOptions);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
}

export async function fetchEngagementByID({engagementID}){
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
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(`${apiUrl}/engagement/${engagementID}`, requestOptions);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
}

export async function fetchEngagementsByID({engagementIDArray}){
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
            'Content-Type': 'application/json',
        },
    };

    const queryParams = engagementIDArray.map(id => `engagementIDArray=${id}`).join('&');

    const response = await fetch(`${apiUrl}/engagements?engagementIDArray=${queryParams}`, requestOptions);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;

}

export async function fetchEngagementByQuestionID({questionID}){
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
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(`${apiUrl}/engagement?questionID=${questionID}`, requestOptions);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
}

export async function updateEngagement({engagementID, update}){
    let token;
    try {
        token = Cookies.get('token');
    } catch (error) {
        console.error('Could not get token:', error);
    }
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(update),
    };

    console.log("engageID", engagementID);

    const response = await fetch(`${apiUrl}/engagement/${engagementID}`, requestOptions);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}
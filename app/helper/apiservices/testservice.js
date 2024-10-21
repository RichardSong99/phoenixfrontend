import Cookies from 'js-cookie';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchTestByID({testID}) {
    let token;
    try {
        token = Cookies.get('token');
    } catch (error) {
        console.error('Could not get token:', error);
    }

    if (!token) {
        console.error('User not logged in');
        return { message: 'User not logged in' };
    }

    const requestOptions = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    const response = await fetch(`${apiUrl}/test?id=${testID}`, requestOptions);

    if (!response.ok) {
        throw new Error('Failed to fetch test');
    }

    const data = await response.json();
    return data;
}

export async function fetchTestByName({testName}){
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

    const response = await fetch(`${apiUrl}/test?name=${testName}`, requestOptions);

    if (!response.ok) {
        throw new Error('Failed to fetch test');
    }
    const data = await response.json();
    return data;
}

export async function postTest({name, quizIDList}){
    let token;
    try {
        token = Cookies.get('token');
    } catch (error) {
        console.error('Could not get token:', error);
    }

    let requestData = {
        Name: name,
        QuizIDList: quizIDList
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    };

    const response = await fetch(`${apiUrl}/test`, requestOptions);

    if (!response.ok) {
        throw new Error('Failed to post test');
    }
    const data = await response.json();
    return data;
}

export async function getTestsForUser(){
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

    const response = await fetch(`${apiUrl}/tests`, requestOptions);

    if (!response.ok) {
        throw new Error('Failed to fetch test list');
    }
    const data = await response.json();
    return data;
}

export async function markTestCompleted({testID}){
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
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Completed: true
        })
    };

    const response = await fetch(`${apiUrl}/test/${testID}`, requestOptions);

    if (!response.ok) {
        throw new Error('Failed to mark test completed');
    }
    const data = await response.json();
    return data;
}

export async function fetchTestUnderlyingByID({testID}){
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

    const response = await fetch(`${apiUrl}/test/${testID}/underlying`, requestOptions);

    if (!response.ok) {
        throw new Error('Failed to fetch test underlying');
    }
    const data = await response.json();
    return data;
}

export async function fetchTestsUnderlyingForUser(){
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

    const response = await fetch(`${apiUrl}/tests/underlying`, requestOptions);

    if (!response.ok) {
        throw new Error('Failed to fetch test underlying');
    }
    const data = await response.json();
    return data;
}
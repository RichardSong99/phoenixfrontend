// questionservice.js
import Cookies from 'js-cookie';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function initializeQuiz ({questionIDs, quizName, quizType}) {

    console.log("initialize quiz called", questionIDs, quizName, quizType)


    let token;
    try {
        token = Cookies.get('token');
    } catch (error) {
        console.error('Could not get token:', error);
    }

    let requestData = {}
    
    if (questionIDs) {
        requestData.QuestionIDList = questionIDs;
    }

    if (quizName) {
        requestData.Name = quizName;
    }

    if (quizType) {
        requestData.Type = quizType;
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    };

    console.log("initquizrequest", questionIDs, requestData);

    const response = await fetch(`${apiUrl}/quiz`, requestOptions);
    console.log(response);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
}

export async function addEngagementToQuiz({engagementID, quizID}) {
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
    };

    const response = await fetch(`${apiUrl}/quizzes/${quizID}/engagements/${engagementID}`, requestOptions);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
}

export async function fetchQuizUnderlyingById({quizID}) {
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

    const response = await fetch(`${apiUrl}/quiz/${quizID}/underlying`, requestOptions);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
}

export async function getQuizzesForUser() {
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

    const response = await fetch(`${apiUrl}/quizzes/user`, requestOptions);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
}


export async function fetchQuiz({ quizID, quizName }) {
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

    const params = new URLSearchParams();
    if (quizID) {
        params.append('id', quizID);
    } else if (quizName) {
        params.append('name', quizName);
    }

    const url = `${apiUrl}/quiz?${params.toString()}`;

    // console.log("url", url);

    let response; 

    try {
        response = await fetch(url, requestOptions);
    } catch (error) {
        console.error("error", error);
    }

    // console.log("response", response);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("data", data);
    return data;
}

export async function updateQuizWithQuestionEngagementIDs(quizID, questionEngagementIDs, status) {
    let token;
    try {
        token = Cookies.get('token');
    } catch (error) {
        console.error('Could not get token:', error);
    }

    // Build the request body conditionally
    const requestBody = { QEIDArray: questionEngagementIDs };

    // Include status only if it's passed in
    if (status !== undefined) {
        requestBody.Status = status;
    }

    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    };

    const response = await fetch(`${apiUrl}/quiz/${quizID}`, requestOptions);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("posted", data);
    return data;
}


export async function fetchQuizStats(quizID){
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

    const response = await fetch(`${apiUrl}/quiz/stats/${quizID}`, requestOptions);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
}

export async function fetchQECombos(quizID){
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

    const response = await fetch(`${apiUrl}/quiz/qecombos/${quizID}`, requestOptions);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
}
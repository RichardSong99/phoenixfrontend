// questionservice.js
import Cookies from 'js-cookie';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export async function getQuestions({
    selectedTopics = [],
    selectedDifficulties = [],
    selectedAnswerStatuses = [],
    selectedAnswerTypes = [],
    page = 1,
    pageSize = 10,
    sortOption = 'attemptTime',
    sortDirection = 1,
}) {
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

    // Create query parameters
    let queryParams = new URLSearchParams();
    if (selectedTopics.length > 0) {
        queryParams.append('topic', selectedTopics.join(','));
    }
    if (selectedDifficulties.length > 0) {
        queryParams.append('difficulty', selectedDifficulties.join(','));
    }

    if (selectedAnswerStatuses.length > 0) {
        queryParams.append('answerStatus', selectedAnswerStatuses.join(','));
    }

    if (selectedAnswerTypes.length > 0) {
        queryParams.append('answerType', selectedAnswerTypes.join(','));
    }

    // queryParams.append('subject', subject);
    queryParams.append('page', page);
    queryParams.append('pageSize', pageSize);
    queryParams.append('sortOption', sortOption);
    queryParams.append('sortDirection', sortDirection);
    
    console.log('queryParams', queryParams.toString());

    const response = await fetch(`${apiUrl}/questions?${queryParams.toString()}`, requestOptions);

    if (!response.ok) {
        throw new Error('Failed to fetch questions');
    }
    const data = await response.json();
    console.log("response", data);
    return data;
}



export const fetchFullQuestionById = async (questionId) => {
    const token = Cookies.get('token');
    const requestOptions = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    const response = await fetch(`${apiUrl}/question/${questionId}`, requestOptions);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};



export async function uploadQuestion(question) {
    let token;
    try{
        token = Cookies.get('token');
    } catch (error) {
        console.error('Could not get token:', error);
    }
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(question)
    };

    const response = await fetch(`${apiUrl}/question`, requestOptions);

    if (!response.ok) {
        throw new Error('Failed to upload question');
    }
    const data = await response.json();
    return data;
}

export async function deleteQuestion(questionId) {
    let token;
    try {
        token = Cookies.get('token');
    } catch (error) {
        console.error('Could not get token:', error);
    }
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    const response = await fetch(`${apiUrl}/questions/${questionId}`, requestOptions);

    if (!response.ok) {
        throw new Error(`Failed to delete question with ID: ${questionId}`);
    }
}


export async function updateQuestion(questionId, updatedQuestion) {
    let token;
    try {
        token = Cookies.get('token');
    } catch (error) {
        console.error('Could not get token:', error);
    }
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedQuestion)
    };

    const response = await fetch(`${apiUrl}/question/${questionId}`, requestOptions);

    if (!response.ok) {
        throw new Error(`Failed to update question with ID: ${questionId}`);
    }
    const data = await response.json();
    return data;
}

export async function getQuestionData(dataQuery) {
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

    const response = await fetch(`${apiUrl}/questions/data?data=${dataQuery}`, requestOptions);

    if (!response.ok) {
        throw new Error('Failed to fetch question data');
    }
    const data = await response.json();
    return data;
}


export async function getTopicCounts() {
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

    const response = await fetch(`${apiUrl}/questions/topicCounts`, requestOptions);

    if (!response.ok) {
        throw new Error('Failed to fetch topic counts');
    }
    const data = await response.json();
    return data;
}

export async function fetchQuestionsById({
    questionIdList
}) {
    let token;
    try {
        token = Cookies.get('token');
    } catch (error) {
        console.error('Could not get token:', error);
    }

    // Join the question IDs into a comma-separated string
    const ids = questionIdList.join(',');

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    };

    // Include the ids in the query string
    const response = await fetch(`${apiUrl}/getquestionsid?ids=${encodeURIComponent(ids)}`, requestOptions);

    if (!response.ok) {
        throw new Error('Failed to fetch question data');
    }

    const data = await response.json();
    return data;
}

export async function getAdaptiveQuestion({
    allowedTopics = [],
    allowedDifficulties = [],
    selectedAnswerStatuses = [],
    selectedAnswerTypes = [],
    prevDifficulty = "medium",
    prevStatus = "correct",
    // numIncorrect = 0,
    // numCorrect = 0,
}) {
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
        },
    };

    let queryParams = new URLSearchParams();
    if (allowedTopics.length > 0) {
        queryParams.append('allowedTopics', allowedTopics.join(','));
    }
    if (allowedDifficulties.length > 0) {
        queryParams.append('allowedDifficulties', allowedDifficulties.join(','));
    }
    if (selectedAnswerStatuses.length > 0) {
        queryParams.append('answerStatus', selectedAnswerStatuses.join(','));
    }
    if (selectedAnswerTypes.length > 0) {
        queryParams.append('answerType', selectedAnswerTypes.join(','));
    }

    queryParams.append('prevDifficulty', prevDifficulty);
    queryParams.append('prevStatus', prevStatus);

    // queryParams.append('numIncorrect', numIncorrect);
    // queryParams.append('numCorrect', numCorrect);

    const response = await fetch(`${apiUrl}/getadaptivequestion?${queryParams.toString()}`, requestOptions);

    if (!response.ok) {
        throw new Error('Failed to start adaptive quiz');
    }

    const data = await response.json();
    console.log(data);
    return data;
}
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
    sortOption = '',
    sortDirection = 'asc',
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

    queryParams.append('subject', subject);
    queryParams.append('page', page);
    queryParams.append('pageSize', pageSize);
    queryParams.append('sortOption', sortOption);
    queryParams.append('sortDirection', sortDirection);
    
    console.log('queryParams', queryParams.toString());

    const response = await fetch(`${apiUrl}/questions?${queryParams.toString()}`, requestOptions);
    console.log("inside getQuestions");

    if (!response.ok) {
        throw new Error('Failed to fetch questions');
    }
    const data = await response.json();
    return data;
}

// export const fetchMaskedQuestions = async () => {
//     const response = await fetch(`${apiUrl}/questions/masked`);
//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return await response.json();
// };

export const fetchFullQuestionById = async (questionId) => {
    const token = Cookies.get('token');
    const requestOptions = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    const response = await fetch(`${apiUrl}/questions/${questionId}`, requestOptions);
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

    const response = await fetch(`${apiUrl}/questions`, requestOptions);

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

    const response = await fetch(`${apiUrl}/questions/${questionId}`, requestOptions);

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

    // questionIdList is an array, add each element to the params with ids = "xxx" format
    let params = "";
    for (let i = 0; i < questionIdList.length; i++) {
        params += `ids=${questionIdList[i]}&`;
    }
    
    const response = await fetch(`${apiUrl}/questionsbyid?${params}`, requestOptions);

    if (!response.ok) {
        throw new Error('Failed to fetch question data');
    }

    const data = await response.json();
    return data;
}
import Cookies from "js-cookie";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getUserData() {
    let token;
    try {
        token = Cookies.get('token');
        console.log('Token:', token);
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

export async function getScoreReport({ quiz_id_list }) {
    let token;
    try {
        token = Cookies.get('token');
        console.log('Token:', token);
    } catch (error) {
        console.error('Could not get token:', error);
    }

    // Convert the quiz_id_list array into a query string
    const queryParams = new URLSearchParams({
        quiz_id_list: quiz_id_list.join(',')
    });

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    // Call the Python Flask API with the quiz_id_list as query params
    const response = await fetch(`${apiUrl}/get_score_report?${queryParams.toString()}`, requestOptions);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

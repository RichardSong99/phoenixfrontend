import Cookies from "js-cookie";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getTopicListSummary(user_id) {
    let token;
    try {
        token = Cookies.get('token');
    } catch (error) {
        console.error('Could not get token:', error);
    }

    const response = await fetch(`${apiUrl}/get_user_topic_summary?user_id=${encodeURIComponent(user_id)}&token=${encodeURIComponent(token)}`);
    const data = await response.json();
    return data;
}
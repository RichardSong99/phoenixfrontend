const apiUrl = process.env.NEXT_PUBLIC_AI_URL;

export async function getGeneratedQuestions({ topic, numEasy, numMedium, numHard }) {
    // Build query parameters string
    const queryParams = new URLSearchParams({
        topic,
        numEasy,
        numMedium,
        numHard
    }).toString();

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Append query parameters to the URL
    const response = await fetch(`${apiUrl}/genquestions?${queryParams}`, requestOptions);
    const data = await response.json();
    return data;
}

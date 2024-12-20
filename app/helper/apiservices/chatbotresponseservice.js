const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getChatbotResponse({user_message, prompt, answer_choices, answer, type, image_url, text1, text2}){
    // query parameters
    const queryParams = new URLSearchParams({user_message}).toString();

    // form data to send to assistant
    const formData = JSON.stringify({
        prompt: prompt,
        answer_choices: answer_choices,
        answer: answer,
        type: type,
        image_url: image_url,
        text1: text1,
        text2: text2
    });

    // request params
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: formData
    };

    // retrieve the response
    const response = await fetch(`${apiUrl}/chatbot?${queryParams}`, requestOptions);
    const data = await response.text();
    return data;
}
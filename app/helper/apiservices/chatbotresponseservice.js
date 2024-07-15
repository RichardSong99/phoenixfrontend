const apiUrl = process.env.NEXT_PUBLIC_AI_URL;

export async function getChatbotResponse(user_message, question){
    // query parameters
    const queryParams = new URLSearchParams({user_message, question}).toString();

    // form data to send to assistant
    const formData = new FormData();

    // request params
    const requestOptions = {
        method: "POST",
        body: formData
    };

    // retrieve the response
    const response = await fetch(`${apiUrl}/chatbot?${queryParams}`, requestOptions);
    const data = response.text();
    return data;
}
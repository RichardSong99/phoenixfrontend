const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getGeneratedQuestions({ description, numEasy, numMedium, numHard, images,
    questionTemplate
 }) {
    // Build query parameters string
    const queryParams = new URLSearchParams({
        'topic':description,
        'num_easy':numEasy,
        'num_medium':numMedium,
        'num_hard':numHard,
        'template': questionTemplate
    }).toString();

    const formData = new FormData();

    if (images && images.length > 0) {
        for (let image of images) {
            formData.append('files', image.file);
        }
    }

    const requestOptions = {
        method: 'POST',
        body: formData
    };

    // Append query parameters to the URL
    const response = await fetch(`${apiUrl}/genquestions?${queryParams}`, requestOptions);
    const data = await response.json();
    return data;
}

export async function visionAITester({images}) {

    if(!images || images.length === 0) {
        throw new Error('No images provided');
    }

    const image = images[0];
    const formData = new FormData();
    formData.append('file', image.file);

    const requestOptions = {
        method: 'POST',
        body: formData
    };

    const response = await fetch(`${apiUrl}/imgtest`, requestOptions);
    const data = await response.json();
    return data;
}
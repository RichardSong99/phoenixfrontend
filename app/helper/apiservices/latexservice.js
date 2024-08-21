const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getSVGFromLatex(latex) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'latex': latex })
    };

    try {
        const response = await fetch(`${apiUrl}/render_latex`, requestOptions);
        
        // Check if the response status is not OK
        if (!response.ok) {
            // Handle the error, e.g., by throwing an error with a message
            throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }

        // Attempt to parse the JSON response
        const data = await response.json();
        return data;

    } catch (error) {
        // Handle errors, such as network failures or invalid JSON responses
        console.error('Error fetching SVG from LaTeX:', error);
        throw error;  // Re-throw the error to handle it further up the call stack if necessary
    }
}

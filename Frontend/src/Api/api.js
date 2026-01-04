const BASE_URL = "http://localhost:5000/api";
const CHAT_ENDPOINT = `${BASE_URL}/chat`;
const STATUS_ENDPOINT = `${BASE_URL}/status`;
export async function sendMessageStream(prompt) {
    if (!prompt) {
        throw new Error("Prompt cannot be empty.");
    }
    const response = await fetch(CHAT_ENDPOINT, {
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ prompt }), 
    });
    if (!response.ok || !response.body) {
        let errorMessage = `HTTP POST error! Status: ${response.status}`;
        try {
            const errorText = await response.text();
            errorMessage += ` - Details: ${errorText}`;
        } catch (error) {
            console.log("Failed to read error response text:", error);
        }
        throw new Error(errorMessage);
    }
    return response.body.getReader();
}
export async function getSystemStatus() {
    const response = await fetch(STATUS_ENDPOINT, {
        method: 'GET',
    });
    if (!response.ok) {
        let errorMessage = `HTTP GET error! Status: ${response.status}`;
        try {
            const errorText = await response.text();
            errorMessage += ` - Details: ${errorText}`;
        } catch (error) {
            console.log("Failed to read error response text:", error);
        }
        throw new Error(errorMessage);
    }
    return response.json();
}
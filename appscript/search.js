function testcallSearch() {
    var startTime = new Date();
    Logger.log(callVertex("What is todays date? ", useSearch = true));
    var endTime = new Date();
    var executionTime = endTime - startTime; // Time in milliseconds
    Logger.log("Execution Time (ms): " + executionTime);

}

//Update the system instructions to your needs
let systemInstruction = "I want to know the ticker symbol for a public company.\nI will provide you with the name of a company. \nYou will provide me with just the ticker symbol.\nOutput should just be the ticker symbol, no description, e.g. 'TSLA'";

function callVertex(prompt, useSearch = true) { // Default to using search
    const API_CONFIG = {
        endpoint: "us-central1-aiplatform.googleapis.com",
        projectId: "Add your Google Cloud Project ID here",
        locationId: "us-central1",
        // modelId: "gemini-1.5-pro-001"
        modelId: "gemini-1.5-flash-002"
        // modelId: "gemini-2.0-flash-thinking-exp-1219"
    };

    const SAFETY_SETTINGS = [
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
    ];

    const requestJson = {
        contents: [
            { role: "user", parts: [{ text: prompt }] }
        ], "systemInstruction": {
            "parts": [
                {
                    "text": systemInstruction
                }
            ]
        },
        generationConfig: { maxOutputTokens: 8192, stopSequences: ["###"], temperature: 1, topP: 0.95 },
        safetySettings: SAFETY_SETTINGS
    };

    // Conditionally add search tools
    if (useSearch) {
        requestJson.tools = [
            { googleSearchRetrieval: { disableAttribution: false } }
        ];
    }

    const options = {
        method: "POST",
        headers: {
            Authorization: "Bearer " + ScriptApp.getOAuthToken(),
            "Content-Type": "application/json"
        },
        payload: JSON.stringify(requestJson),
        muteHttpExceptions: true
    };

    const url = `https://${API_CONFIG.endpoint}/v1/projects/${API_CONFIG.projectId}/locations/${API_CONFIG.locationId}/publishers/google/models/${API_CONFIG.modelId}:generateContent`;

    try {
        const response = UrlFetchApp.fetch(url, options);
        if (response.getResponseCode() === 200) {
            const result = JSON.parse(response.getContentText());
            return result.candidates[0].content.parts[0].text;
        } else {
            Logger.log(`Error ${response.getResponseCode()}: ${response.getContentText()}`);
        }
    } catch (error) {
        Logger.log("Unexpected error:", error); // More informative error log
    }
}

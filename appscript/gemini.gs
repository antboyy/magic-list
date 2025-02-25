function test() {

    const response = callGemini('"London" is a city. I have a small family. Provide a list of things to do when to visit "London" ?');
    console.log(response);
}

function callGemini(prompt) {

    const GEMINI_API_KEY = scriptProperties.getProperty('GEMINI_API_KEY');

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY
    console.log(prompt)
    const payload = {
        "contents": [{
            "parts": [{ "text": prompt }]
        }], "generationConfig": {
            "stopSequences": [
                ""
            ],
            "temperature": 0.9,
            "maxOutputTokens": 1000,
        }
    }


    const response = sendJSONRESTRequest(url, 'POST', payload)
    return response.candidates[0].content.parts[0].text;
}


function sendJSONRESTRequest(url, method, payload) {
    var headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    };

    var options = {
        "method": method,
        "headers": headers,
        "payload": JSON.stringify(payload)
    };

    var response = UrlFetchApp.fetch(url, options);

    // Check the response status code
    if (response.getResponseCode() != 200) {
        throw new Error("Error sending request: " + response.getResponseCode());
    }

    var content = JSON.parse(response.getContentText());
    return content
}


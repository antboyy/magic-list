function testprompts() {
    console.log(createPrompt("Eaton Corp Plc ETN", "ETN", 'prompt-1'));

}

//make a copy of this Google Doc and update the prompts to your needs
const PROMPT_DOC_ID = "insert_your_google_doc_id_here";

const PROMPTS = getPrompts();


function getPrompts() {
    const promptsObject = getTableFromDocAsObject(PROMPT_DOC_ID)
    return promptsObject
}


function createPrompt(input1, input2, promptName) {
    let promptBuilder2 = {
        "prompt-1": PROMPTS['prompt-1'],
        "prompt-2": PROMPTS['prompt-2'],
        "prompt-3": PROMPTS['prompt-3']
    }


    // Check if the promptName exists
    if (promptBuilder2.hasOwnProperty(promptName)) {
        return promptBuilder2[promptName].replace(/\$\{input1\}/g, input1).replace(/\$\{input2\}/g, input2);

    } else {
        // Handle invalid promptName
        throw new Error("Invalid prompt name."); // Or return a custom error message
    }
}


function getTableFromDocAsObject(doc_id) {
    // Get the active document
    const doc = DocumentApp.openById(doc_id);

    // Get the body of the document
    const body = doc.getBody();

    const table = body.findElement(DocumentApp.ElementType.TABLE).getElement().asTable()

    const numRows = table.getNumRows()

    const outputObject = {}

    for (let i = 0; i < numRows; i++) {

        const row = table.getRow(i)

        const promptName = row.getCell(0).getText().trim()
        const promptText = row.getCell(1).getText()

        outputObject[promptName] = promptText
    }

    return outputObject
}


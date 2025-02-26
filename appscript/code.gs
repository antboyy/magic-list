const scriptProperties = PropertiesService.getScriptProperties();
const ui = SpreadsheetApp.getUi();

function onOpen(e) {
  
  ui.createMenu('Magic ✨')
    .addItem('Run Gemini', 'runGemini')
    .addSeparator()
    .addSubMenu(ui.createMenu('Settings')
      .addItem('Set Prompt', 'runSetPrompt'))
    .addToUi();
}

function runSetPrompt(){
  response = ui.prompt("What's the prompt number?");
  prompt_number = response.getResponseText();
  scriptProperties.setProperty('PROMPT',prompt_number );
}

function runGemini() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const selectedRanges = sheet.getActiveRangeList().getRanges(); // Get all selected ranges

  selectedRanges.forEach(range => {
    const values = range.getValues();

    for (let i = 0; i < values.length; i++) { // Start from row 0 (first row of selected range)
      const input1 = values[i][0]; // Input from column 0 (adjust as needed)
      const input2 = values[i][1]; // Input from column 1 (adjust as needed)

      if (input1 !== "" || input2 !== "") {
        const prompt1 = createPrompt(input1, input2, "prompt-"+scriptProperties.getProperty('PROMPT')); // Pass both inputs to prompt creation
        const response = callGemini(prompt1);
        const outputRow = range.getRow() + i;
        setDataOfRowByColumnName(sheet, outputRow, "Gemini Output", response);
      }
    }
  });
}

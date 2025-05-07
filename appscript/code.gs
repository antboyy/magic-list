function onOpen(e) {
  
  ui.createMenu('Magic ✨')
    .addItem('Run Gemini', 'runGemini')
    .addSeparator()
    .addSubMenu(ui.createMenu('Settings')
      .addItem('Set Prompt', 'runSetPrompt'))
    .addToUi();

  if (checkValid(scriptProperties.getProperty('PROMPT')) == false){
    scriptProperties.setProperty('PROMPT',"1");
  }
}

const scriptProperties = PropertiesService.getScriptProperties();
const ui = SpreadsheetApp.getUi();

function runSetPrompt(){
  response = ui.prompt("What's the prompt number? (1-3)");
  prompt_number = response.getResponseText();
  if (checkValid(prompt_number)==false){
    SpreadsheetApp.getUi().alert("Invalid prompt number");
  } else {
    scriptProperties.setProperty('PROMPT',prompt_number);
  }
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

function checkValid(value){
    if (value !== null && ["1", "2", "3"].includes(value)) {
    return true;
    
} else {
  Logger.log("Invalid prompt number");
  return false;
}
}

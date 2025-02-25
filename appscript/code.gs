const scriptProperties = PropertiesService.getScriptProperties();

function onOpen(e) {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Magic ✨')
    .addItem('Run Gemini', 'runGemini')
    .addItem('Run Search', 'runSearch')
    .addToUi();
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
        const prompt1 = createPrompt(input1, input2, "prompt-1"); // Pass both inputs to prompt creation
        const response = callGemini(prompt1);
        const outputRow = range.getRow() + i;
        setDataOfRowByColumnName(sheet, outputRow, "Gemini Output", response);
      }
    }
  });
}

function runSearch() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const selectedRanges = sheet.getActiveRangeList().getRanges(); // Get all selected ranges

  selectedRanges.forEach(range => {
    const values = range.getValues();

    for (let i = 0; i < values.length; i++) { // Start from row 0 (first row of selected range)
      const input1 = values[i][0]; // Input from column 0 (adjust as needed)
      const input2 = values[i][1]; // Input from column 1 (adjust as needed)

      if (input1 !== "" || input2 !== "") {
        const prompt1 = createPrompt(input1, input2, "prompt-1"); // Pass both inputs to prompt creation
        const response = callVertex(prompt1);
        const outputRow = range.getRow() + i;
        setDataOfRowByColumnName(sheet, outputRow, "Search Output", response);
      }
    }
  });
}
// function runSearch() {
//   const sheet = SpreadsheetApp.getActiveSheet();
//   const selectedRanges = sheet.getActiveRangeList().getRanges(); // Get all selected ranges

//   selectedRanges.forEach(range => {
//     const values = range.getValues();

//     for (let i = 0; i < values.length; i++) { 
//       for (let j = 0; j < values[0].length; j++) { 
//         const input = values[i][j];

//         if (input !== "") { 

//           // prompt1 = buildPrompt(input,"prompt-2");
//           prompt1 = createPrompt(input,"","prompt-1");
//           const response = callVertex(prompt1,useSearch = true); 

//           // Calculate the output cell based on selected range's start row and column
//           const outputRow = range.getRow() + i; 
//           setDataOfRowByColumnName(sheet,outputRow,"Search Output",response);
//           // sheet.getRange(outputRow, outputCol).setValue(geminiResponse); 
//         }
//       }
//     }
//   });
// }



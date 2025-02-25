function getHeader(sheet) {
    const header = sheet.getRange(1, 1, 1,
        sheet.getLastColumn()).getValues()[0]
    return header
}

function countCharacters(str) {
    return str.length;
}

function setDataOfRowByColumnName(sheet, rowNumber, columnName, data) {
    `
  Sets the data of a row in a sheet by column name.

  Args:
      sheet (Sheet): The sheet to set the data in.
      rowNumber (int): The row number to set the data in.
      columnName (str): The name of the column to set the data in.
      data (any): The data to set in the column.

  Returns:
      None
  `
    const header = getHeader(sheet)

    const columnIndex = header.indexOf(columnName) + 1
    var range = sheet.getRange(rowNumber, columnIndex);
    range.setValue(data);
}

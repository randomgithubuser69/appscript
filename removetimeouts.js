function removeExpiredTimeouts() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Timeouts'); // What sheet are we looking at?
  var data = sheet.getDataRange().getValues();
  var currentTime = new Date();
  
  // Start from row 2 to skip headers
  for (var i = data.length - 1; i > 0; i--) {
    var expirationDate = new Date(data[i][8]); // Column index for Expiration Date
    if (expirationDate < currentTime) {
      sheet.deleteRow(i + 1); // Adjust for 0-index
    }
  }
}

function createTrigger() {
  ScriptApp.newTrigger('removeExpiredTimeouts')
    .timeBased()
    .everyDays(1) // This sets the trigger to run daily
    .atHour(0)    // This sets the time to run the function (0 is midnight)
    .create();
}

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Extra Special Options') //Rename this to what you want lol
    .addItem('Remove Expired Timeouts', 'removeExpiredTimeouts')
    .addItem('Create Daily Trigger', 'createTrigger')
    .addToUi();
}

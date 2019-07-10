const parse = require('csv-parse/lib/sync')
const fs = require('fs');
const Parser = require('simple-text-parser')
const textParser = new Parser();
const csvWriter = require('csv-write-stream');

const inputFilePath = 'C:\\Shubhang\\Work\\asoms-validations-scraper\\Story170_details.csv'
const outputFilePath = 'output.csv'
//const input = fs.readFileSync('Story170_details.csv');
const input = fs.readFileSync('Story170_details.csv');
const records = parse(input, {
  columns: false,
  skip_empty_lines: true
})

const warnings = [];
const errorArray = [];
const validationCollections = [];
const validation = function (validationObj) {
  this.Text = validation;
  this.Type;
  return this
}


const addValidationToCollection = function (validationText, validationType) {
  var validationObj = new validation();
  validationObj.Text = validationText;
  validationObj.Type = validationType;
  validationCollections.push(validationObj);
  //csvWriter.writeRecords(validationObj).then(console.log("done"));
}

const determineValidationCategory = function (validationTextArray, lowerIndex, higherIndex, lowIndexName, highIndexName) {
  
  validationTextArray.forEach(function (element) {
    
    if (validationTextArray.indexOf(element) > lowerIndex && validationTextArray.indexOf(element) < higherIndex) {

      console.log("case1");
      console.log("Validation params: element= "+element+" element index: "+ validationTextArray.indexOf(element) +" lowerIndex: "+lowerIndex+" higher index: "+higherIndex+" lowIndexName: "+lowIndexName+" higher index name: "+highIndexName)
      addValidationToCollection(element, lowIndexName)
    }
    else if (validationTextArray.indexOf(element) > higherIndex) {
      console.log("case2");
      console.log("Validation params: element= "+element+" element index: "+ validationTextArray.indexOf(element) +" lowerIndex: "+lowerIndex+" higher index: "+higherIndex+" lowIndexName: "+lowIndexName+" higher index name: "+highIndexName)
      addValidationToCollection(element, highIndexName)
    }
  });
}
const parseValidation = function (text) {
  var validationTextArray = text.split('<br>');
  var indexOfErrors = validationTextArray.indexOf('Errors:')
  var indexOfWarnings = validationTextArray.indexOf('Warnings:')

  if (indexOfErrors < indexOfWarnings) {
    
    determineValidationCategory(validationTextArray, indexOfErrors, indexOfWarnings, 'Error', 'Warning');
  }
  else if (indexOfErrors > indexOfWarnings) {
  
    determineValidationCategory(validationTextArray, indexOfWarnings, indexOfErrors, 'Warning', 'Error');

  }
  else if (indexOfErrors < 0 && indexOfWarnings < 0) {
    console.log("case3");
    validationTextArray.forEach(function (element) {
      addValidationToCollection(element, "Unknown")
    });
  }
}
Array.prototype.unique = function() {
  return this.filter(function (value, index, self) { 
    return self.indexOf(value) === index;
  });
}
records.forEach(record => {
  parseValidation(record[0])
});

validationCollections.forEach(function(element){
  if (!fs.existsSync(outputFilePath))
  writer = csvWriter({ headers: ["Validation Details", "Type"]});
else
  writer = csvWriter({sendHeaders: false});

writer.pipe(fs.createWriteStream(outputFilePath, {flags: 'a'}));
writer.write({
  header1:element.Text,
  header2:element.Type,
});
writer.end();
})














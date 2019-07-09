const parse = require('csv-parse/lib/sync')
const fs = require('fs');
const Parser = require('simple-text-parser')
const textParser = new Parser();

const inputFilePath = 'C:\\Shubhang\\Work\\asoms-validations-scraper\\Story170_details.csv'

const input = fs.readFileSync('Story170_details.csv');
const records = parse(input, {
    columns: false,
    skip_empty_lines: true
  })

const warnings = [];
const errorArray = [];
const validation = function(validationObj){
  this.Text = validation;
  this.Type;
  return this
}
const parseValidation = function(text){
   
    // start with errors and warnings for now
    //console.log(text)
    var validationTextArray = text.split('<br>');

    var indexOfErrors = validationTextArray.indexOf('Errors:')
    var indexOfWarnings = validationTextArray.indexOf('Warnings:')
  console.log('outside. Index of Errors: '+ indexOfErrors + " Index of Warnings: "+indexOfWarnings)
    if (indexOfErrors >= 0 && indexOfWarnings >= 0) {
      console.log('inside')
      if (indexOfErrors < indexOfWarnings) {
        var counter = 1;
      while(counter < (indexOfWarnings - indexOfErrors))
      {
        var validationObj = new validation();
        validationObj.Text = validationTextArray[counter];
        validationObj.Type = 'Error'
        errorArray.push(validationObj)
        counter++;
      }
      console.log("Error array has: "+counter -1 +" elements")
      if(counter = indexOfWarnings){
        counter++
        while(counter < validationTextArray.length){
          var validationObj = new validation();
        validationObj.Text = validationTextArray[counter];
        validationObj.Type = 'Warning'
        warnings.push(validationObj)
        counter++;
        }
        console.log("Warnings array has: "+counter -1 +" elements")
      }
      }
      
    }

    textParser.addRule('/Errors:/', function(warningText){
        console.log(warningText)
        warnings.push(warningText)
    })

  };
  records.forEach(record => {
      parseValidation(record[0])
  });

errorArray.forEach(function(errorObj){
  console.log(errorObj);
})
// warnings.forEach(function(warning){
//   console.log(warning)
// });





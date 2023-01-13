
var plaintext = document.getElementById('plaintext');
var numberOfColumns = 16;
var previousChecksum = 0;
var asciiOutputWithPadding = [];
var tableObject = [];
var checksumArray = [];
var md_digest = 000000000000000000000000000000000000000000000000;

document.addEventListener("DOMContentLoaded", function() {
  wait(200);
  tableObject = document.getElementById("startTable").appendChild(populateTable(null, null, 16, null))
  wait(200);
  logKey();
});

plaintext.addEventListener('keyup', logKey);

function logKey() {
  wait(50);

  var number_of_rows_Param = returnNumberOfRows();
  asciiOutputWithPadding   = return_ascii_padded_output();
  populateTable(tableObject, number_of_rows_Param, numberOfColumns, asciiOutputWithPadding);

  var checksumoutput = createCheckSumRow();
  // var finalblock = combinechecksumPaddingAscii(checksumoutput, asciiOutputWithPadding);

  renderOutput("output", document.getElementById("plaintext").value);
  renderOutput("ascii_output", convertToAscii());
  renderOutput("ascii_output_with_pad",asciiOutputWithPadding);
  renderOutput("checkSumRow", checksumoutput);
  renderOutput("checkSumFinalRow", checksumoutput.slice(-16));
  renderOutput("finalBlock", combinechecksumPaddingAscii(checksumoutput, asciiOutputWithPadding));
}

function renderOutput(idtag, inputText){
  document.getElementById(idtag).value = inputText;
}


function convertToAscii(asciiNumberArray = [], returnValued = []) {
  var x = document.getElementById("plaintext").value;

  x.split("").forEach(function(char) {
    char.charCodeAt();
    asciiNumberArray.push(char.charCodeAt());
  });

  returnValued = asciiNumberArray;
  asciiNumberArray = [];
  return returnValued;
}


function returnNumberOfRows(stringarray = document.getElementById("plaintext").value){
  var result = stringarray.length / numberOfColumns;
  result = Math.ceil(result);
  return result;
}

function numberOfPaddedValues(stringarray = document.getElementById("plaintext").value){
  nonPaddedAmount = stringarray.length % numberOfColumns
  amountOfPaddedNumbers = (numberOfColumns - nonPaddedAmount);
  return amountOfPaddedNumbers;
}

function return_ascii_padded_output(numberOfPads = numberOfPaddedValues(),asciiText = convertToAscii()){
  if (numberOfPads == numberOfColumns){
    return asciiText;
  }1
  for (var i = 1; i < numberOfPads + 1;  ++i){
    asciiText.push(15);
  }
  return asciiText;
}



function combinechecksumPaddingAscii (checksumoutput,asciiOutputWithPadding){
  checksumoutput = checksumoutput.slice(-16);
  result = asciiOutputWithPadding.concat(checksumoutput);
  return result;
}

function populateTable(table ,rows, cells, content) {

  var row = document.createElement('tr');
  if (!table) {table = document.createElement('table');
   var thead = document.createElement('thead');
   table.appendChild(thead);

  thead.appendChild(row);
  }

  if (table.hasChildNodes()){
    var tableRows = table.getElementsByTagName('tr');
    var rowCount = tableRows.length;

    for (var x=rowCount-1; x>0; x--) {
      table.removeChild(tableRows[x]);
   }
  }
  for (var j = 0; j < cells; ++j) {
    row.appendChild(document.createElement('td'));
    row.cells[j].appendChild(document.createTextNode(j+1));
  }

  for (var i = 0; i < rows; ++i) {
      var row = document.createElement('tr');
      var spacerOf16 = 16;
      spacerOf16 = spacerOf16 * i;
      for (var j = 0; j < cells; ++j) {
          row.appendChild(document.createElement('td'));
          row.cells[j].appendChild(document.createTextNode(content[j+spacerOf16]));
      }
       table.appendChild(row);
  }
  return table;
}


// function makeCheckSum(asciiOutputWithPadding){
//   l = 0
//   for(var i = 0; i <  asciiOutputWithPadding.length; i++) {
//     for(var j = 0; j <  numberOfColumns; j++){
//       l = decimalsOfPi[(asciiOutputWithPadding[i*numberOfColumns+j])] ^ checksum[j];
//        console.log(l);
//       checksum.push(l);
//     }
//   }
// return checksum;
// }


function findXor (previousChecksum, currentAsciiNumber){
  return previousChecksum ^ currentAsciiNumber
}

function findPiIndex (lookUpNumber){
  return decimalsOfPi[lookUpNumber];
}


function calculateChecksum(previousChecksum, currentAsciiNumber, sameBlockPositionLastChecksum){
  firstXorResult = findXor(previousChecksum, currentAsciiNumber);
  lookUpPiTableResult = findPiIndex(firstXorResult);

  console.log(sameBlockPositionLastChecksum);

  if (checksumArray.length >= 16){
    secondXorResult = findXor(lookUpPiTableResult,sameBlockPositionLastChecksum);
    return secondXorResult;
  }
  return lookUpPiTableResult;
}

function createCheckSumRow(){
  var counter = 0;
  previousChecksum = 0
  checksumArray = [];
    for (let i = 0; i < asciiOutputWithPadding.length; i++) {
      if (counter === 16){counter=0}
        checksumArray[i] = calculateChecksum(previousChecksum,asciiOutputWithPadding[i],checksumArray.length-16)
        previousChecksum = checksumArray[i];
        counter++;
    }
  return checksumArray;
}
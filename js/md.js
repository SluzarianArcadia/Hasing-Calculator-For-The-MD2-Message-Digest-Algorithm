var plaintext = document.getElementById('plaintext');
var blockSize = 16;
var bufferSize = 48;
var previousChecksum = 0;
var asciiOutputWithPadding = [];
var checksum =[];
var tableObject = [];
var checksumArray = [];
var numberOfProcessingRounds = 18;
var checkSumPaddingMessage = [];
var md_digest = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var counter = 0;
var paddingStyle;

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
  checksum = getChecksum(asciiOutputWithPadding);
  checkSumPaddingMessage = combinechecksumPaddingAscii(checksum, asciiOutputWithPadding);

  populateTable(tableObject, number_of_rows_Param, blockSize, checkSumPaddingMessage);

  md_digest = hashingProcessing(checkSumPaddingMessage,md_digest);
  md_digest = decodeAsciiDecimalToArray(md_digest);

  renderOutput("output", document.getElementById("plaintext").value);
  renderOutput("ascii_output", convertToAscii());
  renderOutput("ascii_output_with_pad",asciiOutputWithPadding);
  renderOutput("checkSumRow", checksum);
  renderOutput("checkSumFinalRow", checksum.slice(-16));
  renderOutput("finalBlock", checkSumPaddingMessage);
  renderOutput("allHashedOutput",   md_digest.join("").toString());
  renderOutput("finalHashedOutput", md_digest.join("").toString().slice(0,32));


  md_digest = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  checkSumPaddingMessage = [];
}

function renderOutput(idtag, inputText){
  document.getElementById(idtag).value = inputText;
}

function convertToAscii(asciiNumberArray = [], returnValued = []) {
  var x = document.getElementById("plaintext").value;

  x.split("").forEach(function(char) {
    asciiNumberArray.push(char.charCodeAt());
  });

  returnValued = asciiNumberArray;
  asciiNumberArray = [];
  return returnValued;
}


function returnNumberOfRows(stringarray = document.getElementById("plaintext").value){
  if (!stringarray) {return 1;}

  var result = stringarray.length / blockSize;
  result = Math.ceil(result)+1;
  return result;
}

function numberOfPaddedValues(stringarray = document.getElementById("plaintext").value){
  nonPaddedAmount = stringarray.length % blockSize
  amountOfPaddedNumbers = (blockSize - nonPaddedAmount);
  return amountOfPaddedNumbers;
}

function return_ascii_padded_output(numberOfPads = numberOfPaddedValues(),asciiText = convertToAscii()){  
    for (var i = 1; i < numberOfPads + 1;  ++i){
      asciiText.push(numberOfPads);
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

    for (var x=rowCount-1 ; x>0 ; x--) {
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
      row.id = "idRow"+i;
      row.className = "rowsClass";
      for (var j = 0; j < cells; ++j) {
          row.appendChild(document.createElement('td'));
          row.cells[j].appendChild(document.createTextNode(content[j+spacerOf16]));
      }
       table.appendChild(row);
  }
  return table;
}


function getXOR (previousChecksum, currentAsciiNumber){
  return previousChecksum ^ currentAsciiNumber
}

function getChecksum (message){
  var checksum = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  previous_checkbyte = 0;
  for (let i = 0; i < message.length / blockSize; i++) {
    for (let j = 0; j < blockSize; j++) {
      byteValue = message[i * blockSize + j];
      previous_checkbyte = checksum[j] = getXOR(checksum[j], decimalsOfPi[getXOR(byteValue , previous_checkbyte)] );
    }
  }
  return checksum
}

function hashingProcessing(checkSumPaddingMessage, md_digest){
  for (let i = 0; i <  (checkSumPaddingMessage.length / blockSize); i++) {
      for (let j = 0; j < blockSize; j++) {
        md_digest[blockSize + j] = checkSumPaddingMessage[i * blockSize + j];
        md_digest[2 * blockSize + j] = getXOR((md_digest[blockSize +j]) , md_digest[j]);     
      }
    previous_hashbyte = 0;
    for (let j = 0; j < numberOfProcessingRounds; j++) {
      for (let k = 0; k < bufferSize; k++) {
        md_digest[k] = getXOR(md_digest[k], decimalsOfPi[previous_hashbyte]);
        previous_hashbyte = md_digest[k];
      }
      previous_hashbyte = (previous_hashbyte + j) % 256;
    }
  }
  return md_digest;
}

function decodeAsciiDecimal_to_Hex(num){
  num = num.toString(16);
  if (num.length === 1){
    num = "0" + num;
  }
  return num;
}

function decodeAsciiDecimalToArray(numberArray){
  hexlifiedArray = []
    for (var i = 0; i < numberArray.length; i++) {
      hexlifiedArray[i] = decodeAsciiDecimal_to_Hex(numberArray[i]);
    }
  return hexlifiedArray;
}
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
var MD_Digest = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var allCheckSumCalculated = [];
var firstNestedForLoop = [];
var secondNestedForLoop = [[]];

document.addEventListener("DOMContentLoaded", function() {
  wait(200);
  tableObject = document.getElementById("messageBeforeProcessing").appendChild(populateTable(null, null, 16, null));wait(200);
  logKey(); logKeyCSS();
});

plaintext.addEventListener('keyup', logKey);

function logKey() {
  var numberOfRowsParam = returnNumberOfRows();
  asciiOutputWithPadding   = getASCII_PaddedOutput();
  checksum = getChecksum(asciiOutputWithPadding);
  checkSumPaddingMessage = combinechecksumPaddingAscii(checksum, asciiOutputWithPadding);

  populateTable(tableObject, numberOfRowsParam, blockSize, checkSumPaddingMessage);


  MD_Digest = hashingProcessing(checkSumPaddingMessage,MD_Digest);
  console.log(MD_Digest);
  
  renderHTMLOutput("ASCIIHashedOutput",MD_Digest);
  MD_Digest = decodeAsciiDecimalToArray(MD_Digest);

  renderHTMLOutput("ascii_output", convertToAscii());
  renderHTMLOutput("ascii_output_with_pad",asciiOutputWithPadding);
  renderHTMLOutput("allCheckSumCalculated", allCheckSumCalculated);
  renderHTMLOutput("checkSumFinalRow" , checksum.slice(-16));
  renderHTMLOutput("finalBlockBeforeProcessing", checkSumPaddingMessage);
  renderHTMLOutput("allHashedOutput"  ,   MD_Digest.join("").toString());
  renderHTMLOutput("finalHashedOutput", MD_Digest.join("").toString().slice(0,32));
  MD_Digest = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
}

function renderHTMLOutput(idtag, inputText){
  document.getElementById(idtag).value = inputText;
}

function convertToAscii() {
  asciiNumberArray = [];
  var x = document.getElementById("plaintext").value;
  x.split("").forEach(function(char) {
    asciiNumberArray.push(char.charCodeAt());
  });
  return asciiNumberArray;
}


function returnNumberOfRows(stringarray = document.getElementById("plaintext").value){
  if (!stringarray) {return 1;}
  var result = stringarray.length / blockSize;
  result = Math.ceil(result)+1;
  return result;
}

function numberOfPaddedValues(stringarray = document.getElementById("plaintext").value){
  amountOfPaddedNumbers = (blockSize - (stringarray.length % blockSize));
  return amountOfPaddedNumbers;
}

function getASCII_PaddedOutput(paddedValues = numberOfPaddedValues(),asciiText = convertToAscii()){  
    for (var i = 1; i < paddedValues + 1;  ++i){
      asciiText.push(paddedValues);
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
  allCheckSumCalculated = []; SboxXORArrayForTable = []; xorArrayForTable = [];
  var checksum = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  previous_checkbyte = 0;
  for (let i = 0; i < message.length / blockSize; i++) {
    for (let j = 0; j < blockSize; j++) {
      byteValue = message[i * blockSize + j];
      previous_checkbyte = checksum[j] = getXOR(checksum[j], decimalsOfPi[getXOR(byteValue , previous_checkbyte)] );
      allCheckSumCalculated[j + (blockSize * i)] = previous_checkbyte;
    }
  }
  return checksum
}

function hashingProcessing(checkSumPaddingMessage, md_digest){
  midArray = []; counter = 0
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
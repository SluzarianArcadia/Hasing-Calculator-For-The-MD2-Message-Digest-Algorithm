
var plaintext = document.getElementById('plaintext');
var blockSize = 16;
var bufferSize = 48;
var previousChecksum = 0;
var asciiOutputWithPadding = [];
var tableObject = [];
var checksumArray = [];
var numberOfProcessingRounds = 18;
var checkSumPaddingMessage = [];
var md_digest = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var counter = 0;

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
  populateTable(tableObject, number_of_rows_Param, blockSize, asciiOutputWithPadding);

  var checksumoutput = createCheckSumRow();
  var checkSumOutputAlgo2 = appendChecksum(asciiOutputWithPadding);
  console.log(checkSumOutputAlgo2);
  checkSumPaddingMessage = combinechecksumPaddingAscii(checkSumOutputAlgo2, asciiOutputWithPadding);
  md_digest = hashingProcessing(checkSumPaddingMessage,md_digest);
  md_digest = decodeAsciiDecimalToArray(md_digest);

  renderOutput("output", document.getElementById("plaintext").value);
  renderOutput("ascii_output", convertToAscii());
  renderOutput("ascii_output_with_pad",asciiOutputWithPadding);
  renderOutput("checkSumRow", checkSumOutputAlgo2);
  renderOutput("checkSumFinalRow", checkSumOutputAlgo2.slice(-16));
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
  if (!stringarray) {return 1;       }

  var result = stringarray.length / blockSize;
  result = Math.ceil(result);
  return result;
}

function numberOfPaddedValues(stringarray = document.getElementById("plaintext").value){
  nonPaddedAmount = stringarray.length % blockSize
  amountOfPaddedNumbers = (blockSize - nonPaddedAmount);
  return amountOfPaddedNumbers;
}

function return_ascii_padded_output(numberOfPads = numberOfPaddedValues(),asciiText = convertToAscii()){  
  // if (numberOfPads == blockSize){
  //   return asciiText;
  // }
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


function findXor (previousChecksum, currentAsciiNumber){
  return previousChecksum ^ currentAsciiNumber
}

function findPiIndex (lookUpNumber){
  return decimalsOfPi[lookUpNumber];
}


function calculateChecksum(previousChecksum, currentAsciiNumber, sameBlockPositionLastChecksum){
  firstXorResult = findXor(previousChecksum, currentAsciiNumber);
  lookUpPiTableResult = findPiIndex(firstXorResult);
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

// checksum = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

// for (i in range(len(message_bytes) // block_size):
//     for (j in range(block_size)) {
//         byte = message_bytes[i * block_size + j];
//         previous_checkbyte = checksum[j] = Sbox[byte ^ previous_checkbyte];
//     }
// message_bytes += checksum


function appendChecksum (message){
  var checksum = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  previous_checkbyte = 0;
  for (let i = 0; i < message.length / blockSize; i++) {
    for (let j = 0; j < blockSize; j++) {
      byteValue = message[i * blockSize + j];
      previous_checkbyte = checksum[j] = checksum[j] ^ decimalsOfPi[byteValue ^ previous_checkbyte];
    }
  }
  return checksum
}

function hashingProcessing(checkSumPaddingMessage,md_digest){
  for (let i = 0; i <  (checkSumPaddingMessage.length / blockSize); i++) {
      for (let j = 0; j < blockSize; j++) {
        md_digest[blockSize + j] = checkSumPaddingMessage[i * blockSize + j];
        md_digest[2 * blockSize + j] = ((md_digest[blockSize +j]) ^ md_digest[j]);     
      }

    previous_hashbyte = 0;
    for (let j = 0; j < numberOfProcessingRounds; j++) {
      for (let k = 0; k < bufferSize; k++) {
        md_digest[k] = findXor(md_digest[k], decimalsOfPi[previous_hashbyte]);
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


// function decode_utf8(s) {
//   return decodeURIComponent(escape(s));
// }
// // This is the same for all of the below, and
// // you probably won't need it except for debugging
// // in most cases.
// function bytesToHex(bytes) {
//   return Array.from(
//     bytes,
//     byte => byte.toString(16).padStart(2, "0")
//   ).join("");
// }

// // You almost certainly want UTF-8, which is
// // now natively supported:
// function stringToUTF8Bytes(string) {
//   return new TextEncoder().encode(string);
// }

// // But you might want UTF-16 for some reason.
// // .charCodeAt(index) will return the underlying
// // UTF-16 code-units (not code-points!), so you
// // just need to format them in whichever endian order you want.
// function stringToUTF16Bytes(string, littleEndian) {
//   const bytes = new Uint8Array(string.length * 2);
//   // Using DataView is the only way to get a specific
//   // endianness.
//   const view = new DataView(bytes.buffer);
//   for (let i = 0; i != string.length; i++) {
//     view.setUint16(i, string.charCodeAt(i), littleEndian);
//   }
//   return bytes;
// }

// // And you might want UTF-32 in even weirder cases.
// // Fortunately, iterating a string gives the code
// // points, which are identical to the UTF-32 encoding,
// // though you still have the endianess issue.
// function stringToUTF32Bytes(string, littleEndian) {
//   const codepoints = Array.from(string, c => c.codePointAt(0));
//   const bytes = new Uint8Array(codepoints.length * 4);
//   // Using DataView is the only way to get a specific
//   // endianness.
//   const view = new DataView(bytes.buffer);
//   for (let i = 0; i != codepoints.length; i++) {
//     view.setUint32(i, codepoints[i], littleEndian);
//   }
//   return bytes;
// }

// 4e8ddff3650292ab5a4108c3aa47940b
// ab4f496bfb2a530b219ff33031fe06b0
// da853b0d3f88d99b30283a69e6ded6bb
// 32ec01ec4a6dac72c0ab96fb34c0b5d1
// 8350e5a3e24c153df2275c9f80692773
// 32ec01ec4a6dac72c0ab96fb34c0b5d1
// 7da51ecf58c85821397087467aed86ad
// 32ec01ec4a6dac72c0ab96fb34c0b5d1



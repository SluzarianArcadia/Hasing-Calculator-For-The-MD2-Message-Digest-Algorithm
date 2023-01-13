var wait = (ms) => {
    const start = Date.now();
    let now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}










// Code below is before refactoring with the renderOutput function

  // displayOriginalText();
  // displayASCIItext();
  // display_ascii_output_with_pad(asciiOutputWithPadding);
  // displayfinalBlock(finalblock, "finalBlock");
  // displayAllCheckSumValues(checksumoutput);
  // displayFinalCheckSumValue(lastCheckSumOutput);



  // function displayOriginalText() {
//   var x = document.getElementById("plaintext").value;
//   document.getElementById("output").value = x;
// }
// function displayASCIItext() {
//   var x = convertToAscii();
//   document.getElementById("ascii_output").value = x;
// }
// function display_ascii_output_with_pad(asciiOutputWithPadding) {
//   document.getElementById("ascii_output_with_pad").value = asciiOutputWithPadding;
// }
// function displayAllCheckSumValues(checksumoutput) {
//   document.getElementById("checkSumRow").value = checksumoutput;
// }
// function displayFinalCheckSumValue(checksumoutput) {
//   checksumoutput = checksumoutput.slice(-16);
//   document.getElementById("checkSumFinalRow").value = checksumoutput;
// }
// function displayfinalBlock(finalblock) {
//   document.getElementById("finalBlock").value = finalblock;
// }



    //Leftover function not deleted
  // numberOfPaddedValues();

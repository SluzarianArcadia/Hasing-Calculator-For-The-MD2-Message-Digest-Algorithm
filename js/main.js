
var wait = (ms) => {
    const start = Date.now();
    let now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}



function addClass(buttonID, elementToClass) {
    var x = document.getElementById(buttonID);
    var element = document.getElementById(elementToClass);
    element.classList.toggle("active");
    x.classList.toggle("activeBtn");

    if (x.innerHTML === 'Click Me To Close The Instructions <img src="https://www.htmlcssbuttongenerator.com/iconExample-plus-square-multiple-lined.svg" style="width:19px; margin-left:21px; margin-right:0px; flex-direction: row;">') {
        x.innerHTML = 'Click Me To Read The Instructions <img src="https://www.htmlcssbuttongenerator.com/iconExample-plus-square-multiple-lined.svg" style="width:19px; margin-left:21px; margin-right:0px; flex-direction: row;">'
    } else {
        x.innerHTML = 'Click Me To Close The Instructions <img src="https://www.htmlcssbuttongenerator.com/iconExample-plus-square-multiple-lined.svg" style="width:19px; margin-left:21px; margin-right:0px; flex-direction: row;">'
    }
}


function toBinary (input) {
    var result = "";
    for (var i = 0; i < input.length; i++) {
        var bin = input[i].charCodeAt().toString(2);
        result += Array(8 - bin.length + 1).join("0") + bin;
    } 
    return result;
}

function convert() {
    var output1 = document.getElementById("xorOutput1");
    var output2 = document.getElementById("xorOutput2");
    var output3 = document.getElementById("xorOutput3");

    var input1 = document.getElementById("xorInput1").value;
    var input2 = document.getElementById("xorInput2").value;
    var input3 = document.getElementById("xorInput3");


    input3.value = input1.charCodeAt(0) ^ input2.charCodeAt(0);
    output3.value = toBinary(input3.value.toString());
    output1.value = toBinary(input1);
    output2.value = toBinary(input2);
  }

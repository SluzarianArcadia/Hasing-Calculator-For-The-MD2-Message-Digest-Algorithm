
var wait = (ms) => {
    const start = Date.now();
    let now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}



function addClass(elementToClass) {
    var x = document.getElementById("button1");
    var element = document.getElementById("firstInstructions");
    element.classList.toggle("active");
    x.classList.toggle("activeBtn");

    if (x.innerHTML === 'Click Me To Close The Instructions <img src="https://www.htmlcssbuttongenerator.com/iconExample-plus-square-multiple-lined.svg" style="width:19px; margin-left:21px; margin-right:0px; flex-direction: row;">') {
        x.innerHTML = 'Click Me To Read The Instructions <img src="https://www.htmlcssbuttongenerator.com/iconExample-plus-square-multiple-lined.svg" style="width:19px; margin-left:21px; margin-right:0px; flex-direction: row;">'
    } else {
        x.innerHTML = 'Click Me To Close The Instructions <img src="https://www.htmlcssbuttongenerator.com/iconExample-plus-square-multiple-lined.svg" style="width:19px; margin-left:21px; margin-right:0px; flex-direction: row;">'
    }


}

var plaintext = document.getElementById('plaintext');
var paddingStyle;

plaintext.addEventListener('keyup', logKeyCSS);

function logKeyCSS(){
    paddingStyle = selectPaddingTableCells()
}



function selectPaddingTableCells(){
    
    var numberOfCells = numberOfPaddedValues()
    var numberOfRows = returnNumberOfRows();
    var paddingIDRow;

    if (numberOfCells != 16){
        paddingIDRow = "idRow" + (numberOfRows - 2);
        paddingStyle = document.getElementById(paddingIDRow);
        var childenOfrow = paddingStyle.children;

        for (let i = 0; i < numberOfCells; i++) {
            childenOfrow[-i +(blockSize-1)].style.backgroundColor= "red";
        }
    }
}
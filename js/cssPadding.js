var plaintext = document.getElementById('plaintext');
var selectedPaddingColor = "#FFFF00";

plaintext.addEventListener('keyup', logKeyCSS);

function logKeyCSS(){
    selectPaddingTableCells(selectedPaddingColor)
}

function setSelectedPaddedColor(paddingColor){
    selectedPaddingColor = paddingColor;
}

function selectPaddingTableCells(selectedPaddingColor){
    var numberOfCells = numberOfPaddedValues()
    var numberOfRows = returnNumberOfRows();

        rowOfElements = getRowOfElementsToPad(numberOfRows, numberOfCells)
            for (let i = 0; i < numberOfCells % 16; i++) {
                rowOfElements[-i +(blockSize-1)].style.backgroundColor= selectedPaddingColor;
            }
    }

function getRowOfElementsToPad (numberOfRows, numberOfCells){
    if (numberOfCells != 16){
        return document.getElementById("idRow" + (numberOfRows - 2)).children;
    }
}

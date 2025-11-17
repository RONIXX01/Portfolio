function showMessaage(digitToAdd){
if (parseInt(document.getElementById('result').value) <12e+10){
if (document.getElementById('result').value ==0){
	document.getElementById('result').value =digitToAdd;
}
else {
	document.getElementById('result').value +=digitToAdd;
}}}
var firstNamber=0;
var secondNumber=0;
var operCode = null;
function operation(operationCode){
	firstNamber = document.getElementById('result').value;
	secondNumber = 0;
	operCode = operationCode;
	clearTheInput();
}
function clearTheInput(){
	document.getElementById('result').value=0;
}
function calculate(){
	secondNumber = document.getElementById('result').value;
	if (operCode==0) {
		firstNamber = parseInt(firstNamber)/parseInt(secondNumber);
	}
	else if (operCode==1) {
		firstNamber = parseInt(firstNamber)*parseInt(secondNumber);
	}
	secondNumber = document.getElementById('result').value;
	if (operCode==2) {
		firstNamber = parseInt(firstNamber)-parseInt(secondNumber);
	}
	else if (operCode==3) {
		firstNamber = parseInt(firstNamber)+parseInt(secondNumber);
	}
	document.getElementById('result').value = firstNamber;
	operCode=null;
}
function get(){
	firstNamber=0;
	secondNumber=0;
	operCode=null;
	clearTheInput();
}

var colorCircle = [];
colorCircle[0] = document.getElementById("r");
colorCircle[1] = document.getElementById("b");
colorCircle[2] = document.getElementById("g");
colorCircle[3] = document.getElementById("y");
colorCircle[4] = document.getElementById("bl");
colorCircle[5] = document.getElementById("w");

var list=document.getElementById("list");
list.addEventListener("click",pickColor);
var targetColor="#000"
colorCircle[4].style.height="58px";
			colorCircle[4].style.width="60px";
function pickColor(e){
	console.log(e.target.tagName);
	if (e.target.tagName=="LI"){
		if (e.target.id=="r") {
			targetColor="#f00";
		}
		else if (e.target.id=="b") {
			targetColor="#00f";
		}
		else if (e.target.id=="g") {
			targetColor="#007A08";
		}
		else if (e.target.id=="y") {
			targetColor="#ff0";
		}
		else if (e.target.id=="bl") {
			targetColor="#000";
		}
		else if (e.target.id=="w") {
			targetColor="#fff";
		}
		for (var i=0; i<=5;i++){
			colorCircle[i].style.height="50px";
			colorCircle[i].style.width="50px";

}
e.target.style.height = "58px";
e.target.style.width = "60px";
	}
}
var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext("2d");
canvas.addEventListener("mousemove", drawOnCanvas);
function  drawOnCanvas(e){
	if (e.which==1){
		canvasContext.fillStyle=targetColor;
		canvasContext.beginPath();
		canvasContext.arc(e.offsetX, e.offsetY, 20, 0, Math.PI*2);
		canvasContext.fill();
	}
}
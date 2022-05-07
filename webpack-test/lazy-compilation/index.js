import { b } from "./b";

console.log("1212")

window.document.addEventListener('DOMContentLoaded' , com)
window.onload = function () {
	console.log("load");
};
function com() {
	console.log("DOMContentLoaded");

	const div = document.createElement("div");

	div.style = "width:100px;height:100px;background:darkblue;";

	div.onclick = function () {
		console.log("you click");
		import("./import.js").then(bf => {
			bf("load import js");
		});
	};

	document.body.appendChild(div)
}

b();


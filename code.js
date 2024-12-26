
var start, inp;

var oops;
function setup() {
    start = document.getElementById("toptexty");
    inp = document.getElementById("first");
    oops = [1,2,3,4];
    start.innerText = localStorage.getItem("Header");
}

function incodefunc() {
    start.innerText = inp.value;
    localStorage.setItem("Header",inp.value);
}
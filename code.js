
var start, inp, strhihi;

function setup() {
    start = document.getElementById("toptexty");
    inp = document.getElementById("first");
    strhihi = "that was a bad idea";
}

function incodefunc() {
    if (start == null){
        document.getElementById("toptexty").innerHTML = strhihi+"97";
}
else {
    document.getElementById("toptexty").innerHTML = "lolfail";
}
    var oldtext = start.ariaAtomic +"no errors";
    document.getElementById("toptexty").innerHTML = oldtext;
    start.innerHTML = "burp";
    start.innerHTML = inp.value;
}
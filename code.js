const separator = "@#*&^";

var start, inp;

function isblank(str) {
    return Boolean(!str.trim());
}

class ListItem {
    #name;
    #duedate = "never";
    #category = "";
    constructor (name, duedate, category) {
        this.#name = name;
        if (!isblank(duedate)) {
            this.#duedate = duedate
        }
        if (!isblank(duedate)) {
            this.#category = category
        }
    }
    get stringdata () {
        var str = this.#name;
        str += separator + this.#duedate;
        str += separator + this.#category;
        return str;
    }
}

function setup() {
    start = document.getElementById("toptexty");
    inp = document.getElementById("first");
    start.innerText = localStorage.getItem("Header");
}

function incodefunc() {
    start.innerText = inp.value;
    localStorage.setItem("Header",inp.value);
}
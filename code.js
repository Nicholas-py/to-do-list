const separator = "@#*&^";

var start, inp, debug;

const pageitems = [];

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

    static fromstring(string) {
        var items = string.split(separator);
        return ListItem(items[0],items[1],items[2])
    }
}

function save() {
    for (let i = 0; i < pageitems.length; i++) {
        localStorage.setItem("item"+String(i),pageitems[i].stringdata)
    }
    localStorage.setItem("item"+String(pageitems.length), "end")
}

function load() {
    var counter = 0
    while (true) {
        var item = localStorage.getItem("item"+String(counter))
        if (isblank(item) || item == "end") {
            return;
        }
        pageitems[counter] = ListItem.fromstring(item);
        counter++;
    }
}

function edit() {

}

function currenttime() {
    return Date(Date.now());
}

function setup() {
    start = document.getElementById("toptexty");
    inp = document.getElementById("test");
    debug = document.getElementById("debug")
    start.innerText = localStorage.getItem("Header");
}

function incodefunc() {
    start.innerText = inp.value;
    localStorage.setItem("Header",inp.value);
}
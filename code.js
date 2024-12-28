const separator = "@#*&^";
const pageitems = [];

var start, inp, debug;

var inputrow, savedrow, table;

localStorage.setItem("item1", "exist@#*&^jan 6, 2025@#*&^test")

function edit() {

}

function newrow() {
    var neww = inputrow.cloneNode(true);
    neww.id = "inputrow"+table.rows.length.toString();
    start.innerText = neww.innerHTML;
    table.appendChild(neww);
}

function submit(row) {
    row.remove();
    var itemstring = row.cells[0].firstElementChild.value+separator+row.cells[1].firstElementChild.value+separator+row.cells[2].firstElementChild.value
    setsavedrow(itemstring); 
    pageitems[pageitems.length] = ListItem.fromstring(itemstring)
    save();

}

function setsavedrow(string) {
    var neww = savedrow.cloneNode(true);
    var values = string.split(separator);
    for (let i = 0; i < values.length; i++){
        neww.cells[i].innerHTML = values[i]}
    table.appendChild(neww);

}

function currenttime() {
    return Date(Date.now());
}

function setup() {
    start = document.getElementById("toptexty");
    inp = document.getElementById("test");
    debug = document.getElementById("debug");
    inputrow = document.getElementById("inputrow");
    savedrow = document.getElementById("saved");
    table = document.getElementById("table");
    start.innerText = localStorage.getItem("Header");
    inputrow.remove();
    savedrow.remove();
}

function incodefunc() {
    start.innerText = inp.value;
    localStorage.setItem("Header",inp.value);
}






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
        return new ListItem(items[0],items[1],items[2])
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
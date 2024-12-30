const separator = "@#*&^";
const pageitems = [];
const values = 3;
var flippers = [1,1,1];

var inp, debug;

var inputrow, savedrow, table;


function edit(row) {
    var number = row.rowIndex-1;
    row.remove();
    setinputrow(pageitems[number]);
    pageitems.splice(number,1);
}

function trash(row) {
    var number = row.rowIndex-1;
    row.remove();
    pageitems.splice(number,1);
    save();
}

function cancel(row) {
    row.remove();
}

function newrow() {
    var neww = inputrow.cloneNode(true);
    neww.id = "inputrow"+table.rows.length.toString();
    table.appendChild(neww);
}

function sort(func, index) {
    cleartable();
    pageitems.sort(func);
    createtable();
    save();

    direction = flippers[index];
    flippers = [1,1,1];
    flippers[index] = -direction;

    resetarrows();
}

function resetarrows() {
    var a0 = document.getElementById("tarrow0");
    var a1 = document.getElementById("tarrow1");
    a0.innerHTML = ['▲','▼',][(flippers[0]+1)/2]
    a1.innerHTML = ['▲','▼',][(flippers[1]+1)/2]

}

function fliparrow(item) {
    item.innerHTML = ['▲','▼',][['▼','▲'].indexOf(item.innerHTML)]
}

function submit(row) {
    var itemstring = row.cells[0].firstElementChild.value+separator+row.cells[1].firstElementChild.value+separator+row.cells[2].firstElementChild.value
    var obj = ListItem.fromstring(itemstring);
    setsavedrow(obj); 
    pageitems[pageitems.length] = obj;
    row.remove();
    save();

}

function setinputrow(obj) {
    var values = obj.stringdata.split(separator);
    var neww = inputrow.cloneNode(true);
    for (let i = 0; i < values.length; i++) {
        neww.cells[i].firstElementChild.value = values[i];
    }
    table.appendChild(neww);
}

function setsavedrow(obj) {
    var string = obj.stringdata;
    var neww = savedrow.cloneNode(true);
    neww.id = "savedrow"+pageitems.length.toString();
    var values = string.split(separator);
    for (let i = 0; i < values.length; i++){
        neww.cells[i].innerHTML = values[i]}
    table.appendChild(neww);

}

function currenttime() {
    return Date(Date.now());
}

function setup() {
    inp = document.getElementById("test");
    debug = document.getElementById("debug");
    inputrow = document.getElementById("inputrow");
    savedrow = document.getElementById("saved");
    table = document.getElementById("table");
    inputrow.remove();
    savedrow.remove();
    load();
    createtable();
    debug.innerHTML = ListItem.sortbyname(pageitems[0],pageitems[1])
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
            this.#duedate = duedate;
        }
        if (!isblank(duedate)) {
            this.#category = category;
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
        return new ListItem(items[0],items[1],items[2]);
    }
    static sortbyname(a,b) {
        if (a.#name.toLowerCase == b.#name.toLowerCase()){
            return 0;
        }
        if (a.#name.toLowerCase() < b.#name.toLowerCase()) {
            return -flippers[0];
        }
        return flippers[0];
    }

    static sortbydate(a,b) {
        if (a.#duedate.toLowerCase == b.#duedate.toLowerCase()){
            return 0;
        }
        if (a.#duedate.toLowerCase() < b.#duedate.toLowerCase()) {
            return -flippers[1];
        }
        return flippers[1];
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

function cleartable() {
    var first = table.firstElementChild;
    while (table.firstElementChild) {
        table.firstElementChild.remove();
    }
    table.appendChild(first);
}

function createtable() {
    pageitems.forEach(element => {setsavedrow(element)
        
    });
}
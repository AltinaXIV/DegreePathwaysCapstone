// add a bubble to a given element (column) by id
function addRootTo(id){
    var elem = document.getElementById(id);
    var bubble = document.createElement("root-class-bubble");
    elem.appendChild(bubble);
}

function addBranchTo(id){
    var elem = document.getElementById(id);
    var bubble = document.createElement("branch-class-bubble");
    elem.appendChild(bubble);
}

function addLeafTo(id){
    var elem = document.getElementById(id);
    var bubble = document.createElement("leaf-class-bubble");
    elem.appendChild(bubble);
}

function addStandAloneTo(id){
    var elem = document.getElementById(id);
    var bubble = document.createElement("stand-alone-class-bubble");
    elem.appendChild(bubble);
}


// creates the number of columns specified in input field id="semesters"
// columns are appended to EXISTING row id="main-body" on the page
// gives each column id="column-i"
function generateColumns(){
    var row = document.getElementById("main-body");
    row.innerHTML='';
    var semesters = parseInt(document.getElementById("semesters").value);
    for (i = 1; i <= semesters; i++) {
        var col = document.createElement("div");
        col.className = "column";
        col.innerHTML="This is a column!";
        col.id = "column-" + i;
        row.appendChild(col);
    }
}

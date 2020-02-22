function addRootTo($id){
    var elem = document.getElementById($id);
    elem.innerHTML="<root-class-bubble></root-class-bubble>";
}

function addBranchTo($id){
    var elem = document.getElementById($id);
    elem.innerHTML="<branch-class-bubble></branch-class-bubble>";
}

function addLeafTo($id){
    var elem = document.getElementById($id);
    elem.innerHTML="<leaf-class-bubble></leaf-class-bubble>";
}

function addStandAloneTo($id){
    var elem = document.getElementById($id);
    elem.innerHTML="<stand-alone-class-bubble></stand-alone-class-bubble>";
}

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

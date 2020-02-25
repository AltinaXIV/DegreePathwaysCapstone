// add a bubble to a given element (column) by id
function addRootTo(column, course_no){
    var elem = document.getElementById(column, course_no);
    var bubble = document.createElement("root-class-bubble");
    bubble.id = course_no;
    bubble.innerHTML= '<div slot="course-number">' + course_no + '</div>';
    elem.appendChild(bubble);
}

function addBranchTo(column, course_no){
    var elem = document.getElementById(column, course_no);
    var bubble = document.createElement("branch-class-bubble");
    bubble.id = course_no;
    bubble.innerHTML= '<div slot="course-number">' + course_no + '</div>';
    elem.appendChild(bubble);
}

function addLeafTo(column, course_no){
    var elem = document.getElementById(column, course_no);
    var bubble = document.createElement("leaf-class-bubble");
    bubble.id = course_no;
    bubble.innerHTML= '<div slot="course-number">' + course_no + '</div>';
    elem.appendChild(bubble);
}

function addStandAloneTo(column, course_no){
    var elem = document.getElementById(column, course_no);
    var bubble = document.createElement("stand-alone-class-bubble");
    bubble.id = course_no;
    bubble.innerHTML= '<div slot="course-number">' + course_no + '</div>';
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
        // col.innerHTML="This is a column!";
        col.id = "column-" + i;
        row.appendChild(col);
    }
    place(semesters);
}

// just a test function to place sample data
function place(semesters){
    addRootTo("column-1", "cs401");
    addRootTo("column-1","MATH");
    addBranchTo("column-2", "cs445");
    addBranchTo("column-2", "cs441");
    addLeafTo("column-3", "cs447");
    addLeafTo("column-3", "cs449");
    addLeafTo("column-3", "cs1501");
}

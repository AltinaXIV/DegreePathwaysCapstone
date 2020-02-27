// add a bubble to a given element (column) by id
// temporarily places the argument course_no into the course-number slot
// needs work and real data
function addRootTo(id, course_no){
    var elem = document.getElementById(id, course_no);
    var bubble = document.createElement("root-class-bubble");
    bubble.id = course_no;
    bubble.innerHTML= '<div slot="course-number">' + course_no + '</div>';
    elem.appendChild(bubble);
    elem.appendChild(document.createElement("BR"));
}

function addBranchTo(id, course_no){
    var elem = document.getElementById(id, course_no);
    var bubble = document.createElement("branch-class-bubble");
    bubble.id = course_no;
    bubble.innerHTML= '<div slot="course-number">' + course_no + '</div>';
    elem.appendChild(bubble);
    elem.appendChild(document.createElement("BR"));
}

function addLeafTo(id, course_no){
    var elem = document.getElementById(id, course_no);
    var bubble = document.createElement("leaf-class-bubble");
    bubble.id = course_no;
    bubble.innerHTML= '<div slot="course-number">' + course_no + '</div>';
    elem.appendChild(bubble);
    elem.appendChild(document.createElement("BR"));
}

function addStandAloneTo(id, course_no){
    var elem = document.getElementById(id, course_no);
    var bubble = document.createElement("stand-alone-class-bubble");
    bubble.id = course_no;
    bubble.innerHTML= '<div slot="course-number">' + course_no + '</div>';
    elem.appendChild(bubble);
    elem.appendChild(document.createElement("BR"));
}

// just a test function to place sample data
function place(){
    addRootTo("r1-c1", "MATH");
    addBranchTo("r1-c2", "CS441");
    addBranchTo("r3-c2", "CS445");
    addLeafTo("r2-c3", "CS1501");
    addRootTo("r3-c1","CS401");
    addLeafTo("r3-c3", "CS449");
    addLeafTo("r4-c2", "CS447");
}

function drawTable() {
    var rows = 10; //specify as 10 for now
    var columns = parseInt(document.getElementById("semesters").value);
    
    var body = document.getElementById('main-body');
    body.innerHTML='';
    var table = document.createElement("table");
    table.id = "pathway";

    for (var r = 0; r <= rows; r++) {
        var row = document.createElement("tr");
        for (var c = 1; c <= columns; c++) {
            var cell = document.createElement("td");
            if (r == 0){
                cell.innerHTML ="Semester " + c;
                cell.id = "semester-" + c + "-label";
            }
            else {
                cell.id= "r" + r + "-c" + c;
                // cell.innerHTML = "r" + r + "-c" + c;
            }
            row.appendChild(cell);
        }           
    table.appendChild(row);
    }
    body.appendChild(table);
    
}

function demo(){
    drawTable();
    place();
}
//--------------------------------------------------------------------------
/**
 * drawTable is working better for placing bubbles
 * creates the number of columns specified in input field id="semesters"
 * columns are appended to EXISTING row id="main-body" on the page
 * gives each column id="column-i"
 */
function generateColumns(){
    var row = document.getElementById("main-body");
    row.innerHTML='';
    row.className="row pathway-body";
    var semesters = parseInt(document.getElementById("semesters").value);
    for (i = 1; i <= semesters; i++) {
        var col = document.createElement("div");
        col.className = "column pathway-body";

        var semester_label = document.createElement("P");
        semester_label.innerHTML = "Semester " + i;
        col.appendChild(semester_label);
        col.id = "column-" + i;
        row.appendChild(col);
    }
    // place();
}

/**
 * Modifications to column generation by adding cells to columns. 
 * Table is working better, ignore for now
 * creates the number of columns specified in input field id="semesters"
 * columns are appended to EXISTING row id="main-body" on the page
 * gives each column id="column-i"
 */
function generateColumns2(){
    var row = document.getElementById("main-body");
    row.innerHTML='';
    row.className="row pathway-body";
    var semesters = parseInt(document.getElementById("semesters").value);
    for (c = 1; c <= semesters; c++) {
        var col = document.createElement("div");
        col.className = "column pathway-body";

        for (r = 0; r <= 8; r++) {
            var cell = document.createElement("cell");
            if (r == 0){
                cell.innerHTML ="Semester " + c;
                cell.id = "semester-" + c + "-label";
            }
            else {
                cell.id= "r" + r + "-c" + c;
                // cell.innerHTML = "r" + r + "-c" + c;
            }
            col.appendChild(cell);
            col.appendChild(document.createElement("BR"));
         }

        col.id = "column-" + c;
        row.appendChild(col);
    }
    place();
}

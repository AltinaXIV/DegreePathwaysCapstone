// add a bubble to a given element (column) by id
// temporarily places the argument course_no into the course-number slot
// needs work and real data
function addRootTo(column, course_no){
    var elem = document.getElementById(column, course_no);
    var bubble = document.createElement("root-class-bubble");
    bubble.id = course_no;
    bubble.innerHTML= '<div slot="course-number">' + course_no + '</div>';
    elem.appendChild(bubble);
    elem.appendChild(document.createElement("BR"));
}

function addBranchTo(column, course_no){
    var elem = document.getElementById(column, course_no);
    var bubble = document.createElement("branch-class-bubble");
    bubble.id = course_no;
    bubble.innerHTML= '<div slot="course-number">' + course_no + '</div>';
    elem.appendChild(bubble);
    elem.appendChild(document.createElement("BR"));
}

function addLeafTo(column, course_no){
    var elem = document.getElementById(column, course_no);
    var bubble = document.createElement("leaf-class-bubble");
    bubble.id = course_no;
    bubble.innerHTML= '<div slot="course-number">' + course_no + '</div>';
    elem.appendChild(bubble);
    elem.appendChild(document.createElement("BR"));
}

function addStandAloneTo(column, course_no){
    var elem = document.getElementById(column, course_no);
    var bubble = document.createElement("stand-alone-class-bubble");
    bubble.id = course_no;
    bubble.innerHTML= '<div slot="course-number">' + course_no + '</div>';
    elem.appendChild(bubble);
    elem.appendChild(document.createElement("BR"));
}

/**
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
        // col.innerHTML +="<p>Semester " + i + "</p>";
        col.id = "column-" + i;
        row.appendChild(col);
    }
    // place(semesters);
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

function test(){
    var row = document.getElementById("main-body").children;
    for (i = 0; i < row.length; i++) {
        row[i].innerHTML= 'Semester ' + (i+1) + '<br>';
    }
    var semesters = parseInt(document.getElementById("semesters").value);
    place(semesters);
}

// just a test function to place sample data
function place() {
    addRootTo("r1-c1", "MATH", "course name");
    addBranchTo("r1-c2", "CS441", "course name");
    addBranchTo("r3-c2", "CS445", "course name");
    addLeafTo("r2-c3", "CS1501", "course name");
    addRootTo("r3-c1", "CS401", "course name");
    addLeafTo("r3-c3", "CS449", "course name");
    addLeafTo("r4-c2", "CS447", "course name");
}

function drawTable(rows, minCols) {
    let columns = parseInt(document.getElementById("semesters").value);
    if (columns < minCols) {
        alert("The minimum amount of semesters for this major is " + minCols + ".");
        return;
    }

    let body = document.getElementById('main-body');
    body.innerHTML = '';
    let table = document.createElement("table");
    table.id = "pathway";

    for (let r = 0; r <= rows; r++) {
        let row = document.createElement("tr");
        for (let c = 1; c <= columns; c++) {
            let cell = document.createElement("td");
            if (r === 0) {
                cell.innerHTML = "Semester " + c;
                cell.id = "semester-" + c + "-label";
            } else {
                cell.id = "r" + r + "-c" + c;
                // cell.innerHTML = "r" + r + "-c" + c;
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    body.appendChild(table);

}

//--------------------------------------------------------------------------
/**
 * drawTable is working better for placing bubbles
 * creates the number of columns specified in input field id="semesters"
 * columns are appended to EXISTING row id="main-body" on the page
 * gives each column id="column-i"
 */
function generateColumns() {
    let row = document.getElementById("main-body");
    row.innerHTML = '';
    row.className = "row pathway-body";
    let semesters = parseInt(document.getElementById("semesters").value);
    for (let i = 1; i <= semesters; i++) {
        let col = document.createElement("div");
        col.className = "column pathway-body";

        let semester_label = document.createElement("P");
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
function generateColumns2() {
    let row = document.getElementById("main-body");
    row.innerHTML = '';
    row.className = "row pathway-body";
    let semesters = parseInt(document.getElementById("semesters").value);
    for (let c = 1; c <= semesters; c++) {
        let col = document.createElement("div");
        col.className = "column pathway-body";

        for (let r = 0; r <= 8; r++) {
            let cell = document.createElement("cell");
            if (r === 0) {
                cell.innerHTML = "Semester " + c;
                cell.id = "semester-" + c + "-label";
            } else {
                cell.id = "r" + r + "-c" + c;
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

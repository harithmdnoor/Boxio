// JavaScript source code
function addteacher() {
    var nem = document.getElementById('teacherName').value;
    var pas = document.getElementById('teacherPass').value;
    if (nem != "" && pas != "") {
        db.collection("Teacher").add(
            {
                Name: nem.toString(),
                Password: pas.toString()
            })
        setTimeout(function () {
            window.alert("Added Successfully");
            location.reload();
        }, 300);
    }
    else {
        window.alert("Failed to add");
        location.reload();
    }
}
function addstudent() {
    var nem = document.getElementById('studentName').value;
    var pas = document.getElementById('studentID').value;
    var passcheck = pas.toString();
    if (nem != "" && pas != "" && passcheck.length == 8) {
        db.collection("Students").add(
            {
                Name: nem.toString(),
                ID: pas.toString()
            })
        setTimeout(function () {
            window.alert("Added Successfully");
            location.reload();
        }, 300);
    }
    else {
        window.alert("Failed to add");
        location.reload();
    }
}

function backlogin() {
    window.location.href = 'index.html';
}
function addperson() {
    window.location.href = 'adminadd.html';
}
function deletestudent() {
    window.location.href = 'admindeletestudent.html';
}
function deleteteacher() {
    window.location.href = 'admindeleteteacher.html';
}
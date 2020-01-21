// JavaScript source code
function addteacher() {
    var nem = document.getElementById('teacherName').value;
    var pas = document.getElementById('teacherPass').value
    var adm = document.getElementById('isAdmin');
    var stradm = adm.options[adm.selectedIndex].text;
    var admin = false;
    if (nem != "" && pas != "" && stradm != "") {
        if (stradm == "true") {
            admin = true;
        }
        else {
            admin = false;
        }
        db.collection("Teacher").add(
            {
                Name: nem.toString(),
                Password: pas.toString(),
                IsAdmin: admin
            })
        setTimeout(function () {
            window.alert("Added Successfully");
            location.reload();
        }, 1000);
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
                Id: pas.toString()
            })
        setTimeout(function () {
            window.alert("Added Successfully");
            location.reload();
        }, 1000);
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
function teacher() {
    window.location.href = 'teacher-session.html';
}
function admin() {
    window.location.href = 'adminmenu.html';
}

 

const adminbtn = document.getElementById('adminbtn');
const teachernem = document.getElementById('teachername');
checkOptions();
//render buttons in teacher/admin menu
function checkOptions() {
    
    var teacherdata = localStorage['teacherdata'];
    //localStorage.removeItem('teacherdata');
    var teacherarray = teacherdata.split(',');
    var teachername = teacherarray[0];
    var teacherpass = teacherarray[1];
    var isAdmin = teacherarray[2];
    teachernem.textContent = teachername;
    if (isAdmin == "true") {
        adminbtn.style.display = "visible";
    }
    else {
        adminbtn.style.display = "none";
    }
}
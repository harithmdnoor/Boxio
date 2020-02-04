// JavaScript source code
function addteacher() {
    var counter = 0;
    var nem = document.getElementById('teacherName').value;
    var pas = document.getElementById('teacherPass').value
    var adm = document.getElementById('isAdmin');
    var stradm = adm[adm.selectedIndex].value;
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
        db.collection('Teacher').get().then(snapshot => {
            data = snapshot.docs;

            data.forEach(doc => {
                var teachername = '';
                const guide = doc.data();
                teachername = guide.Name;
                if (nem.toString() == teachername.toString()) {
                    window.alert("Added Successfully");
                    location.reload();
                }
                else {
                    counter += 1;
                    if (counter == data.length) {
                        window.alert("Failed to add");
                        location.reload();
                    }
                }
            })
        });
    }
    else {
        window.alert("Please Enter a valid name/password");
        location.reload();
    }
}
function addstudent() {
    counter = 0;
    var nem = document.getElementById('studentName').value;
    var pas = document.getElementById('studentID').value;
    var passcheck = pas.toString();
    if (nem != "" && pas != "" && passcheck.length == 8) {
        db.collection("Students").add(
            {
                Name: nem.toString(),
                Id: pas.toString()
            })
        db.collection('Students').get().then(snapshot => {
            data = snapshot.docs;

            data.forEach(doc => {
                var studentname = '';
                const guide = doc.data();
                studentname = guide.Name;
                if (nem.toString() == studentname.toString()) {
                    window.alert("Added Successfully");
                    location.reload();
                }
                else {
                    counter += 1;
                    if (counter == data.length) {
                        window.alert("Failed to add");
                        location.reload();
                    }
                }
            })
        });
    }
    else {
        window.alert("Please Enter a valid name/ID(8 characters)");
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
    localStorage.setItem("teacherName",teachernem);
    teachernem.textContent = teachername;
    if (isAdmin == "true") {
        adminbtn.style.display = "visible";
    }
    else {
        adminbtn.style.display = "none";
    }
}
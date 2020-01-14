// JavaScript source code
var studentnamelist = [];
var studentidlist = [];
var teachernamelist = [];
var teacherpasslist = [];
var check = false;
// Login
function verify() {
    var nem = document.getElementById('name').value;
    var pas = document.getElementById('pass').value;
    console.log(studentidlist);
    studentnamelist.forEach(doc => {
        if (nem == doc) {
            studentidlist.forEach(ids => {
                console.log(ids);
                if (pas == ids.toString()) {
                    window.location.href = 'student.html';
                    var studentdata = [nem, ids];
                    localStorage.setItem('studentdata',studentdata);
                    check = true;
                }
            })
        }
    })
    teachernamelist.forEach(doc => {
        if (nem == doc) {
            teacherpasslist.forEach(ids => {
                console.log(ids);
                if (pas == ids) {
                    window.location.href = 'teacher.html';
                    var teacherdata = [nem, ids];
                    localStorage.setItem('teacherdata', teacherdata);
                    check = true;
                }
            })
        }
    })
    if (check == false) {
        window.location.href = 'index.html';
    }
    /*
    if ((nem == 'Teacher') && (pas == 'pass1234')) {
        window.location.href = 'index.html';

    }
    else if ((nem == 'Student') && (pas == 'pass4321')) {
        window.location.href = 'student.html';

    }
    else {
        window.location.href = 'login.html';

    }
    */
}

//getting student name and id
dbl.collection('Students').get().then(snapshot => {
    data = snapshot.docs;
    
    data.forEach(doc => {
        var studentname = '';
        var studentid = '';
        const guide = doc.data();
        studentname = guide.Name;
        studentid = guide.Id;
        studentnamelist.push(studentname);
        studentidlist.push(studentid);
    })
});
dbl.collection('Teacher').get().then(snapshot => {
    datat = snapshot.docs;

    datat.forEach(doct => {
        var teachername = '';
        var teacherpass = '';
        const guide = doct.data();
        teachername = guide.Name;
        teacherpass = guide.Password;
        teachernamelist.push(teachername);
        teacherpasslist.push(teacherpass);
    })
});

// Get the input field
var nameinput = document.getElementById("name");
var passinput = document.getElementById("pass");

// Execute a function when the user releases a key on the keyboard
nameinput.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("loginbtn").click();
    }
});
// Execute a function when the user releases a key on the keyboard
passinput.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("loginbtn").click();
    }
});


function admin() {
    window.location.href = 'adminmenu.html';
}
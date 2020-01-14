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
// JavaScript source code

// Login(Hardcoded)
function verify() {
    var nem = document.getElementById('name').value;
    var pas = document.getElementById('pass').value;
    if ((nem == 'Teacher') && (pas == 'pass1234')) {
        window.location.href = 'index.html';

    }
    else if ((nem == 'Student') && (pas == 'pass4321')) {
        window.location.href = 'student.html';

    }
    else {
        window.location.href = 'login.html';

    }
}
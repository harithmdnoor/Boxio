// JavaScript source code
//deleting
const teacherList = document.querySelector('#teacher-list');
const form = document.querySelector('#delete-teacher');

// create element & render
function renderResponse(doc) {
    let li = document.createElement('li');
    let pass = document.createElement('span');
    let name = document.createElement('span');
    let admin = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    pass.textContent = doc.data().Password;
    name.textContent = doc.data().Name;
    admin.textContent = doc.data().IsAdmin;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(pass);
    li.appendChild(admin);
    li.appendChild(cross);

    teacherList.appendChild(li);

    // delete data
    cross.addEventListener('click', (e) => {
        var teacherdata = localStorage['teacherdata'];
        //localStorage.removeItem('teacherdata');
        var teacherarray = teacherdata.split(',');
        var teachername = teacherarray[0];
        var teacherpass = teacherarray[1];
       
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('Teacher').doc(id).delete();
        if (name.toString() == teachername.toString() && pass.toString() == teacherpass.toString()) {
            window.location.href = "index.html";
        }
    })
}
// Real-time listener (Getting real-time data)
db.collection('Teacher').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == 'added') {
            renderResponse(change.doc);
        } else if (change.type == 'removed') {
            let li = teacherList.querySelector('[data-id=' + change.doc.id + ']');
            teacherList.removeChild(li);
        }
    })
})